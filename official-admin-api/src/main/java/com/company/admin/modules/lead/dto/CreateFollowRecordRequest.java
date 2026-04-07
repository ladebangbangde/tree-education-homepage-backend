package com.company.admin.modules.lead.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateFollowRecordRequest {
    @NotBlank
    private String followContent;
}
