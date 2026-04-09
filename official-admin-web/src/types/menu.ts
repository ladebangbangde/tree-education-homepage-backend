export interface MenuNode {
  id: number;
  name: string;
  path: string;
  icon?: string;
  type: string;
  enabled: boolean;
  children?: MenuNode[];
}
