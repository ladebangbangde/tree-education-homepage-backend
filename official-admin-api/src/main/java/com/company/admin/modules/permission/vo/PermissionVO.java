package com.company.admin.modules.permission.vo;

import lombok.Data;

@Data
public class PermissionVO {
    private Long id;
    private String permissionCode;
    private String permissionName;
    private String module;
}
