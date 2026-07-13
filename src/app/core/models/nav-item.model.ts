export interface NavItem {
  id: string;
  label: string;
  icon: string;      
  route: string;
  disabled?: boolean; 
  badge?: string;
}

export interface SubNavItem {
  id: string;
  label: string;
  route: string;
}
