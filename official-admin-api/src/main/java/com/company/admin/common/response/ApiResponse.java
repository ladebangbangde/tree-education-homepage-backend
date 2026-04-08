package com.company.admin.common.response;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

/**
 * 后台统一响应包装。
 */
@Getter
@Builder
public class ApiResponse<T> {

    private String code;
    private String message;
    private T data;
    private String traceId;
    private Instant timestamp;

    public static <T> ApiResponse<T> success(T data, String traceId) {
        return ApiResponse.<T>builder()
            .code("0000")
            .message("OK")
            .data(data)
            .traceId(traceId)
            .timestamp(Instant.now())
            .build();
    }

    public static <T> ApiResponse<T> failure(String code, String message, String traceId) {
        return ApiResponse.<T>builder()
            .code(code)
            .message(message)
            .data(null)
            .traceId(traceId)
            .timestamp(Instant.now())
            .build();
    }
}
