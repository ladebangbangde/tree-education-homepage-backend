package com.company.admin.common.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * 通用分页响应。
 */
@Getter
@Builder
public class PageResponse<T> {

    private List<T> records;
    private long pageNo;
    private long pageSize;
    private long total;
    private long totalPages;

    public static <T> PageResponse<T> of(List<T> records, long pageNo, long pageSize, long total) {
        long totalPages = pageSize == 0 ? 0 : (total + pageSize - 1) / pageSize;
        return PageResponse.<T>builder()
            .records(records)
            .pageNo(pageNo)
            .pageSize(pageSize)
            .total(total)
            .totalPages(totalPages)
            .build();
    }
}
