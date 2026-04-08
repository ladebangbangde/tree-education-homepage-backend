# 留学教育机构官网后台（模块化单体）
## 后端领域模型 + ER + API v1 方案

> 技术栈：Java 17 / Spring Boot / Spring Security / Spring Data JPA（兼容 MyBatis）
> 范围：一期核心模块（认证权限、CMS、媒体、线索、站点配置、系统配置、日志审计）

---

## 1. 模块边界（Bounded Context）

### 1.1 auth-identity（认证身份）
- 负责：登录、Token、当前用户身份、登录审计。
- 核心实体：`sys_user`、`sys_login_log`。

### 1.2 authz-access（权限授权）
- 负责：角色、菜单、权限点、数据范围策略。
- 核心实体：`sys_role`、`sys_menu`、`sys_permission`、`sys_user_role`、`sys_role_menu`、`sys_role_permission`、`sys_data_scope_policy`。

### 1.3 org-structure（组织）
- 负责：部门树、部门-用户归属。
- 核心实体：`sys_department`。

### 1.4 cms-content（内容）
- 负责：栏目、页面、文章、文章版本、国家/院校/案例、SEO。
- 核心实体：`cms_column`、`cms_page`、`cms_article`、`cms_article_version`、`cms_country`、`cms_school`、`cms_case`、`cms_seo_config`。

### 1.5 media-center（媒体）
- 负责：素材、分类、标签、多对多关系。
- 核心实体：`media_asset`、`media_category`、`media_tag`、`media_asset_tag_rel`。

### 1.6 lead-center（线索）
- 负责：线索主记录、跟进记录、分配记录、来源规则。
- 核心实体：`lead_record`、`lead_follow_record`、`lead_assign_record`、`lead_source_rule`。

### 1.7 site-governance（站点治理）
- 负责：站点基础配置、导航、页脚。
- 核心实体：`site_config`、`site_navigation`、`site_footer_config`。

### 1.8 system-governance（系统治理）
- 负责：字典、系统配置项。
- 核心实体：`sys_dictionary`、`sys_config_item`。

### 1.9 audit-compliance（审计合规）
- 负责：操作日志、发布日志、安全审计日志。
- 核心实体：`sys_operation_log`、`sys_publish_log`、`sys_security_audit_log`。

---

## 2. 统一建模规范

- 主键：`BIGINT` 自增（后续可平滑迁移雪花 ID）。
- 通用审计字段：`id, created_at, created_by, updated_at, updated_by, deleted_flag`。
- 业务常用字段：`status, enabled, sort_order, remark, version`。
- 逻辑删除默认策略：主业务表支持，日志历史表通常不允许逻辑删除。
- 乐观锁（`version`）建议启用：
  - `sys_user`、`sys_role`、`cms_article`、`site_config`、`sys_config_item`、`lead_record`。
- 不适合逻辑删除：
  - `sys_login_log`、`sys_operation_log`、`sys_publish_log`、`sys_security_audit_log`、`lead_follow_record`、`lead_assign_record`（历史留痕要求）。
- 必须保留历史（不可覆盖）：
  - `cms_article_version`、`lead_follow_record`、`lead_assign_record`、四类审计日志表。

---

## 3. 表结构优先级（P0/P1/P2）

### P0（必须先建，最小闭环）
- 认证权限闭环：`sys_user`、`sys_role`、`sys_department`、`sys_menu`、`sys_permission`、`sys_user_role`、`sys_role_menu`、`sys_role_permission`、`sys_data_scope_policy`、`sys_login_log`
- CMS 文章闭环：`cms_column`、`cms_article`、`cms_article_version`
- 线索闭环：`lead_record`、`lead_follow_record`、`lead_assign_record`
- 配置闭环：`sys_config_item`、`sys_dictionary`
- 审计查询闭环：`sys_operation_log`、`sys_security_audit_log`、`sys_publish_log`

**原因**：支撑后台登录授权、文章运营、线索流转、系统配置与审计可追溯的最小可运行路径。

### P1（建议一期建设）
- `cms_page`、`cms_country`、`cms_school`、`cms_case`、`cms_seo_config`
- `media_asset`、`media_category`、`media_tag`、`media_asset_tag_rel`
- `site_config`、`site_navigation`、`site_footer_config`
- `lead_source_rule`

**原因**：直接提升运营效率与内容完整度，但不阻塞核心闭环。

### P2（预留扩展）
- 多站点/多语言字段：`site_code`、`locale`、`tenant_code`、`channel`。
- ABAC 扩展属性：资源标签、上下文规则表达式。

**原因**：避免当前过度实现，但保证模型扩展不被堵死。

---

## 4. 文字版 ER 关系说明

- 用户 与 角色：**多对多**，通过 `sys_user_role`。
- 角色 与 菜单：**多对多**，通过 `sys_role_menu`。
- 角色 与 权限点：**多对多**，通过 `sys_role_permission`。
- 部门 与 用户：**一对多**（`sys_user.department_id -> sys_department.id`）。
- 文章 与 栏目：**多对一**（`cms_article.column_id -> cms_column.id`）。
- 文章 与 文章版本：**一对多**（`cms_article_version.article_id -> cms_article.id`）。
- 国家 与 院校：**一对多**（`cms_school.country_id -> cms_country.id`）。
- 国家/院校/案例 与 SEO：**一对多（通用关联）**，通过 `cms_seo_config.biz_type + biz_id`。
- 线索 与 跟进记录：**一对多**（`lead_follow_record.lead_id -> lead_record.id`）。
- 线索 与 分配记录：**一对多**（`lead_assign_record.lead_id -> lead_record.id`）。
- 媒体资源 与 分类：**多对一**（`media_asset.category_id -> media_category.id`）。
- 媒体资源 与 标签：**多对多**，通过 `media_asset_tag_rel`。
- 站点配置 与 导航/页脚：**一对多 + 一对一（按站点）**。
- 操作日志/发布日志 与业务对象：通过 `biz_type + biz_id + trace_id` 关联，避免强 FK 影响写入吞吐。

---

## 5. 权限与数据范围建模

### 5.1 菜单权限
- `menu_type`：`DIRECTORY`（目录）、`PAGE`（页面）、`BUTTON`（按钮）、`EXTERNAL_LINK`（外链）。
- 层级：`parent_id` 形成树结构，可支撑一级/二级/多级。

### 5.2 权限点
- 命名统一：`模块:资源:动作`。
- 示例：
  - `cms:article:view`
  - `cms:article:publish`
  - `lead:record:assign`
  - `auth:user:resetPassword`

### 5.3 数据范围策略
- 策略枚举：`ALL / DEPARTMENT / SELF / CUSTOM / COUNTRY_LINE / SITE_SCOPE`。
- DB 表达：`sys_data_scope_policy(scope_type, role_id, scope_value_json, enabled)`。
- 角色关联：每个角色可绑定 1..N 条策略（模块维度可再加 `module_key`）。
- 最需要控制的模块：
  - 线索中心（顾问仅看本人或本部门）
  - 用户管理（HR/部门负责人）
  - CMS（按国家线/站点范围）
  - 审计日志（仅安全管理员可看全量）

---

## 6. 索引 / 唯一约束 / 状态字段建议

- 用户：`uk_username`、`uk_email`、`idx_department_status`。
- 角色：`uk_role_code`。
- 权限点：`uk_permission_code`。
- 菜单：`idx_parent_sort`。
- 文章：`uk_article_slug_site`、`idx_column_status_publish`。
- 文章版本：`uk_article_version`（`article_id, version_no`）。
- 媒体：`uk_file_hash`、`idx_category_status`。
- 线索：`idx_phone`、`idx_status_assignee`、`idx_source_time`。
- 配置：`uk_config_key`、`uk_dict_type_key`。
- 日志：按 `created_at`、`operator_id`、`biz_type+biz_id` 建组合索引。

---

## 7. API 清单（v1）

统一前缀：`/api/admin`。
统一返回：`code/message/data/traceId/timestamp`。

### 7.1 认证
1) `POST /api/admin/auth/login`
- 用途：后台账号登录。
- DTO：`{ username, password, captchaToken? }`
- VO：`{ accessToken, expiresIn, refreshToken?, userInfo }`
- 权限点：否
- 数据范围：否
- 错误码：`A001 A002 B001`

2) `GET /api/admin/auth/me`
- 用途：获取当前用户信息+菜单+权限点。
- 权限点：已登录
- 错误码：`A001 A003`

### 7.2 用户与角色
3) `GET /api/admin/users`
- DTO：分页 + 过滤（username/status/departmentId）
- 权限：`auth:user:view`
- 数据范围：`DEPARTMENT/SELF/CUSTOM`

4) `POST /api/admin/users`
- DTO：`CreateUserRequest`
- 权限：`auth:user:create`
- 错误码：`D001 C001`

5) `PUT /api/admin/users/{id}`
- DTO：`UpdateUserRequest`
- 权限：`auth:user:update`

6) `GET /api/admin/roles`
7) `POST /api/admin/roles`
8) `PUT /api/admin/roles/{id}/menus`
9) `PUT /api/admin/roles/{id}/permissions`

### 7.3 菜单与权限
10) `GET /api/admin/menus/tree`
11) `GET /api/admin/permissions`

### 7.4 CMS
12) `GET /api/admin/cms/articles`
13) `POST /api/admin/cms/articles`
14) `PUT /api/admin/cms/articles/{id}`
15) `PUT /api/admin/cms/articles/{id}/publish`
16) `PUT /api/admin/cms/articles/{id}/offline`
17) `GET /api/admin/cms/columns/tree`

### 7.5 媒体
18) `GET /api/admin/media/assets`
19) `POST /api/admin/media/assets/upload`
20) `GET /api/admin/media/categories`

### 7.6 线索
21) `GET /api/admin/leads`
22) `GET /api/admin/leads/{id}`
23) `PUT /api/admin/leads/{id}/assign`
24) `POST /api/admin/leads/{id}/follow-records`

### 7.7 站点配置
25) `GET /api/admin/site/config`
26) `PUT /api/admin/site/config`
27) `GET /api/admin/site/navigations`
28) `PUT /api/admin/site/navigations`

### 7.8 系统配置
29) `GET /api/admin/system/config-items`
30) `PUT /api/admin/system/config-items/{id}`
31) `GET /api/admin/system/dictionaries`

### 7.9 日志审计
32) `GET /api/admin/audit/login-logs`
33) `GET /api/admin/audit/operation-logs`
34) `GET /api/admin/audit/security-logs`

---

## 8. 错误码规范

- `0000`：成功
- `Axxx`：认证鉴权
- `Bxxx`：参数校验
- `Cxxx`：业务规则
- `Dxxx`：数据问题
- `Exxx`：系统异常

建议：
- `A001` 未登录
- `A002` Token 无效
- `A003` 无权限
- `B001` 参数错误
- `C001` 状态不允许
- `C002` 发布失败
- `C003` 线索分配失败
- `D001` 资源不存在
- `D002` 数据重复
- `D003` 文件上传失败
- `E001` 系统繁忙

---

## 9. 审计规范

- 必须记录：`operator_id/operator_name/module/action/biz_type/biz_id/result/trace_id/ip/user_agent/created_at`。
- 高风险操作（发布、权限变更、配置变更、线索分配）必须记录前后快照：`before_snapshot/after_snapshot`。
- 敏感字段日志脱敏：手机号、邮箱、微信号、IP 最小化展示。
- 日志查询只读，不允许逻辑删除与物理更新。

---

## 10. 内容版本与审计策略

### 10.1 文章双表设计原因
- `cms_article`：当前聚合根（标题、状态、发布版本指针）。
- `cms_article_version`：不可变快照（草稿/已发布历史）。
- 好处：支持回滚、对比、合规追溯，避免直接覆盖正文导致历史丢失。

### 10.2 发布与草稿表达
- `cms_article.status`: `DRAFT/REVIEW/PUBLISHED/OFFLINE`。
- `cms_article.current_version_no`: 当前编辑版本。
- `cms_article.published_version_no`: 当前线上版本。

### 10.3 回滚
- 选择目标 `version_no` -> 复制快照内容生成新版本 -> 更新 `current_version_no`，必要时同步 `published_version_no`。

### 10.4 线索留痕
- 跟进记录独立：保障沟通时间线完整。
- 分配记录独立：保障责任归属与流转轨迹清晰。
- 必须留痕字段：`status/assigned_to/follow_up_at/intent_level/source_channel`。

### 10.5 系统配置审计
- 必进审计：认证安全、权限策略、发布开关、SEO 全局配置、站点主配置。
- 区分环境配置（基础设施）与业务配置（可运营修改），仅后者进入后台可编辑。


---

## 11. API 契约明细（按接口给出 DTO/VO/权限/范围/错误码）

> 说明：以下 DTO/VO 为 v1 建议命名，返回统一 `ApiResponse<T>`，分页为 `ApiResponse<PageResponse<T>>`。

| 接口 | 用途 | 请求 DTO | 响应 VO | 权限点 | 数据范围 | 典型错误码 |
|---|---|---|---|---|---|---|
| POST /api/admin/auth/login | 登录 | LoginRequest | LoginResponse | 否 | 否 | A001/A002/B001 |
| GET /api/admin/auth/me | 当前登录态 | - | CurrentUserVO | 已登录 | 否 | A001/A003 |
| GET /api/admin/users | 用户分页 | UserQueryRequest | UserVO(Page) | auth:user:view | DEPARTMENT/SELF/CUSTOM | A003/B001 |
| POST /api/admin/users | 创建用户 | CreateUserRequest | UserVO | auth:user:create | CUSTOM | D002/B001 |
| PUT /api/admin/users/{id} | 更新用户 | UpdateUserRequest | UserVO | auth:user:update | CUSTOM | D001/C001 |
| GET /api/admin/roles | 角色分页 | RoleQueryRequest | RoleVO(Page) | auth:role:view | 否 | A003 |
| POST /api/admin/roles | 创建角色 | CreateRoleRequest | RoleVO | auth:role:create | 否 | D002/B001 |
| PUT /api/admin/roles/{id}/menus | 角色菜单授权 | RoleMenuGrantRequest | Boolean | auth:role:grant | 否 | D001/C001 |
| PUT /api/admin/roles/{id}/permissions | 角色权限点授权 | RolePermissionGrantRequest | Boolean | auth:role:grant | 否 | D001/C001 |
| GET /api/admin/menus/tree | 菜单树 | MenuTreeQueryRequest | MenuTreeVO[] | sys:menu:view | 否 | A003 |
| GET /api/admin/permissions | 权限点列表 | PermissionQueryRequest | PermissionVO[] | sys:permission:view | 否 | A003 |
| GET /api/admin/cms/articles | 文章分页 | ArticleQueryRequest | ArticleVO(Page) | cms:article:view | COUNTRY_LINE/SITE_SCOPE | A003/B001 |
| POST /api/admin/cms/articles | 新建文章 | ArticleUpsertRequest | ArticleVO | cms:article:create | COUNTRY_LINE/SITE_SCOPE | B001/D002 |
| PUT /api/admin/cms/articles/{id} | 编辑文章 | ArticleUpsertRequest | ArticleVO | cms:article:update | COUNTRY_LINE/SITE_SCOPE | D001/C001 |
| PUT /api/admin/cms/articles/{id}/publish | 发布文章 | ArticlePublishRequest | ArticleVO | cms:article:publish | COUNTRY_LINE/SITE_SCOPE | C002/C001 |
| PUT /api/admin/cms/articles/{id}/offline | 下线文章 | ArticleOfflineRequest | ArticleVO | cms:article:publish | COUNTRY_LINE/SITE_SCOPE | C001 |
| GET /api/admin/cms/columns/tree | 栏目树 | ColumnTreeQueryRequest | ColumnTreeVO[] | cms:article:view | SITE_SCOPE | A003 |
| GET /api/admin/media/assets | 素材分页 | MediaAssetQueryRequest | MediaAssetVO(Page) | cms:article:view | SITE_SCOPE | B001 |
| POST /api/admin/media/assets/upload | 上传素材 | MediaUploadRequest(multipart) | MediaAssetVO | cms:article:update | SITE_SCOPE | D003/B001 |
| GET /api/admin/media/categories | 素材分类 | MediaCategoryQueryRequest | MediaCategoryVO[] | cms:article:view | SITE_SCOPE | A003 |
| GET /api/admin/leads | 线索分页 | LeadQueryRequest | LeadVO(Page) | lead:record:view | SELF/DEPARTMENT/CUSTOM | A003/B001 |
| GET /api/admin/leads/{id} | 线索详情 | - | LeadDetailVO | lead:record:view | SELF/DEPARTMENT/CUSTOM | D001/A003 |
| PUT /api/admin/leads/{id}/assign | 线索分配 | AssignLeadRequest | LeadVO | lead:record:assign | DEPARTMENT/CUSTOM | C003/D001 |
| POST /api/admin/leads/{id}/follow-records | 新增跟进 | CreateFollowRecordRequest | FollowRecordVO | lead:record:follow | SELF/DEPARTMENT/CUSTOM | D001/C001 |
| GET /api/admin/site/config | 站点配置查询 | SiteConfigQueryRequest | SiteConfigVO | site:config:view | SITE_SCOPE | D001 |
| PUT /api/admin/site/config | 更新站点配置 | UpdateSiteConfigRequest | SiteConfigVO | site:config:update | SITE_SCOPE | C001 |
| GET /api/admin/site/navigations | 导航查询 | NavigationQueryRequest | SiteNavigationVO[] | site:config:view | SITE_SCOPE | B001 |
| PUT /api/admin/site/navigations | 导航批量更新 | UpdateNavigationsRequest | Boolean | site:config:update | SITE_SCOPE | C001 |
| GET /api/admin/system/config-items | 系统配置分页 | ConfigItemQueryRequest | ConfigItemVO(Page) | system:config:view | 否 | A003 |
| PUT /api/admin/system/config-items/{id} | 更新配置项 | UpdateConfigItemRequest | ConfigItemVO | system:config:update | 否 | D001/C001 |
| GET /api/admin/system/dictionaries | 字典查询 | DictionaryQueryRequest | DictionaryVO[] | system:config:view | 否 | B001 |
| GET /api/admin/audit/login-logs | 登录日志查询 | LoginLogQueryRequest | LoginLogVO(Page) | audit:log:view | SITE_SCOPE | A003 |
| GET /api/admin/audit/operation-logs | 操作日志查询 | OperationLogQueryRequest | OperationLogVO(Page) | audit:log:view | SITE_SCOPE | A003 |
| GET /api/admin/audit/security-logs | 安全日志查询 | SecurityLogQueryRequest | SecurityLogVO(Page) | audit:log:view | SITE_SCOPE | A003 |

### 11.1 典型响应示例（以线索分配为例）

```json
{
  "code": "0000",
  "message": "OK",
  "data": {
    "id": 1,
    "leadNo": "L20260001",
    "studentName": "张同学",
    "status": "ASSIGNED",
    "consultantUserId": 12
  },
  "traceId": "3fc81e7e14d64d6d",
  "timestamp": "2026-04-08T12:00:00Z"
}
```
