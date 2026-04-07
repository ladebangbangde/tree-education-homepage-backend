package com.company.admin.modules.role.dto;

import lombok.Data;

import java.util.List;

@Data
public class RolePermissionGrantRequest {
    private List<Long> permissionIds;
}
