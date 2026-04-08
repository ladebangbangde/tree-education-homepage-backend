package com.company.admin.common.exception;

/**
 * @deprecated 请使用 {@link BusinessException}
 */
@Deprecated
public class BizException extends BusinessException {

    public BizException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }

    public BizException(ErrorCode errorCode) {
        super(errorCode);
    }
}
