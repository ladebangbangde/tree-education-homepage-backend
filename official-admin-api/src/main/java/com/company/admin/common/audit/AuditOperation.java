package com.company.admin.common.audit;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface AuditOperation {
    String module();
    String action();
    boolean highRisk() default false;
}
