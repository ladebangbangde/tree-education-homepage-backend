package com.company.admin.modules.auditlog.vo;

import lombok.Data;

@Data
public class OperationLogVO {
    private Long id;
    private String operator;
    private String module;
    private String action;
    private String requestPath;
    private String resultStatus;
    private String riskTag;
}
