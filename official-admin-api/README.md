# official-admin-api

留学教育机构官网后台（模块化单体）后端骨架，基于 Spring Boot 3 + Java 17。

## 技术栈

- Spring Boot 3.3.x
- Spring Security + JWT（无状态）
- Spring Data JPA + MySQL 8
- Flyway
- Springdoc OpenAPI
- Spring Boot Actuator

## 项目结构

```text
official-admin-api/
├─ src/main/java/com/company/admin
│  ├─ AdminApplication.java
│  ├─ common
│  │  ├─ config / security / exception / response / audit / utils
│  └─ modules
│     ├─ auth user role department permission menu
│     ├─ cms lead siteconfig systemconfig auditlog
│     └─ ...
├─ src/main/resources
│  ├─ application.yml
│  ├─ application-local.yml
│  ├─ application-dev.yml
│  └─ db/migration
│     ├─ V1__init_core_schema.sql
│     └─ V2__seed_basic_data.sql
└─ pom.xml
```

## 本地启动

### 1) 准备环境

- JDK 17+
- Maven 3.9+
- MySQL 8（创建库：`official_admin`）

### 2) 配置数据库

修改 `application-local.yml` 或环境变量：

- `DB_USERNAME`
- `DB_PASSWORD`

### 3) 启动

```bash
cd official-admin-api
mvn clean package -DskipTests
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

若企业网络对 Maven Central 有访问限制，可优先使用项目内已配置的阿里云公共仓库镜像。

## Flyway 说明

- `V1__init_core_schema.sql`：一期核心表结构与约束/索引
- `V2__seed_basic_data.sql`：管理员、角色、权限、菜单、CMS/线索样例数据

应用启动时自动迁移。

## 默认测试账号

- 用户名：`admin`
- 密码：`password`（与 seed 的 BCrypt 哈希对应）

## 文档与健康检查

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- Actuator Health: `http://localhost:8080/actuator/health`

## 当前可访问接口（首批）

- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`
- `GET /api/admin/users`
- `GET /api/admin/roles`
- `GET /api/admin/menus/tree`
- `GET /api/admin/permissions`
- `GET /api/admin/cms/articles`
- `GET /api/admin/leads`
- `GET /api/admin/system/config-items`
- `GET /api/admin/audit/operation-logs`
- `GET /api/admin/site/config`
