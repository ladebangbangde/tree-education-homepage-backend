-- Core schema v1 for study-abroad education admin backend

CREATE TABLE IF NOT EXISTS sys_department (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  parent_id BIGINT NOT NULL DEFAULT 0,
  dept_code VARCHAR(64) NOT NULL,
  dept_name VARCHAR(128) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  sort_order INT NOT NULL DEFAULT 0,
  remark VARCHAR(512) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_department_code (dept_code),
  KEY idx_sys_department_parent (parent_id, sort_order),
  KEY idx_sys_department_status (status, deleted_flag)
);

CREATE TABLE IF NOT EXISTS sys_user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(64) NOT NULL,
  display_name VARCHAR(128) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(32) DEFAULT NULL,
  email VARCHAR(128) DEFAULT NULL,
  wechat_no VARCHAR(128) DEFAULT NULL,
  department_id BIGINT DEFAULT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at DATETIME DEFAULT NULL,
  remark VARCHAR(512) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_user_username (username),
  UNIQUE KEY uk_sys_user_email (email),
  KEY idx_sys_user_department_status (department_id, status, deleted_flag),
  CONSTRAINT fk_sys_user_department FOREIGN KEY (department_id) REFERENCES sys_department(id)
);

CREATE TABLE IF NOT EXISTS sys_role (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_code VARCHAR(64) NOT NULL,
  role_name VARCHAR(128) NOT NULL,
  data_scope_type VARCHAR(32) NOT NULL DEFAULT 'SELF',
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  remark VARCHAR(512) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_role_code (role_code),
  KEY idx_sys_role_status (status, enabled, deleted_flag)
);

CREATE TABLE IF NOT EXISTS sys_menu (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  parent_id BIGINT NOT NULL DEFAULT 0,
  menu_name VARCHAR(128) NOT NULL,
  menu_type VARCHAR(32) NOT NULL,
  route_path VARCHAR(255) DEFAULT NULL,
  component_path VARCHAR(255) DEFAULT NULL,
  permission_code VARCHAR(128) DEFAULT NULL,
  icon VARCHAR(128) DEFAULT NULL,
  external_link VARCHAR(512) DEFAULT NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  remark VARCHAR(512) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  KEY idx_sys_menu_parent_sort (parent_id, sort_order),
  KEY idx_sys_menu_type_enabled (menu_type, enabled, deleted_flag)
);

CREATE TABLE IF NOT EXISTS sys_permission (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  permission_code VARCHAR(128) NOT NULL,
  permission_name VARCHAR(128) NOT NULL,
  module_key VARCHAR(64) NOT NULL,
  resource_key VARCHAR(64) NOT NULL,
  action_key VARCHAR(64) NOT NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  remark VARCHAR(512) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_permission_code (permission_code),
  KEY idx_sys_permission_module (module_key, enabled, deleted_flag)
);

CREATE TABLE IF NOT EXISTS sys_user_role (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_user_role (user_id, role_id),
  KEY idx_sys_user_role_role (role_id),
  CONSTRAINT fk_sys_user_role_user FOREIGN KEY (user_id) REFERENCES sys_user(id),
  CONSTRAINT fk_sys_user_role_role FOREIGN KEY (role_id) REFERENCES sys_role(id)
);

CREATE TABLE IF NOT EXISTS sys_role_menu (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL,
  menu_id BIGINT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_role_menu (role_id, menu_id),
  KEY idx_sys_role_menu_menu (menu_id),
  CONSTRAINT fk_sys_role_menu_role FOREIGN KEY (role_id) REFERENCES sys_role(id),
  CONSTRAINT fk_sys_role_menu_menu FOREIGN KEY (menu_id) REFERENCES sys_menu(id)
);

CREATE TABLE IF NOT EXISTS sys_role_permission (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL,
  permission_id BIGINT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_role_permission (role_id, permission_id),
  KEY idx_sys_role_permission_permission (permission_id),
  CONSTRAINT fk_sys_role_permission_role FOREIGN KEY (role_id) REFERENCES sys_role(id),
  CONSTRAINT fk_sys_role_permission_permission FOREIGN KEY (permission_id) REFERENCES sys_permission(id)
);

CREATE TABLE IF NOT EXISTS sys_data_scope_policy (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL,
  module_key VARCHAR(64) NOT NULL,
  scope_type VARCHAR(32) NOT NULL,
  scope_value_json JSON DEFAULT NULL,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  remark VARCHAR(512) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  KEY idx_sys_data_scope_role_module (role_id, module_key, enabled, deleted_flag),
  CONSTRAINT fk_sys_data_scope_role FOREIGN KEY (role_id) REFERENCES sys_role(id)
);

CREATE TABLE IF NOT EXISTS cms_column (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  parent_id BIGINT NOT NULL DEFAULT 0,
  column_name VARCHAR(128) NOT NULL,
  column_code VARCHAR(64) NOT NULL,
  site_code VARCHAR(64) NOT NULL DEFAULT 'default',
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  sort_order INT NOT NULL DEFAULT 0,
  remark VARCHAR(512) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_cms_column_site_code (site_code, column_code),
  KEY idx_cms_column_parent_sort (parent_id, sort_order),
  KEY idx_cms_column_status (status, deleted_flag)
);

CREATE TABLE IF NOT EXISTS cms_article (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  column_id BIGINT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  summary VARCHAR(1024) DEFAULT NULL,
  cover_asset_id BIGINT DEFAULT NULL,
  content_markdown LONGTEXT,
  content_html LONGTEXT,
  site_code VARCHAR(64) NOT NULL DEFAULT 'default',
  locale VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
  status VARCHAR(32) NOT NULL DEFAULT 'DRAFT',
  current_version_no INT NOT NULL DEFAULT 1,
  published_version_no INT DEFAULT NULL,
  published_at DATETIME DEFAULT NULL,
  published_by BIGINT DEFAULT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  remark VARCHAR(512) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_cms_article_slug_site (site_code, slug),
  KEY idx_cms_article_column_status (column_id, status, deleted_flag),
  KEY idx_cms_article_publish_time (published_at),
  CONSTRAINT fk_cms_article_column FOREIGN KEY (column_id) REFERENCES cms_column(id)
);

CREATE TABLE IF NOT EXISTS cms_article_version (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  article_id BIGINT NOT NULL,
  version_no INT NOT NULL,
  version_status VARCHAR(32) NOT NULL DEFAULT 'DRAFT',
  title_snapshot VARCHAR(255) NOT NULL,
  summary_snapshot VARCHAR(1024) DEFAULT NULL,
  content_markdown_snapshot LONGTEXT,
  content_html_snapshot LONGTEXT,
  change_log VARCHAR(1024) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_cms_article_version (article_id, version_no),
  KEY idx_cms_article_version_status (article_id, version_status),
  CONSTRAINT fk_cms_article_version_article FOREIGN KEY (article_id) REFERENCES cms_article(id)
);

CREATE TABLE IF NOT EXISTS lead_record (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  lead_no VARCHAR(64) NOT NULL,
  student_name VARCHAR(128) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(128) DEFAULT NULL,
  wechat_no VARCHAR(128) DEFAULT NULL,
  source_channel VARCHAR(64) NOT NULL,
  source_detail VARCHAR(255) DEFAULT NULL,
  intended_country_code VARCHAR(32) DEFAULT NULL,
  intended_school_id BIGINT DEFAULT NULL,
  consultant_user_id BIGINT DEFAULT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'NEW',
  intent_level VARCHAR(32) DEFAULT 'MEDIUM',
  latest_follow_at DATETIME DEFAULT NULL,
  next_follow_at DATETIME DEFAULT NULL,
  remark VARCHAR(1024) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_lead_record_no (lead_no),
  KEY idx_lead_record_phone (phone),
  KEY idx_lead_record_status_assignee (status, consultant_user_id),
  KEY idx_lead_record_source_time (source_channel, created_at)
);

CREATE TABLE IF NOT EXISTS lead_follow_record (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  lead_id BIGINT NOT NULL,
  follow_type VARCHAR(32) NOT NULL,
  follow_content VARCHAR(4000) NOT NULL,
  follow_result VARCHAR(64) DEFAULT NULL,
  follow_at DATETIME NOT NULL,
  next_follow_at DATETIME DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  KEY idx_lead_follow_lead_time (lead_id, follow_at),
  CONSTRAINT fk_lead_follow_record_lead FOREIGN KEY (lead_id) REFERENCES lead_record(id)
);

CREATE TABLE IF NOT EXISTS lead_assign_record (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  lead_id BIGINT NOT NULL,
  from_user_id BIGINT DEFAULT NULL,
  to_user_id BIGINT NOT NULL,
  assign_reason VARCHAR(512) DEFAULT NULL,
  assigned_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  KEY idx_lead_assign_lead_time (lead_id, assigned_at),
  KEY idx_lead_assign_to_user (to_user_id, assigned_at),
  CONSTRAINT fk_lead_assign_record_lead FOREIGN KEY (lead_id) REFERENCES lead_record(id)
);

CREATE TABLE IF NOT EXISTS sys_config_item (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  config_key VARCHAR(128) NOT NULL,
  config_value VARCHAR(2048) NOT NULL,
  config_group VARCHAR(64) NOT NULL DEFAULT 'BUSINESS',
  value_type VARCHAR(32) NOT NULL DEFAULT 'STRING',
  encrypted TINYINT(1) NOT NULL DEFAULT 0,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  remark VARCHAR(512) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_config_item_key (config_key),
  KEY idx_sys_config_item_group (config_group, enabled, deleted_flag)
);

CREATE TABLE IF NOT EXISTS sys_dictionary (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  dict_type VARCHAR(128) NOT NULL,
  dict_key VARCHAR(128) NOT NULL,
  dict_value VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  remark VARCHAR(512) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_sys_dictionary_type_key (dict_type, dict_key),
  KEY idx_sys_dictionary_type_enabled (dict_type, enabled, deleted_flag)
);

CREATE TABLE IF NOT EXISTS sys_login_log (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT DEFAULT NULL,
  username VARCHAR(64) NOT NULL,
  login_result VARCHAR(32) NOT NULL,
  login_type VARCHAR(32) NOT NULL DEFAULT 'PASSWORD',
  ip_address VARCHAR(64) NOT NULL,
  user_agent VARCHAR(512) DEFAULT NULL,
  fail_reason VARCHAR(255) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_sys_login_log_user_time (user_id, created_at),
  KEY idx_sys_login_log_result_time (login_result, created_at)
);

CREATE TABLE IF NOT EXISTS sys_operation_log (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  operator_id BIGINT DEFAULT NULL,
  operator_name VARCHAR(128) DEFAULT NULL,
  module_key VARCHAR(64) NOT NULL,
  action_key VARCHAR(128) NOT NULL,
  request_method VARCHAR(16) NOT NULL,
  request_path VARCHAR(255) NOT NULL,
  biz_type VARCHAR(64) DEFAULT NULL,
  biz_id BIGINT DEFAULT NULL,
  trace_id VARCHAR(64) DEFAULT NULL,
  result_code VARCHAR(16) NOT NULL,
  success_flag TINYINT(1) NOT NULL DEFAULT 1,
  ip_address VARCHAR(64) DEFAULT NULL,
  user_agent VARCHAR(512) DEFAULT NULL,
  before_snapshot LONGTEXT,
  after_snapshot LONGTEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_sys_operation_log_time (created_at),
  KEY idx_sys_operation_log_biz (biz_type, biz_id),
  KEY idx_sys_operation_log_operator (operator_id, created_at)
);

CREATE TABLE IF NOT EXISTS sys_publish_log (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  module_key VARCHAR(64) NOT NULL,
  biz_type VARCHAR(64) NOT NULL,
  biz_id BIGINT NOT NULL,
  version_no INT DEFAULT NULL,
  publish_status VARCHAR(32) NOT NULL,
  trace_id VARCHAR(64) DEFAULT NULL,
  summary VARCHAR(1024) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  KEY idx_sys_publish_log_biz (biz_type, biz_id, created_at),
  KEY idx_sys_publish_log_status_time (publish_status, created_at)
);

CREATE TABLE IF NOT EXISTS sys_security_audit_log (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_type VARCHAR(128) NOT NULL,
  event_level VARCHAR(32) NOT NULL DEFAULT 'INFO',
  username VARCHAR(128) DEFAULT NULL,
  user_id BIGINT DEFAULT NULL,
  ip_address VARCHAR(64) DEFAULT NULL,
  trace_id VARCHAR(64) DEFAULT NULL,
  detail VARCHAR(2048) DEFAULT NULL,
  risk_tag VARCHAR(64) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_sys_security_audit_log_time (created_at),
  KEY idx_sys_security_audit_log_event (event_type, created_at),
  KEY idx_sys_security_audit_log_user (user_id, created_at)
);

-- P1 tables
CREATE TABLE IF NOT EXISTS cms_page (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  page_key VARCHAR(128) NOT NULL,
  page_name VARCHAR(128) NOT NULL,
  site_code VARCHAR(64) NOT NULL DEFAULT 'default',
  locale VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
  page_schema_json JSON,
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  sort_order INT NOT NULL DEFAULT 0,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_cms_page_key (site_code, locale, page_key)
);

CREATE TABLE IF NOT EXISTS cms_country (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  country_code VARCHAR(32) NOT NULL,
  country_name VARCHAR(128) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  sort_order INT NOT NULL DEFAULT 0,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_cms_country_code (country_code)
);

CREATE TABLE IF NOT EXISTS cms_school (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  school_code VARCHAR(64) NOT NULL,
  school_name VARCHAR(255) NOT NULL,
  country_id BIGINT NOT NULL,
  ranking VARCHAR(64) DEFAULT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  sort_order INT NOT NULL DEFAULT 0,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_cms_school_code (school_code),
  KEY idx_cms_school_country (country_id, status, deleted_flag),
  CONSTRAINT fk_cms_school_country FOREIGN KEY (country_id) REFERENCES cms_country(id)
);

CREATE TABLE IF NOT EXISTS cms_case (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  case_no VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  country_id BIGINT DEFAULT NULL,
  school_id BIGINT DEFAULT NULL,
  article_id BIGINT DEFAULT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'DRAFT',
  sort_order INT NOT NULL DEFAULT 0,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_cms_case_no (case_no)
);

CREATE TABLE IF NOT EXISTS cms_seo_config (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  biz_type VARCHAR(32) NOT NULL,
  biz_id BIGINT NOT NULL,
  site_code VARCHAR(64) NOT NULL DEFAULT 'default',
  locale VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
  seo_title VARCHAR(255) DEFAULT NULL,
  seo_keywords VARCHAR(512) DEFAULT NULL,
  seo_description VARCHAR(1024) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_cms_seo_config_biz (biz_type, biz_id, site_code, locale)
);

CREATE TABLE IF NOT EXISTS media_category (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(128) NOT NULL,
  parent_id BIGINT NOT NULL DEFAULT 0,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_media_category_name (category_name)
);

CREATE TABLE IF NOT EXISTS media_asset (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  asset_no VARCHAR(64) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_ext VARCHAR(32) DEFAULT NULL,
  mime_type VARCHAR(128) DEFAULT NULL,
  file_size BIGINT NOT NULL,
  file_hash VARCHAR(128) NOT NULL,
  storage_type VARCHAR(32) NOT NULL DEFAULT 'LOCAL',
  file_url VARCHAR(1024) NOT NULL,
  category_id BIGINT DEFAULT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_media_asset_no (asset_no),
  UNIQUE KEY uk_media_asset_hash (file_hash),
  KEY idx_media_asset_category_status (category_id, status, deleted_flag),
  CONSTRAINT fk_media_asset_category FOREIGN KEY (category_id) REFERENCES media_category(id)
);

CREATE TABLE IF NOT EXISTS media_tag (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tag_name VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_media_tag_name (tag_name)
);

CREATE TABLE IF NOT EXISTS media_asset_tag_rel (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  asset_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_media_asset_tag (asset_id, tag_id),
  KEY idx_media_asset_tag_tag (tag_id),
  CONSTRAINT fk_media_asset_tag_rel_asset FOREIGN KEY (asset_id) REFERENCES media_asset(id),
  CONSTRAINT fk_media_asset_tag_rel_tag FOREIGN KEY (tag_id) REFERENCES media_tag(id)
);

CREATE TABLE IF NOT EXISTS lead_source_rule (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  rule_name VARCHAR(128) NOT NULL,
  source_key VARCHAR(64) NOT NULL,
  route_expression VARCHAR(1024) NOT NULL,
  priority INT NOT NULL DEFAULT 100,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  remark VARCHAR(512) DEFAULT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_lead_source_rule_name (rule_name)
);

CREATE TABLE IF NOT EXISTS site_config (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  site_code VARCHAR(64) NOT NULL,
  site_name VARCHAR(128) NOT NULL,
  default_locale VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
  logo_url VARCHAR(1024) DEFAULT NULL,
  favicon_url VARCHAR(1024) DEFAULT NULL,
  support_email VARCHAR(128) DEFAULT NULL,
  support_phone VARCHAR(32) DEFAULT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'ENABLED',
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_site_config_code (site_code)
);

CREATE TABLE IF NOT EXISTS site_navigation (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  site_code VARCHAR(64) NOT NULL,
  nav_name VARCHAR(128) NOT NULL,
  nav_type VARCHAR(32) NOT NULL DEFAULT 'HEADER',
  nav_link VARCHAR(1024) NOT NULL,
  open_mode VARCHAR(32) NOT NULL DEFAULT 'SELF',
  sort_order INT NOT NULL DEFAULT 0,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  KEY idx_site_navigation_site_type (site_code, nav_type, enabled, deleted_flag)
);

CREATE TABLE IF NOT EXISTS site_footer_config (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  site_code VARCHAR(64) NOT NULL,
  locale VARCHAR(16) NOT NULL DEFAULT 'zh-CN',
  footer_json JSON NOT NULL,
  version INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT NOT NULL DEFAULT 0,
  deleted_flag TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE KEY uk_site_footer_config (site_code, locale)
);
