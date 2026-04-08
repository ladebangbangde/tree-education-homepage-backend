package com.company.admin.common.constants;

/**
 * 权限点常量，统一采用：模块:资源:动作。
 */
public final class PermissionConstants {

    private PermissionConstants() {
    }

    public static final String AUTH_USER_VIEW = "auth:user:view";
    public static final String AUTH_USER_CREATE = "auth:user:create";
    public static final String AUTH_USER_UPDATE = "auth:user:update";
    public static final String AUTH_USER_RESET_PASSWORD = "auth:user:resetPassword";

    public static final String AUTH_ROLE_VIEW = "auth:role:view";
    public static final String AUTH_ROLE_CREATE = "auth:role:create";
    public static final String AUTH_ROLE_GRANT = "auth:role:grant";

    public static final String CMS_ARTICLE_VIEW = "cms:article:view";
    public static final String CMS_ARTICLE_CREATE = "cms:article:create";
    public static final String CMS_ARTICLE_UPDATE = "cms:article:update";
    public static final String CMS_ARTICLE_PUBLISH = "cms:article:publish";

    public static final String LEAD_RECORD_VIEW = "lead:record:view";
    public static final String LEAD_RECORD_ASSIGN = "lead:record:assign";
    public static final String LEAD_RECORD_FOLLOW = "lead:record:follow";

    public static final String SITE_CONFIG_VIEW = "site:config:view";
    public static final String SITE_CONFIG_UPDATE = "site:config:update";

    public static final String SYSTEM_CONFIG_VIEW = "system:config:view";
    public static final String SYSTEM_CONFIG_UPDATE = "system:config:update";

    public static final String AUDIT_LOG_VIEW = "audit:log:view";

    // legacy aliases for current controllers
    public static final String USER_VIEW = AUTH_USER_VIEW;
    public static final String USER_CREATE = AUTH_USER_CREATE;
    public static final String ROLE_VIEW = AUTH_ROLE_VIEW;
    public static final String ROLE_CREATE = AUTH_ROLE_CREATE;
    public static final String ROLE_GRANT = AUTH_ROLE_GRANT;
    public static final String MENU_VIEW = "sys:menu:view";
    public static final String PERMISSION_VIEW = "sys:permission:view";
    public static final String LEAD_VIEW = LEAD_RECORD_VIEW;
    public static final String LEAD_ASSIGN = LEAD_RECORD_ASSIGN;
    public static final String LEAD_FOLLOW = LEAD_RECORD_FOLLOW;
    public static final String CONFIG_VIEW = SYSTEM_CONFIG_VIEW;
    public static final String CONFIG_UPDATE = SYSTEM_CONFIG_UPDATE;
    public static final String AUDIT_VIEW = AUDIT_LOG_VIEW;
}
