package com.company.admin.modules.auditlog.vo;

import lombok.Data;

@Data
public class LoginLogVO {
    private Long id;
    private String username;
    private String ipAddress;
    private String resultStatus;
}
