package com.company.admin.common.audit;

import com.company.admin.modules.auditlog.entity.SysOperationLog;
import com.company.admin.modules.auditlog.repository.SysOperationLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
@RequiredArgsConstructor
public class AuditAspect {
    private final SysOperationLogRepository repository;
    private final HttpServletRequest request;

    @Around("@annotation(audit)")
    public Object around(ProceedingJoinPoint pjp, AuditOperation audit) throws Throwable {
        LocalDateTime start = LocalDateTime.now();
        boolean success = true;
        try {
            return pjp.proceed();
        } catch (Throwable t) {
            success = false;
            throw t;
        } finally {
            SysOperationLog log = new SysOperationLog();
            log.setOperator(SecurityContextHolder.getContext().getAuthentication() == null ? "anonymous" : SecurityContextHolder.getContext().getAuthentication().getName());
            log.setModule(audit.module());
            log.setAction(audit.action());
            log.setRequestPath(request.getRequestURI());
            log.setResultStatus(success ? "SUCCESS" : "FAIL");
            log.setRiskTag(audit.highRisk() ? "HIGH_RISK" : "NORMAL");
            log.setRequestTime(start);
            repository.save(log);
        }
    }
}
