package com.company.admin.modules.user.vo;

import lombok.Data;

@Data
public class UserVO {
    private Long id;
    private String username;
    private String displayName;
    private String email;
    private String status;
}
