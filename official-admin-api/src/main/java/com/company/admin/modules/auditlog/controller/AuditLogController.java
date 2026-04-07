package com.company.admin.modules.auditlog.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.auditlog.application.AuditLogApplicationService;
import com.company.admin.modules.auditlog.vo.LoginLogVO;
import com.company.admin.modules.auditlog.vo.OperationLogVO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/audit")
public class AuditLogController implements ApiControllerSupport {
    private final AuditLogApplicationService service;

    public AuditLogController(AuditLogApplicationService service) { this.service = service; }

    @GetMapping("/operation-logs")
    @PreAuthorize("hasAuthority('" + PermissionConstants.AUDIT_VIEW + "')")
    public ApiResponse<List<OperationLogVO>> operationLogs() { return ok(service.operationLogs()); }

    @GetMapping("/login-logs")
    @PreAuthorize("hasAuthority('" + PermissionConstants.AUDIT_VIEW + "')")
    public ApiResponse<List<LoginLogVO>> loginLogs() { return ok(service.loginLogs()); }
}
