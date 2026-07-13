import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphToolbarComponent } from '../components/graph-toolbar/graph-toolbar.component';
import { MuskanGraphCanvasComponent } from './muskan-graph-canvas.component';
import { GraphService } from '../graph.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { STATIC_BIOLOGY_DATA, BioNode, GroupData } from '../static-biology-data';

@Component({
  selector: 'app-muskan',
  standalone: true,
  imports: [CommonModule, GraphToolbarComponent, MuskanGraphCanvasComponent, IconComponent],
  templateUrl: './muskan.component.html',
  styleUrls: ['./muskan.component.css'],
})
export class MuskanComponent implements OnInit {
  readonly W = 1200;
  readonly H = 820;
  readonly CX = 600;
  readonly CY = 410;
  readonly GROUP_ORBIT = 280;
  readonly NODE_ORBIT = 110;

  readonly ICON_MAP: Record<string, string> = {
    cns: 'node-brain',
    brainstem: 'node-brainstem',
    reward: 'node-reward',
    gut: 'node-gut',
    pancreas: 'node-pancreas',
    genetic: 'node-genetic',
    adipose: 'node-adipose',
    energy: 'node-energy',
  };

  groups: GroupData[] = [];
  selectedNode: BioNode | null = null;
  selectedGroup: GroupData | null = null;

  constructor(public graphService: GraphService) {}

  hoveredNodeId: string | null = null;
  hoveredGroupKey: string | null = null;
  tooltipVisible = false;
  tooltipX = 0;
  tooltipY = 0;
  tooltipNode: BioNode | null = null;
  tooltipGroup: GroupData | null = null;

  staticData = STATIC_BIOLOGY_DATA;

  ngOnInit(): void {
    this.transformData();
    this.layoutNodes();
  }

  private transformData(): void {
    const groupMap = new Map<string, GroupData>();

    Object.keys(this.staticData.pathwayGroups).forEach(key => {
      const group = (this.staticData.pathwayGroups as any)[key];
      groupMap.set(key, {
        key,
        label: group.label,
        color: group.color,
        nodes: [],
        x: 0,
        y: 0,
      });
    });

    this.staticData.pathwayNodes.forEach(node => {
      const groupData = groupMap.get(node.group);
      if (groupData) {
        groupData.nodes.push({
          id: node.id,
          label: node.label,
          desc: node.desc,
          group: node.group,
          r: node.r,
          refs: node.refs || [],
          x: 0,
          y: 0,
        });
      }
    });

    this.groups = Array.from(groupMap.values()).filter(g => g.nodes.length > 0);
  }

  private layoutNodes(): void {
    const n = this.groups.length;
    if (n === 0) return;

    this.groups.sort((a, b) => a.label.localeCompare(b.label));

    this.groups.forEach((g, gi) => {
      const groupAngle = (gi / n) * Math.PI * 2 - Math.PI / 2;
      g.x = this.CX + this.GROUP_ORBIT * Math.cos(groupAngle);
      g.y = this.CY + this.GROUP_ORBIT * Math.sin(groupAngle);

      const m = g.nodes.length;
      const spread = Math.min(Math.PI * 0.9, 0.34 * m + 0.2);

      g.nodes.forEach((node, ni) => {
        const t = m === 1 ? 0 : (ni / (m - 1)) - 0.5;
        const nodeAngle = groupAngle + t * spread;
        node.x = g.x + this.NODE_ORBIT * Math.cos(nodeAngle);
        node.y = g.y + this.NODE_ORBIT * Math.sin(nodeAngle);
      });
    });
  }

  getCurvePath(x1: number, y1: number, x2: number, y2: number): string {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const curveFactor = 0.17;
    const cx = mx - (dy / dist) * dist * curveFactor;
    const cy = my + (dx / dist) * dist * curveFactor;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  }

  onNodeEnter(node: BioNode, group: GroupData, event: MouseEvent): void {
    this.hoveredNodeId = node.id;
    this.hoveredGroupKey = group.key;
    this.tooltipNode = node;
    this.tooltipGroup = group;
    this.tooltipX = event.clientX + 15;
    this.tooltipY = event.clientY - 10;
    this.tooltipVisible = true;
  }

  onNodeMove(event: MouseEvent): void {
    if (this.tooltipVisible) {
      this.tooltipX = event.clientX + 15;
      this.tooltipY = event.clientY - 10;
    }
  }

  onNodeLeave(): void {
    this.hoveredNodeId = null;
    this.hoveredGroupKey = null;
    this.tooltipVisible = false;
    this.tooltipNode = null;
    this.tooltipGroup = null;
  }

  selectNode(node: BioNode, group: GroupData): void {
    if (this.selectedNode?.id === node.id) {
      this.selectedNode = null;
      this.selectedGroup = null;
    } else {
      this.selectedNode = node;
      this.selectedGroup = group;
    }
    this.tooltipVisible = false;
  }

  closeDetails(): void {
    this.selectedNode = null;
    this.selectedGroup = null;
  }

  isNodeHighlighted(nodeId: string): boolean {
    return this.hoveredNodeId === nodeId || this.selectedNode?.id === nodeId;
  }

  isGroupHighlighted(groupKey: string): boolean {
    return this.hoveredGroupKey === groupKey || this.selectedGroup?.key === groupKey;
  }

  getLineOpacity(node: BioNode, group: GroupData): number {
    if (this.selectedNode?.id === node.id) return 0.82;
    if (this.hoveredNodeId === node.id) return 0.7;
    if (this.hoveredGroupKey === group.key) return 0.47;
    if (this.selectedGroup?.key === group.key) return 0.42;
    return 0.14;
  }

  getGroupOpacity(group: GroupData): number {
    if (this.hoveredNodeId || this.selectedNode) {
      const hasHighlighted = group.nodes.some(
        n => n.id === this.hoveredNodeId || n.id === this.selectedNode?.id
      );
      return hasHighlighted ? 1 : 0.32;
    }
    return 1;
  }

  getTotalNodes(): number {
    return this.groups.reduce((sum, group) => sum + group.nodes.length, 0);
  }

  trackEdge(index: number, edge: { id: string }) {
    return edge.id;
  }
}
