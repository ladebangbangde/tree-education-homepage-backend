package com.company.admin.modules.systemconfig.application;

import com.company.admin.common.audit.AuditOperation;
import com.company.admin.common.exception.BusinessException;
import com.company.admin.common.exception.ErrorCode;
import com.company.admin.modules.systemconfig.dto.UpdateConfigItemRequest;
import com.company.admin.modules.systemconfig.mapper.ConfigItemMapper;
import com.company.admin.modules.systemconfig.repository.SysConfigItemRepository;
import com.company.admin.modules.systemconfig.vo.ConfigItemVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SystemConfigApplicationService {
    private final SysConfigItemRepository repository;
    private final ConfigItemMapper mapper;

    public SystemConfigApplicationService(SysConfigItemRepository repository, ConfigItemMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<ConfigItemVO> list() { return repository.findAll().stream().map(mapper::toVO).toList(); }

    @AuditOperation(module = "SYSTEM", action = "UPDATE_CONFIG", highRisk = true)
    public ConfigItemVO update(Long id, UpdateConfigItemRequest request) {
        var item = repository.findById(id).orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND, "配置项不存在"));
        item.setConfigValue(request.getConfigValue());
        return mapper.toVO(repository.save(item));
    }
}
