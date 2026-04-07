package com.company.admin.modules.auth.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.auth.application.AuthApplicationService;
import com.company.admin.modules.auth.dto.LoginRequest;
import com.company.admin.modules.auth.vo.LoginResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/auth")
public class AuthController implements ApiControllerSupport {
    private final AuthApplicationService service;

    public AuthController(AuthApplicationService service) { this.service = service; }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpServletRequest) {
        return ok(service.login(request, httpServletRequest));
    }

    @GetMapping("/me")
    public ApiResponse<LoginResponse> me() {
        return ok(service.me());
    }
}
