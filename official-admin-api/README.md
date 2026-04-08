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

## Docker Compose 部署（宿主机 MySQL / Redis）

### 目录说明

在仓库根目录新增了以下部署文件：

- `docker-compose.yml`：仅启动 `official-admin-api` 容器
- `.env.example`：环境变量模板（部署前复制为 `.env`）
- `deploy/nginx/admin-api.conf`：宿主机 Nginx 反向代理参考配置
- `official-admin-api/Dockerfile`：Spring Boot 服务镜像构建文件
- `official-admin-api/.dockerignore`：Docker 构建忽略文件

### 1) 准备环境变量

在仓库根目录执行：

```bash
cp .env.example .env
```

然后按服务器实际配置修改 `.env`，尤其是以下配置：

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `REDIS_HOST`
- `REDIS_PORT`
- `JWT_SECRET`

### 2) 确认宿主机 MySQL / Redis 已启动

在目标服务器上确认：

- MySQL 服务可用（默认示例地址：`host.docker.internal:3306`）
- Redis 服务可用（默认示例地址：`host.docker.internal:6379`）
- MySQL/Redis 监听地址不能仅限 `127.0.0.1`，需允许容器访问；或至少保证 `host.docker.internal` 可通

### 3) 启动服务

在仓库根目录执行：

```bash
docker compose up -d --build
```

查看日志：

```bash
docker compose logs -f admin-api
```

停止并清理容器：

```bash
docker compose down
```

### 4) 启动后访问

- Swagger UI: `http://127.0.0.1:8080/swagger-ui.html`
- OpenAPI JSON: `http://127.0.0.1:8080/v3/api-docs`
- Actuator Health: `http://127.0.0.1:8080/actuator/health`

### 5) Nginx 反向代理建议

`docker-compose.yml` 中端口映射为 `127.0.0.1:${APP_PORT:-8080}:8080`，即仅绑定宿主机本地回环地址，不直接暴露公网端口。

生产环境建议由宿主机 Nginx 对外提供访问入口，并反向代理到 `http://127.0.0.1:8080`。可参考 `deploy/nginx/admin-api.conf` 模板。
