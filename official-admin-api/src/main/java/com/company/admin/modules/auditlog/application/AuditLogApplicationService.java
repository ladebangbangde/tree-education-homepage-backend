package com.company.admin.modules.auditlog.application;

import com.company.admin.modules.auditlog.repository.SysLoginLogRepository;
import com.company.admin.modules.auditlog.repository.SysOperationLogRepository;
import com.company.admin.modules.auditlog.vo.LoginLogVO;
import com.company.admin.modules.auditlog.vo.OperationLogVO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogApplicationService {
    private final SysOperationLogRepository operationLogRepository;
    private final SysLoginLogRepository loginLogRepository;

    public AuditLogApplicationService(SysOperationLogRepository operationLogRepository, SysLoginLogRepository loginLogRepository) {
        this.operationLogRepository = operationLogRepository;
        this.loginLogRepository = loginLogRepository;
    }

    public List<OperationLogVO> operationLogs() {
        return operationLogRepository.findAll().stream().map(l -> {
            OperationLogVO vo = new OperationLogVO();
            vo.setId(l.getId()); vo.setOperator(l.getOperator()); vo.setModule(l.getModule()); vo.setAction(l.getAction());
            vo.setRequestPath(l.getRequestPath()); vo.setResultStatus(l.getResultStatus()); vo.setRiskTag(l.getRiskTag());
            return vo;
        }).toList();
    }

    public List<LoginLogVO> loginLogs() {
        return loginLogRepository.findAll().stream().map(l -> {
            LoginLogVO vo = new LoginLogVO();
            vo.setId(l.getId()); vo.setUsername(l.getUsername()); vo.setIpAddress(l.getIpAddress()); vo.setResultStatus(l.getResultStatus());
            return vo;
        }).toList();
    }
}
