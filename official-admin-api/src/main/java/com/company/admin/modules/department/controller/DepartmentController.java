package com.company.admin.modules.department.controller;

import com.company.admin.common.api.ApiControllerSupport;
import com.company.admin.common.response.ApiResponse;
import com.company.admin.modules.department.service.DepartmentService;
import com.company.admin.modules.department.vo.DepartmentVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/departments")
public class DepartmentController implements ApiControllerSupport {
    private final DepartmentService service;

    public DepartmentController(DepartmentService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<DepartmentVO>> list() {
        return ok(service.list());
    }
}
