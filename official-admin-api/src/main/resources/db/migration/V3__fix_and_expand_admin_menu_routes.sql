-- Fix and expand admin menu routes for official-admin-web

-- 1) 修正并标准化现有顶层菜单
INSERT INTO sys_menu
(id, parent_id, menu_name, menu_type, route_path, component_path, permission_code, icon, enabled, sort_order, created_by, updated_by)
VALUES
  (1, 0, '系统管理', 'DIRECTORY', '/system', NULL, NULL, 'system', 1, 2, 0, 0),
  (2, 0, 'CMS 管理', 'DIRECTORY', '/cms', NULL, NULL, 'cms', 1, 3, 0, 0),
  (3, 0, '线索中心', 'MENU', '/leads', NULL, 'lead:record:view', 'leads', 1, 4, 0, 0),
  (4, 0, '审计日志', 'MENU', '/audit/logs', NULL, 'audit:log:view', 'audit', 1, 5, 0, 0),
  (5, 0, '工作台', 'MENU', '/dashboard', NULL, NULL, 'dashboard', 1, 1, 0, 0)
ON DUPLICATE KEY UPDATE
  parent_id = VALUES(parent_id),
  menu_name = VALUES(menu_name),
  menu_type = VALUES(menu_type),
  route_path = VALUES(route_path),
  component_path = VALUES(component_path),
  permission_code = VALUES(permission_code),
  icon = VALUES(icon),
  enabled = VALUES(enabled),
  sort_order = VALUES(sort_order),
  updated_by = VALUES(updated_by);

-- 2) 系统管理子菜单
INSERT INTO sys_menu
(id, parent_id, menu_name, menu_type, route_path, component_path, permission_code, icon, enabled, sort_order, created_by, updated_by)
VALUES
  (6, 1, '用户管理', 'MENU', '/users', NULL, 'auth:user:view', 'users', 1, 1, 0, 0),
  (7, 1, '角色管理', 'MENU', '/roles', NULL, 'auth:role:view', 'roles', 1, 2, 0, 0),
  (8, 1, '菜单管理', 'MENU', '/menus', NULL, 'auth:menu:view', 'menus', 1, 3, 0, 0),
  (9, 1, '权限点查看', 'MENU', '/permissions', NULL, 'auth:permission:view', 'permissions', 1, 4, 0, 0),
  (10, 1, '系统配置', 'MENU', '/system/config', NULL, 'system:config:view', 'system', 1, 5, 0, 0),
  (11, 1, '站点配置', 'MENU', '/site/config', NULL, 'site:config:view', 'site', 1, 6, 0, 0)
ON DUPLICATE KEY UPDATE
  parent_id = VALUES(parent_id),
  menu_name = VALUES(menu_name),
  menu_type = VALUES(menu_type),
  route_path = VALUES(route_path),
  component_path = VALUES(component_path),
  permission_code = VALUES(permission_code),
  icon = VALUES(icon),
  enabled = VALUES(enabled),
  sort_order = VALUES(sort_order),
  updated_by = VALUES(updated_by);

-- 3) CMS 子菜单
INSERT INTO sys_menu
(id, parent_id, menu_name, menu_type, route_path, component_path, permission_code, icon, enabled, sort_order, created_by, updated_by)
VALUES
  (12, 2, '文章管理', 'MENU', '/cms/articles', NULL, 'cms:article:view', 'cms', 1, 1, 0, 0)
ON DUPLICATE KEY UPDATE
  parent_id = VALUES(parent_id),
  menu_name = VALUES(menu_name),
  menu_type = VALUES(menu_type),
  route_path = VALUES(route_path),
  component_path = VALUES(component_path),
  permission_code = VALUES(permission_code),
  icon = VALUES(icon),
  enabled = VALUES(enabled),
  sort_order = VALUES(sort_order),
  updated_by = VALUES(updated_by);

-- 4) 给超级管理员补角色-菜单关系
INSERT IGNORE INTO sys_role_menu (role_id, menu_id, created_by, updated_by)
VALUES
  (1, 1, 0, 0),
  (1, 2, 0, 0),
  (1, 3, 0, 0),
  (1, 4, 0, 0),
  (1, 5, 0, 0),
  (1, 6, 0, 0),
  (1, 7, 0, 0),
  (1, 8, 0, 0),
  (1, 9, 0, 0),
  (1, 10, 0, 0),
  (1, 11, 0, 0),
  (1, 12, 0, 0);
