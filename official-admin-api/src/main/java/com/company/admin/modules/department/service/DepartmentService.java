package com.company.admin.modules.department.service;

import com.company.admin.modules.department.repository.DepartmentRepository;
import com.company.admin.modules.department.vo.DepartmentVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public List<DepartmentVO> list() {
        return repository.findAll().stream().map(d -> new DepartmentVO(d.getId(), d.getDeptCode(), d.getDeptName(), d.getParentId(), d.getStatus())).toList();
    }
}
