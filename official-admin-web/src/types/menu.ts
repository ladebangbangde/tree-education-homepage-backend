export interface MenuNode {
  id: number;
  name: string;
  path: string;
  icon?: string;
  type: 'MENU' | 'BUTTON' | 'DIRECTORY';
  enabled: boolean;
  children?: MenuNode[];
}
