package com.company.admin.common.api;

import com.company.admin.common.response.ApiResponse;
import com.company.admin.common.utils.TraceIdHolder;

public interface ApiControllerSupport {
    default <T> ApiResponse<T> ok(T data) {
        return ApiResponse.success(data, TraceIdHolder.get());
    }
}
