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

    public static final String AUTH_MENU_VIEW = "auth:menu:view";
    public static final String AUTH_PERMISSION_VIEW = "auth:permission:view";

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

}
