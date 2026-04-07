package com.company.admin.modules.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateUserRequest {
    @NotBlank private String username;
    @NotBlank private String displayName;
    @NotBlank private String password;
    @NotBlank private String email;
    private Long departmentId;
}
