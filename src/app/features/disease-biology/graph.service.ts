import { Injectable, signal, computed } from '@angular/core';
import { GraphData, GraphNode, NodeCategory } from '../../core/models/graph.model';
import { OBESITY_GRAPH } from './data/obesity-graph.data';

export const CATEGORY_COLORS: Record<NodeCategory, { fill: string; ring: string; text: string }> = {
  cns:        { fill: '#8a67ff', ring: '#6d3bf5', text: '#4c1abd' },
  brainstem:  { fill: '#3fb87f', ring: '#12b886', text: '#0e7a5a' },
  reward:     { fill: '#f16fa8', ring: '#ec4d92', text: '#b8296a' },
  gut:        { fill: '#5b9cf6', ring: '#3b82f6', text: '#1d4ed8' },
  pancreas:   { fill: '#31c5b9', ring: '#14b8a6', text: '#0f766e' },
  genetic:    { fill: '#8d97ad', ring: '#64748b', text: '#3e4356' },
  adipose:    { fill: '#f7ba4f', ring: '#f5a623', text: '#b3760f' },
  energy:     { fill: '#f0665f', ring: '#e6423a', text: '#b12820' },
};

export type ExploreMode = 'freely' | 'signal-flow' | 'therapeutic-targets';

@Injectable({ providedIn: 'root' })
export class GraphService {
  private readonly _graph = signal<GraphData>(OBESITY_GRAPH);
  private readonly _selectedNodeId = signal<string | null>(null);
  private readonly _hoveredEdgeId = signal<string | null>(null);
  private readonly _exploreMode = signal<ExploreMode>('freely');
  private readonly _activeTab = signal<'pathways' | 'mechanisms'>('pathways');

  readonly graph = this._graph.asReadonly();
  readonly selectedNodeId = this._selectedNodeId.asReadonly();
  readonly hoveredEdgeId = this._hoveredEdgeId.asReadonly();
  readonly exploreMode = this._exploreMode.asReadonly();
  readonly activeTab = this._activeTab.asReadonly();

  readonly selectedNode = computed<GraphNode | null>(() => {
    const id = this._selectedNodeId();
    if (!id) return null;
    return this._graph().nodes.find(n => n.id === id) ?? null;
  });

  readonly connectedEdges = computed(() => {
    const id = this._selectedNodeId();
    if (!id) return [];
    return this._graph().edges.filter(e => e.source === id || e.target === id);
  });

  selectNode(id: string | null) {
    this._selectedNodeId.set(this._selectedNodeId() === id ? null : id);
  }

  clearSelection() {
    this._selectedNodeId.set(null);
  }

  setHoveredEdge(id: string | null) {
    this._hoveredEdgeId.set(id);
  }

  setExploreMode(mode: ExploreMode) {
    this._exploreMode.set(mode);
  }

  setActiveTab(tab: 'pathways' | 'mechanisms') {
    this._activeTab.set(tab);
  }
}
