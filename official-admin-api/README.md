# official-admin-api

留学教育机构官网后台管理系统独立后端（模块化单体）项目。当前版本提供企业级可运行骨架、认证授权、核心后台模型与首批可用接口。

## 1. 项目目录

```text
official-admin-api/
├─ src/main/java/com/company/admin/
│  ├─ AdminApplication.java
│  ├─ common/ (统一响应、异常、安全、审计、配置)
│  ├─ modules/
│  │  ├─ auth user role department permission menu
│  │  ├─ cms lead media siteconfig systemconfig auditlog
│  │  └─ consultant dashboard form message analytics approval
│  ├─ integrations/ (minio/sms/email/webhook 预留)
│  └─ support/ (openapi/flyway/seed)
├─ src/main/resources/
│  ├─ application.yml
│  ├─ application-local.yml
│  ├─ application-dev.yml
│  ├─ db/migration/V1__init_schema_and_seed.sql
│  └─ logback-spring.xml
├─ pom.xml
└─ README.md
```

## 2. 关键模块说明

- **common**：统一返回结构 `ApiResponse`、全局异常处理、JWT 鉴权过滤器、审计注解与切面。
- **auth**：登录、当前用户信息接口，返回 `token + 用户信息 + 权限集合`。
- **user/role/permission/menu**：RBAC 核心模块，支持用户/角色管理、权限点查询、菜单树。
- **cms**：文章列表、新增、编辑、发布，自动保存文章版本。
- **lead**：线索列表、详情、分配、跟进记录。
- **systemconfig**：系统配置项读取与更新。
- **auditlog**：登录日志、操作日志查询。

## 3. 核心实体设计

- 认证授权：`sys_user/sys_role/sys_department/sys_menu/sys_permission/sys_user_role/sys_role_permission/sys_data_scope_policy/sys_login_log`
- CMS：`cms_column/cms_page/cms_article/cms_article_version/cms_country/cms_school/cms_case/cms_seo_config`
- 线索：`lead_record/lead_follow_record/lead_assign_record/lead_source_rule`
- 媒体：`media_asset/media_category/media_tag/media_asset_tag_rel`
- 站点与系统：`site_config/site_navigation/site_footer_config/sys_dictionary/sys_config_item`
- 审计：`sys_operation_log/sys_publish_log/sys_security_audit_log`

所有表统一包含基础审计字段：`id/created_at/created_by/updated_at/updated_by/deleted_flag`。

## 4. Flyway 迁移脚本

- `db/migration/V1__init_schema_and_seed.sql`
  - 一次性创建一期 P0 全量基础表
  - 初始化管理员、角色、权限、菜单、配置、CMS 示例、线索示例、日志示例

## 5. 已实现接口列表（首批可运行）

### 认证
- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`

### 用户与角色
- `GET /api/admin/users`
- `POST /api/admin/users`
- `GET /api/admin/roles`
- `POST /api/admin/roles`
- `PUT /api/admin/roles/{id}/permissions`

### 菜单与权限
- `GET /api/admin/menus/tree`
- `GET /api/admin/permissions`

### CMS
- `GET /api/admin/cms/articles`
- `POST /api/admin/cms/articles`
- `PUT /api/admin/cms/articles/{id}`
- `PUT /api/admin/cms/articles/{id}/publish`

### 线索
- `GET /api/admin/leads`
- `GET /api/admin/leads/{id}`
- `PUT /api/admin/leads/{id}/assign`
- `POST /api/admin/leads/{id}/follow-records`

### 系统配置
- `GET /api/admin/system/config-items`
- `PUT /api/admin/system/config-items/{id}`

### 日志
- `GET /api/admin/audit/operation-logs`
- `GET /api/admin/audit/login-logs`

## 6. 认证与权限实现说明

- Spring Security + JWT 无状态认证。
- 登录校验用户名密码（BCrypt），登录成功写入 `sys_login_log`。
- JWT 中携带用户 ID、用户名、权限集合。
- 通过 `@PreAuthorize("hasAuthority('module:resource:action')")` 做接口级权限校验。
- 未登录/无权限由全局异常与 Security 机制统一返回。

## 7. 审计日志实现说明

- 提供 `@AuditOperation` 注解（模块、动作、高风险标记）。
- `AuditAspect` 统一拦截关键方法，写入 `sys_operation_log`。
- 记录操作人、模块、动作、请求路径、请求时间、结果状态、风险标签。

## 8. 本地启动说明

### 前置环境
- JDK 17+
- Maven 3.9+
- MySQL 8（数据库 `official_admin`）
- Redis（默认 localhost:6379）

### 启动
```bash
cd official-admin-api
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### Swagger
- `http://localhost:8080/swagger-ui.html`

### 默认管理员
- 用户名：`admin`
- 密码：`password`

## 9. 下一步建议开发顺序

1. 补齐 department/menu/permission 的新增编辑排序与授权闭环。
2. 增加 refresh token、多端会话、登录失败锁定、安全策略（IP 白名单/2FA）。
3. 完善 CMS（栏目树/页面配置/SEO 配置/发布流/下线）。
4. 完善 lead（来源规则、导出权限、分配策略、顾问池联动）。
5. 接入 MinIO 媒体上传与引用关系检查。
6. 落地 siteconfig 全量接口与多站点多语言模型。
7. 增加模块边界测试（Spring Modulith）与审计追踪链路（变更前后摘要）。
