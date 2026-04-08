-- Seed basic data for v1 contract

INSERT INTO sys_department (id, parent_id, dept_code, dept_name, sort_order, status, created_by, updated_by)
VALUES (1, 0, 'HQ', '总部', 1, 'ENABLED', 0, 0);

INSERT INTO sys_role (id, role_code, role_name, data_scope_type, enabled, status, created_by, updated_by)
VALUES
  (1, 'SUPER_ADMIN', '超级管理员', 'ALL', 1, 'ENABLED', 0, 0),
  (2, 'CONSULTANT', '留学顾问', 'SELF', 1, 'ENABLED', 0, 0),
  (3, 'CONTENT_EDITOR', '内容编辑', 'COUNTRY_LINE', 1, 'ENABLED', 0, 0);

INSERT INTO sys_user (id, username, display_name, password_hash, email, department_id, status, enabled, created_by, updated_by)
VALUES
  (1, 'admin', '超级管理员', '$2a$10$7EqJtq98hPqEX7fNZaFWoOeL6W5xE2mR7BfrpsbR9f7DmqDveoxu', 'admin@company.com', 1, 'ENABLED', 1, 0, 0);

INSERT INTO sys_user_role (id, user_id, role_id, created_by, updated_by)
VALUES
  (1, 1, 1, 0, 0);

INSERT INTO sys_menu (id, parent_id, menu_name, menu_type, route_path, sort_order, enabled, created_by, updated_by)
VALUES
  (1, 0, '系统管理', 'DIRECTORY', '/system', 1, 1, 0, 0),
  (2, 0, 'CMS 管理', 'DIRECTORY', '/cms', 2, 1, 0, 0),
  (3, 0, '线索中心', 'DIRECTORY', '/leads', 3, 1, 0, 0),
  (4, 0, '审计日志', 'DIRECTORY', '/audit', 4, 1, 0, 0);

INSERT INTO sys_permission (id, permission_code, permission_name, module_key, resource_key, action_key, enabled, created_by, updated_by)
VALUES
  (1, 'auth:user:view', '用户查看', 'auth', 'user', 'view', 1, 0, 0),
  (2, 'auth:user:create', '用户创建', 'auth', 'user', 'create', 1, 0, 0),
  (3, 'auth:user:update', '用户更新', 'auth', 'user', 'update', 1, 0, 0),
  (4, 'auth:role:view', '角色查看', 'auth', 'role', 'view', 1, 0, 0),
  (5, 'auth:role:create', '角色创建', 'auth', 'role', 'create', 1, 0, 0),
  (6, 'auth:role:grant', '角色授权', 'auth', 'role', 'grant', 1, 0, 0),
  (7, 'cms:article:view', '文章查看', 'cms', 'article', 'view', 1, 0, 0),
  (8, 'cms:article:create', '文章创建', 'cms', 'article', 'create', 1, 0, 0),
  (9, 'cms:article:update', '文章更新', 'cms', 'article', 'update', 1, 0, 0),
  (10, 'cms:article:publish', '文章发布', 'cms', 'article', 'publish', 1, 0, 0),
  (11, 'lead:record:view', '线索查看', 'lead', 'record', 'view', 1, 0, 0),
  (12, 'lead:record:assign', '线索分配', 'lead', 'record', 'assign', 1, 0, 0),
  (13, 'lead:record:follow', '线索跟进', 'lead', 'record', 'follow', 1, 0, 0),
  (14, 'site:config:view', '站点配置查看', 'site', 'config', 'view', 1, 0, 0),
  (15, 'site:config:update', '站点配置更新', 'site', 'config', 'update', 1, 0, 0),
  (16, 'system:config:view', '系统配置查看', 'system', 'config', 'view', 1, 0, 0),
  (17, 'system:config:update', '系统配置更新', 'system', 'config', 'update', 1, 0, 0),
  (18, 'audit:log:view', '审计日志查看', 'audit', 'log', 'view', 1, 0, 0),
  (19, 'auth:menu:view', '菜单查看', 'auth', 'menu', 'view', 1, 0, 0),
  (20, 'auth:permission:view', '权限点查看', 'auth', 'permission', 'view', 1, 0, 0);

INSERT INTO sys_role_permission (id, role_id, permission_id, created_by, updated_by)
VALUES
  (1, 1, 1, 0, 0), (2, 1, 2, 0, 0), (3, 1, 3, 0, 0),
  (4, 1, 4, 0, 0), (5, 1, 5, 0, 0), (6, 1, 6, 0, 0),
  (7, 1, 7, 0, 0), (8, 1, 8, 0, 0), (9, 1, 9, 0, 0), (10, 1, 10, 0, 0),
  (11, 1, 11, 0, 0), (12, 1, 12, 0, 0), (13, 1, 13, 0, 0),
  (14, 1, 14, 0, 0), (15, 1, 15, 0, 0), (16, 1, 16, 0, 0), (17, 1, 17, 0, 0), (18, 1, 18, 0, 0),
  (19, 1, 19, 0, 0), (20, 1, 20, 0, 0);

INSERT INTO sys_data_scope_policy (id, role_id, module_key, scope_type, scope_value_json, enabled, created_by, updated_by)
VALUES
  (1, 1, 'all', 'ALL', JSON_OBJECT('note', '超级管理员全量数据范围'), 1, 0, 0),
  (2, 2, 'lead', 'SELF', JSON_OBJECT('note', '顾问查看本人线索'), 1, 0, 0),
  (3, 3, 'cms', 'COUNTRY_LINE', JSON_OBJECT('countries', JSON_ARRAY('US', 'UK')), 1, 0, 0);

INSERT INTO cms_column (id, parent_id, column_name, column_code, site_code, status, sort_order, created_by, updated_by)
VALUES
  (1, 0, '留学资讯', 'news', 'default', 'ENABLED', 1, 0, 0),
  (2, 0, '成功案例', 'cases', 'default', 'ENABLED', 2, 0, 0);

INSERT INTO cms_article (id, column_id, title, slug, summary, content_markdown, content_html, status, current_version_no, published_version_no, published_at, published_by, created_by, updated_by)
VALUES
  (1, 1, '2026 英国留学趋势', 'uk-study-trend-2026', '英国申请趋势分析', '# 标题\n示例内容', '<h1>标题</h1><p>示例内容</p>', 'PUBLISHED', 1, 1, NOW(), 1, 0, 0);

INSERT INTO cms_article_version (id, article_id, version_no, version_status, title_snapshot, summary_snapshot, content_markdown_snapshot, content_html_snapshot, change_log, created_by, updated_by)
VALUES
  (1, 1, 1, 'PUBLISHED', '2026 英国留学趋势', '英国申请趋势分析', '# 标题\n示例内容', '<h1>标题</h1><p>示例内容</p>', '初始化版本', 0, 0);

INSERT INTO lead_record (id, lead_no, student_name, phone, source_channel, status, consultant_user_id, intent_level, created_by, updated_by)
VALUES
  (1, 'L20260001', '张同学', '13800000001', 'WEB_FORM', 'ASSIGNED', 1, 'HIGH', 0, 0);

INSERT INTO lead_assign_record (id, lead_id, from_user_id, to_user_id, assign_reason, assigned_at, created_by)
VALUES
  (1, 1, NULL, 1, '初始分配', NOW(), 0);

INSERT INTO lead_follow_record (id, lead_id, follow_type, follow_content, follow_result, follow_at, next_follow_at, created_by)
VALUES
  (1, 1, 'PHONE', '已电话沟通，计划周五面谈', 'POSITIVE', NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY), 1);

INSERT INTO sys_config_item (id, config_key, config_value, config_group, value_type, enabled, created_by, updated_by)
VALUES
  (1, 'site.default.seo.title', '留学教育机构官网', 'BUSINESS', 'STRING', 1, 0, 0),
  (2, 'lead.auto.assign.enabled', 'false', 'BUSINESS', 'BOOLEAN', 1, 0, 0),
  (3, 'security.password.maxRetry', '5', 'SECURITY', 'INTEGER', 1, 0, 0);

INSERT INTO sys_dictionary (id, dict_type, dict_key, dict_value, sort_order, enabled, created_by, updated_by)
VALUES
  (1, 'lead_status', 'NEW', '新线索', 1, 1, 0, 0),
  (2, 'lead_status', 'ASSIGNED', '已分配', 2, 1, 0, 0),
  (3, 'article_status', 'DRAFT', '草稿', 1, 1, 0, 0),
  (4, 'article_status', 'PUBLISHED', '已发布', 2, 1, 0, 0);

INSERT INTO site_config (id, site_code, site_name, default_locale, support_email, support_phone, status, created_by, updated_by)
VALUES
  (1, 'default', '留学教育机构官网', 'zh-CN', 'service@company.com', '400-800-1234', 'ENABLED', 0, 0);

INSERT INTO site_navigation (id, site_code, nav_name, nav_type, nav_link, open_mode, sort_order, enabled, created_by, updated_by)
VALUES
  (1, 'default', '首页', 'HEADER', '/', 'SELF', 1, 1, 0, 0),
  (2, 'default', '留学资讯', 'HEADER', '/news', 'SELF', 2, 1, 0, 0);

INSERT INTO site_footer_config (id, site_code, locale, footer_json, created_by, updated_by)
VALUES
  (1, 'default', 'zh-CN', JSON_OBJECT('copyright', '© 2026 Company', 'icp', '沪ICP备00000000号'), 0, 0);
