package com.company.admin.modules.auth.vo;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class LoginResponse {
    private String token;
    private Long userId;
    private String username;
    private String displayName;
    private List<String> permissions;
}
