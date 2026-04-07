package com.company.admin.modules.user.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.constants.PermissionConstants;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.user.application.UserApplicationService;
import com.company.admin.modules.user.dto.CreateUserRequest;
import com.company.admin.modules.user.vo.UserVO;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class UserController implements ApiControllerSupport {
    private final UserApplicationService service;

    public UserController(UserApplicationService service) { this.service = service; }

    @GetMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.USER_VIEW + "')")
    public ApiResponse<List<UserVO>> list() { return ok(service.listUsers()); }

    @PostMapping
    @PreAuthorize("hasAuthority('" + PermissionConstants.USER_CREATE + "')")
    public ApiResponse<UserVO> create(@Valid @RequestBody CreateUserRequest request) { return ok(service.create(request)); }
}
