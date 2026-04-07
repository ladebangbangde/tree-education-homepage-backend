package com.company.admin.common.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    BAD_REQUEST("4000", "请求参数错误"),
    UNAUTHORIZED("4010", "未登录或登录已失效"),
    FORBIDDEN("4030", "无访问权限"),
    NOT_FOUND("4040", "资源不存在"),
    BUSINESS_ERROR("4090", "业务处理失败"),
    INTERNAL_ERROR("5000", "系统内部异常");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
