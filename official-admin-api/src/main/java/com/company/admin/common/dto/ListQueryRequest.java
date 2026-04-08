package com.company.admin.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 列表查询通用入参。
 */
@Getter
@Setter
public class ListQueryRequest {

    private Integer pageNo = 1;
    private Integer pageSize = 20;
    private String keyword;
    private String status;
    private Boolean enabled;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String sortBy = "id";
    private String sortDirection = "DESC";
}
