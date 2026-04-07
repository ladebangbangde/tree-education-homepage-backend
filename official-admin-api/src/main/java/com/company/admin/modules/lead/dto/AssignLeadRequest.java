package com.company.admin.modules.lead.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignLeadRequest {
    @NotNull
    private Long assignedTo;
}
