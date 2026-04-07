package com.company.admin.modules.role.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateRoleRequest {
    @NotBlank private String roleCode;
    @NotBlank private String roleName;
}
