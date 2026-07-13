export type NodeCategory =
  | 'brainstem'
  | 'cns'
  | 'reward'
  | 'gut'
  | 'pancreas'
  | 'genetic'
  | 'adipose'
  | 'energy';

export interface GraphNode {
  id: string;
  label: string;
  category: NodeCategory;
  x: number;       
  y: number;    
  radius: number;  
  system?: string;
  description?: string;
  refs?: string[];
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  kind: 'primary' | 'secondary' | 'dotted';
  label?: string;
}

export interface GraphCluster {
  id: string;
  label: string;
  category: NodeCategory;
  nodeIds: string[];
}

export interface GraphData {
  clusters: GraphCluster[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}
