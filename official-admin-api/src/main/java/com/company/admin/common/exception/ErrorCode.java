package com.company.admin.common.exception;

import lombok.Getter;

/**
 * 企业后台错误码。
 */
@Getter
public enum ErrorCode {

    SUCCESS("0000", "成功"),

    UNAUTHORIZED("A001", "未登录"),
    TOKEN_INVALID("A002", "Token 无效或已过期"),
    FORBIDDEN("A003", "无权限访问"),

    PARAM_INVALID("B001", "参数错误"),

    STATUS_NOT_ALLOWED("C001", "当前状态不允许此操作"),
    PUBLISH_FAILED("C002", "发布失败"),
    LEAD_ASSIGN_FAILED("C003", "线索分配失败"),

    RESOURCE_NOT_FOUND("D001", "资源不存在"),
    DATA_DUPLICATE("D002", "数据重复"),
    FILE_UPLOAD_FAILED("D003", "文件上传失败"),

    NOT_FOUND("D001", "资源不存在"),
    BUSINESS_ERROR("C001", "业务处理失败"),

    SYSTEM_BUSY("E001", "系统繁忙，请稍后重试"),

    BAD_REQUEST("4000", "请求参数错误"),
    INTERNAL_ERROR("5000", "系统内部异常");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
