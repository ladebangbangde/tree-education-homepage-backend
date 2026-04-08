package com.company.admin.common.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class CurrentUserContext {

    private CurrentUserContext() {
    }

    public static Long userId() {
        Authentication authentication = authentication();
        if (authentication == null) {
            return 0L;
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof AdminUserDetails userDetails) {
            return userDetails.getId();
        }
        return 0L;
    }

    public static String username() {
        Authentication authentication = authentication();
        if (authentication == null) {
            return "anonymous";
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof AdminUserDetails userDetails) {
            return userDetails.getUsername();
        }
        return "anonymous";
    }

    private static Authentication authentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
