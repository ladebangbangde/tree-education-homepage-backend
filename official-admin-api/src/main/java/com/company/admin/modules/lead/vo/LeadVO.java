package com.company.admin.modules.lead.vo;

import lombok.Data;

@Data
public class LeadVO {
    private Long id;
    private String studentName;
    private String phone;
    private String status;
    private Long assignedTo;
}
