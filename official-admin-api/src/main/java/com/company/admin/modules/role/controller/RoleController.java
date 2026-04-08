package com.company.admin.modules.role.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.common.response.PageResponse;
import com.company.admin.modules.role.application.RoleApplicationService;
import com.company.admin.modules.role.dto.CreateRoleRequest;
import com.company.admin.modules.role.dto.RolePermissionGrantRequest;
import com.company.admin.modules.role.vo.RoleVO;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/roles")
public class RoleController implements ApiControllerSupport {
    private final RoleApplicationService service;

    public RoleController(RoleApplicationService service) { this.service = service; }

    @GetMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.AUTH_ROLE_VIEW + "')")
    public ApiResponse<PageResponse<RoleVO>> list() {
        List<RoleVO> roles = service.list();
        return ok(PageResponse.of(roles, 1, roles.size(), roles.size()));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.AUTH_ROLE_CREATE + "')")
    public ApiResponse<RoleVO> create(@Valid @RequestBody CreateRoleRequest request) { return ok(service.create(request)); }

    @PutMapping("/{id}/permissions")
    @PreAuthorize("hasAuthority('" + PermissionConstants.AUTH_ROLE_GRANT + "')")
    public ApiResponse<Void> grantPermissions(@PathVariable Long id, @RequestBody RolePermissionGrantRequest request) {
        service.grantPermissions(id, request);
        return ok(null);
    }
}
