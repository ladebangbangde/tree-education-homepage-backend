package com.company.admin.modules.systemconfig.vo;

import lombok.Data;

@Data
public class ConfigItemVO {
    private Long id;
    private String configKey;
    private String configValue;
    private String description;
}
