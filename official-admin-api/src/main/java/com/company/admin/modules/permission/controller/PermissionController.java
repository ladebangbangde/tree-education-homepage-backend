package com.company.admin.modules.permission.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.permission.application.PermissionApplicationService;
import com.company.admin.modules.permission.vo.PermissionVO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/permissions")
public class PermissionController implements ApiControllerSupport {
    private final PermissionApplicationService service;

    public PermissionController(PermissionApplicationService service) { this.service = service; }

    @GetMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.PERMISSION_VIEW + "')")
    public ApiResponse<List<PermissionVO>> list() { return ok(service.list()); }
}
