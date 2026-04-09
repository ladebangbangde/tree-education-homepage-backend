export interface UserItem {
  id: number;
  username: string;
  displayName: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface RoleItem {
  id: number;
  code: string;
  name: string;
  dataScope: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface PermissionItem {
  code: string;
  name: string;
  module: string;
  resource: string;
  action: string;
}

export interface CmsArticle {
  id: number;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: string;
}

export interface LeadItem {
  id: number;
  studentName: string;
  phone: string;
  sourceChannel: string;
  status: string;
  consultant: string;
  intentionLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
}

export interface ConfigItem {
  id: number;
  key: string;
  value: string;
  group: string;
  type: string;
}

export interface SiteConfig {
  site_code: string;
  site_name: string;
  default_locale: string;
  support_email: string;
  support_phone: string;
  status: 'ENABLED' | 'DISABLED';
}

export interface AuditLog {
  id: number;
  operator: string;
  module: string;
  action: string;
  requestPath: string;
  requestMethod: string;
  successFlag: boolean;
  createdAt: string;
}
