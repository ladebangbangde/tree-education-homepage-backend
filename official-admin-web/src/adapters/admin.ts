import { AuditLog, CmsArticle, ConfigItem, LeadItem, PermissionItem, RoleItem, SiteConfig, UserItem } from '@/types/business';
import { CurrentUser } from '@/types/auth';
import { BackendPageResponse, ListResponse } from '@/types/api';
import { MenuNode } from '@/types/menu';

type AnyRecord = Record<string, any>;

const toNumber = (value: unknown, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const toText = (value: unknown, fallback = '-') => {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
};

const toBoolean = (value: unknown, fallback = true) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') {
    const normalized = value.trim().toUpperCase();
    if (['ENABLED', 'ACTIVE', 'OPEN', 'ONLINE', 'PUBLISHED', 'TRUE', '1'].includes(normalized)) return true;
    if (['DISABLED', 'INACTIVE', 'CLOSED', 'OFFLINE', 'FALSE', '0'].includes(normalized)) return false;
  }
  return fallback;
};

export const normalizeListResponse = <T>(payload: BackendPageResponse<T> | undefined): ListResponse<T> => ({
  list: payload?.records ?? payload?.list ?? [],
  total: toNumber(payload?.total, 0),
  page: toNumber(payload?.pageNo ?? payload?.page, 1),
  pageSize: toNumber(payload?.pageSize, payload?.records?.length ?? payload?.list?.length ?? 0)
});

export const adaptCurrentUser = (raw: AnyRecord): CurrentUser => {
  const userId = toNumber(raw.userId ?? raw.id);
  return {
    id: userId,
    userId,
    username: toText(raw.username, ''),
    displayName: toText(raw.displayName ?? raw.nickName ?? raw.realName, '管理员'),
    permissions: Array.isArray(raw.permissions) ? raw.permissions.map((item) => String(item)) : []
  };
};

export const adaptMenuTree = (rawMenus: unknown): MenuNode[] => {
  if (!Array.isArray(rawMenus)) return [];
  return rawMenus.map((menu: AnyRecord, idx) => {
    const children = adaptMenuTree(menu.children);
    return {
      id: toNumber(menu.id, idx + 1),
      name: toText(menu.name ?? menu.menuName),
      path: toText(menu.path ?? menu.menuPath, '/'),
      icon: toText(menu.icon ?? menu.menuIcon, ''),
      type: toText(menu.type ?? menu.menuType, 'MENU'),
      enabled: toBoolean(menu.enabled ?? menu.status ?? menu.visible, true),
      children
    };
  });
};

export const adaptUsers = (rawList: AnyRecord[]): UserItem[] =>
  rawList.map((item) => ({
    id: toNumber(item.id),
    username: toText(item.username, ''),
    displayName: toText(item.displayName ?? item.nickname ?? item.realName),
    email: toText(item.email, '-'),
    phone: toText(item.phone ?? item.mobile, '-'),
    status: toText(item.status, 'UNKNOWN')
  }));

export const adaptRoles = (rawList: AnyRecord[]): RoleItem[] =>
  rawList.map((item) => ({
    id: toNumber(item.id),
    code: toText(item.code ?? item.roleCode),
    name: toText(item.name ?? item.roleName),
    dataScope: toText(item.dataScope ?? item.scope, '-'),
    status: toText(item.status, 'UNKNOWN')
  }));

export const adaptPermissions = (rawList: AnyRecord[]): PermissionItem[] =>
  rawList.map((item) => ({
    code: toText(item.code ?? item.permissionCode),
    name: toText(item.name ?? item.permissionName),
    module: toText(item.module),
    resource: toText(item.resource),
    action: toText(item.action)
  }));

export const adaptCmsArticles = (rawList: AnyRecord[]): CmsArticle[] =>
  rawList.map((item) => ({
    id: toNumber(item.id),
    title: toText(item.title),
    slug: toText(item.slug ?? item.path ?? item.id),
    status: toText(item.status, 'UNKNOWN'),
    publishedAt: toText(item.publishedAt ?? item.updatedAt ?? item.createdAt, '')
  }));

export const adaptLeads = (rawList: AnyRecord[]): LeadItem[] =>
  rawList.map((item) => ({
    id: toNumber(item.id),
    studentName: toText(item.studentName ?? item.name),
    phone: toText(item.phone, ''),
    sourceChannel: toText(item.sourceChannel ?? item.channel, '-'),
    status: toText(item.status, 'UNKNOWN'),
    consultant: toText(item.consultant ?? item.assigneeName ?? item.assignedTo, '-'),
    intentionLevel: toText(item.intentionLevel ?? item.level ?? 'UNKNOWN'),
    createdAt: toText(item.createdAt ?? item.updatedAt, '')
  }));

export const adaptConfigItems = (rawList: AnyRecord[]): ConfigItem[] =>
  rawList.map((item) => ({
    id: toNumber(item.id),
    key: toText(item.key ?? item.configKey),
    value: toText(item.value ?? item.configValue),
    group: toText(item.group ?? item.configGroup ?? 'SYSTEM'),
    type: toText(item.type ?? item.valueType ?? item.description)
  }));

export const adaptAuditLogs = (rawList: AnyRecord[]): AuditLog[] =>
  rawList.map((item) => ({
    id: toNumber(item.id),
    operator: toText(item.operator),
    module: toText(item.module),
    action: toText(item.action),
    requestPath: toText(item.requestPath),
    requestMethod: toText(item.requestMethod ?? '-'),
    successFlag: toBoolean(item.successFlag ?? item.resultStatus, false),
    resultStatus: toText(item.resultStatus, '-'),
    riskTag: toText(item.riskTag, '-'),
    createdAt: toText(item.createdAt ?? item.operationTime, '')
  }));

export const adaptSiteConfig = (item: AnyRecord): SiteConfig => ({
  siteCode: toText(item.siteCode ?? item.site_code),
  siteName: toText(item.siteName ?? item.site_name),
  defaultLocale: toText(item.defaultLocale ?? item.default_locale),
  supportEmail: toText(item.supportEmail ?? item.support_email, '-'),
  supportPhone: toText(item.supportPhone ?? item.support_phone, '-'),
  logoUrl: toText(item.logoUrl ?? item.logo_url, '-'),
  status: toText(item.status, 'UNKNOWN')
});
