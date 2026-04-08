# 前后端契约 v1（React + TypeScript + Spring Boot）

## 1. 统一响应结构

```json
{
  "code": "0000",
  "message": "OK",
  "data": {},
  "traceId": "b3f8f8f4f9f5472d",
  "timestamp": "2026-04-08T10:30:12Z"
}
```

## 2. 分页结构

```json
{
  "records": [],
  "pageNo": 1,
  "pageSize": 20,
  "total": 156,
  "totalPages": 8
}
```

## 3. 通用查询 DTO 建议

- `pageNo: number`（默认 1）
- `pageSize: number`（默认 20，最大 200）
- `keyword?: string`
- `status?: string`
- `enabled?: boolean`
- `startTime?: string(ISO8601)`
- `endTime?: string(ISO8601)`
- `sortBy?: string`
- `sortDirection?: 'ASC' | 'DESC'`

## 4. 共享协议层建议

### 4.1 适合共享 DTO / Enum
- `ApiResponse<T>`、`PageResponse<T>`
- `CommonStatus`、`MenuType`、`DataScopeType`
- `ListQueryRequest`、`IdNamePairVO`

### 4.2 仅后端 VO
- 带内部审计字段、内部 ID 的聚合 VO（如 `OperationLogVO` 全字段）。
- 含服务端策略信息（ABAC 原始表达式、风控标签原文）的 VO。

### 4.3 前后端必须统一枚举
- 用户状态、角色状态、文章状态、线索状态。
- 菜单类型、数据范围类型、日志结果类型。

## 5. TypeScript 映射建议

```ts
export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
  traceId: string;
  timestamp: string;
}

export interface PageResponse<T> {
  records: T[];
  pageNo: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
```

## 6. 前端不应直接展示的字段

- `password_hash`
- `deleted_flag`
- `version`（仅并发控制使用）
- `security_level`
- `before_snapshot/after_snapshot` 全量内容（仅审计页按权限查看）

## 7. 脱敏建议

- 手机号：`138****0001`
- 邮箱：`a***@domain.com`
- 微信号：仅显示首尾字符
- 登录日志 IP：`192.168.*.*`
- 操作人信息：普通角色仅看 displayName，不回传 username/email

## 8. 契约演进策略

- Header 加 `X-Api-Version: v1`（可选）
- 不兼容变更升级 `/v2`
- 枚举新增只追加，不重用旧值
- 字段废弃先标注 `@Deprecated`，保留两个迭代周期

