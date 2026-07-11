import { Component, computed, ElementRef, signal, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GraphService, CATEGORY_COLORS } from '../graph.service';
import { GraphEdge, GraphNode, NodeCategory } from '../../../core/models/graph.model';
import { IconComponent, ICONS } from '../../../shared/components/icon/icon.component';

export const CATEGORY_ICONS: Record<NodeCategory, string> = {
  cns:        'node-brain',
  brainstem:  'node-brainstem',
  reward:     'node-reward',
  gut:        'node-gut',
  pancreas:   'node-pancreas',
  genetic:    'node-genetic',
  adipose:    'node-adipose',
  energy:     'node-energy',
};

const VIEW_W = 1000;
const VIEW_H = 620;

@Component({
  selector: 'app-muskan-graph-canvas',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './muskan-graph-canvas.component.html',
})
export class MuskanGraphCanvasComponent {
  @ViewChild('svgEl', { static: true }) svgEl!: ElementRef<SVGSVGElement>;

  colors = CATEGORY_COLORS;
  icons = CATEGORY_ICONS;
  viewW = VIEW_W;
  viewH = VIEW_H;

  zoom = signal(1);
  pan = signal({ x: 0, y: 0 });
  hoveredNodeId = signal<string | null>(null);
  tooltip = signal<{ x: number; y: number; edge: GraphEdge } | null>(null);

  private isPanning = false;
  private panStart = { x: 0, y: 0 };
  private panOrigin = { x: 0, y: 0 };

  constructor(public graphService: GraphService, private sanitizer: DomSanitizer) {}

  get nodes(): GraphNode[] {
    return this.graphService.graph().nodes;
  }

  get edges(): GraphEdge[] {
    return this.graphService.graph().edges;
  }

  get clusters() {
    return this.graphService.graph().clusters;
  }

  nodeById(id: string): GraphNode | undefined {
    return this.nodes.find(n => n.id === id);
  }

  nodeIconPath(category: NodeCategory): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ICONS[this.icons[category]] ?? '');
  }

  hexPoints(cx: number, cy: number, r: number): string {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 90);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }

  toPx(x: number, y: number): { px: number; py: number } {
    return { px: (x / 100) * this.viewW, py: (y / 100) * this.viewH };
  }

  clusterHalos = computed(() => {
    return this.clusters.map((cluster: { id: string; label: string; category: NodeCategory; nodeIds: string[] }) => {
      const pts = cluster.nodeIds
        .map((id: string) => this.nodeById(id))
        .filter((n): n is GraphNode => !!n)
        .map((n: GraphNode) => this.toPx(n.x, n.y));
      if (pts.length === 0) return null;
      const xs = pts.map((p: { px: number; py: number }) => p.px);
      const ys = pts.map((p: { px: number; py: number }) => p.py);
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
      const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const r = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 2 + 46;
      return { id: cluster.id, label: cluster.label, category: cluster.category, cx, cy, r };
    }).filter(Boolean) as { id: string; label: string; category: NodeCategory; cx: number; cy: number; r: number }[];
  });

  isDimmed(nodeId: string): boolean {
    const selected = this.graphService.selectedNodeId();
    const hovered = this.hoveredNodeId();
    const active = selected ?? hovered;
    if (!active) return false;
    if (active === nodeId) return false;
    const connected = this.edges.some(
      e => (e.source === active && e.target === nodeId) || (e.target === active && e.source === nodeId)
    );
    return !connected;
  }

  isEdgeActive(edge: GraphEdge): boolean {
    const selected = this.graphService.selectedNodeId();
    const hovered = this.hoveredNodeId();
    const active = selected ?? hovered;
    if (!active) return false;
    return edge.source === active || edge.target === active;
  }

  edgePath(edge: GraphEdge): string {
    const s = this.nodeById(edge.source);
    const t = this.nodeById(edge.target);
    if (!s || !t) return '';
    const sp = this.toPx(s.x, s.y);
    const tp = this.toPx(t.x, t.y);
    const mx = (sp.px + tp.px) / 2;
    const my = (sp.py + tp.py) / 2;
    const dx = tp.px - sp.px;
    const dy = tp.py - sp.py;
    const curveOffset = 14;
    const nx = -dy;
    const ny = dx;
    const len = Math.sqrt(nx * nx + ny * ny) || 1;
    const cx = mx + (nx / len) * curveOffset;
    const cy = my + (ny / len) * curveOffset;
    return `M ${sp.px} ${sp.py} Q ${cx} ${cy} ${tp.px} ${tp.py}`;
  }

  onNodeClick(node: GraphNode) {
    this.graphService.selectNode(node.id);
  }

  onNodeHover(id: string | null) {
    this.hoveredNodeId.set(id);
  }

  onEdgeHover(edge: GraphEdge | null, event?: MouseEvent) {
    if (!edge) {
      this.tooltip.set(null);
      return;
    }
    if (edge.label && event) {
      this.tooltip.set({ x: event.offsetX, y: event.offsetY, edge });
    }
  }

  zoomIn() {
    this.zoom.set(Math.min(this.zoom() + 0.2, 2.5));
  }

  zoomOut() {
    this.zoom.set(Math.max(this.zoom() - 0.2, 0.5));
  }

  resetView() {
    this.zoom.set(1);
    this.pan.set({ x: 0, y: 0 });
    this.graphService.clearSelection();
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    this.zoom.set(Math.min(Math.max(this.zoom() + delta, 0.5), 2.5));
  }

  onPointerDown(event: PointerEvent) {
    this.isPanning = true;
    this.panStart = { x: event.clientX, y: event.clientY };
    this.panOrigin = { ...this.pan() };
  }

  onPointerMove(event: PointerEvent) {
    if (!this.isPanning) return;
    const dx = (event.clientX - this.panStart.x) / this.zoom();
    const dy = (event.clientY - this.panStart.y) / this.zoom();
    this.pan.set({ x: this.panOrigin.x + dx, y: this.panOrigin.y + dy });
  }

  onPointerUp() {
    this.isPanning = false;
  }

  get transformStyle(): string {
    const { x, y } = this.pan();
    return `translate(${x}px, ${y}px) scale(${this.zoom()})`;
  }
}
