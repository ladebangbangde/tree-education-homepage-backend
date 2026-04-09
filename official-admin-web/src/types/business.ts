export interface UserItem {
  id: number;
  username: string;
  displayName: string;
  email: string;
  phone: string;
  status: string;
}

export interface RoleItem {
  id: number;
  code: string;
  name: string;
  dataScope: string;
  status: string;
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
  status: string;
  publishedAt: string;
}

export interface LeadItem {
  id: number;
  studentName: string;
  phone: string;
  sourceChannel: string;
  status: string;
  consultant: string;
  intentionLevel: string;
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
  siteCode: string;
  siteName: string;
  defaultLocale: string;
  supportEmail: string;
  supportPhone: string;
  logoUrl: string;
  status: string;
}

export interface AuditLog {
  id: number;
  operator: string;
  module: string;
  action: string;
  requestPath: string;
  requestMethod: string;
  successFlag: boolean;
  resultStatus: string;
  riskTag: string;
  createdAt: string;
}
