package com.company.admin.common.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class CurrentUserContext {

    private CurrentUserContext() {
    }

    public static Long userId() {
        Object principal = authentication().getPrincipal();
        if (principal instanceof AdminUserDetails userDetails) {
            return userDetails.getId();
        }
        return 0L;
    }

    public static String username() {
        Object principal = authentication().getPrincipal();
        if (principal instanceof AdminUserDetails userDetails) {
            return userDetails.getUsername();
        }
        return "anonymous";
    }

    private static Authentication authentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
