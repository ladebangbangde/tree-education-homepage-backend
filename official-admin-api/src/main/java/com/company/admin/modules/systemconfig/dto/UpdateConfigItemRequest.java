package com.company.admin.modules.systemconfig.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateConfigItemRequest {
    @NotBlank
    private String configValue;
}
