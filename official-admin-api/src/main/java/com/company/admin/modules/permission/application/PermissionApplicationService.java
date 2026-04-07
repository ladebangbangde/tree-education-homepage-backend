package com.company.admin.modules.permission.application;

import com.company.admin.modules.permission.repository.SysPermissionRepository;
import com.company.admin.modules.permission.vo.PermissionVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionApplicationService {
    private final SysPermissionRepository repository;

    public PermissionApplicationService(SysPermissionRepository repository) { this.repository = repository; }

    public List<PermissionVO> list() {
        return repository.findAll().stream().map(p -> {
            PermissionVO vo = new PermissionVO();
            vo.setId(p.getId()); vo.setPermissionCode(p.getPermissionCode()); vo.setPermissionName(p.getPermissionName()); vo.setModule(p.getModule());
            return vo;
        }).toList();
    }
}
