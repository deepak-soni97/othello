import { httpStatusCode } from '../core/constants';
import { Error } from 'common-errors';

export class BaseError extends Error {
    name: string;

    status: number;

    message: string;

    coreException?: any;

    constructor(message: string) {
        super(message);
    }
}

export class BadRequestError extends BaseError {
    errors: any[];
    constructor(message, errors?: any[]) {
        super(message);
        this.name = this.constructor.name;
        this.status = httpStatusCode.BAD_REQUEST;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.message = message;
        this.errors = errors;
    }
}

export class ValidationError extends BaseError {
    constructor(message) {
        super('Validation exception');
        this.name = this.constructor.name;
        this.status = httpStatusCode.BAD_REQUEST;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.message = message;
    }
}

export class RecordNotFoundError extends BaseError {
    constructor(message) {
        super('Record Not Found');
        this.name = this.constructor.name;
        this.status = httpStatusCode.NOT_FOUND;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.message = message;
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message) {
        super('Unauthorized exception');
        this.name = this.constructor.name;
        this.status = httpStatusCode.UNAUTHORIZED;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.message = message;
    }
}

export class RequestTimedOutError extends BaseError {
    constructor(message) {
        super('Gateway Timeout');
        this.name = this.constructor.name;
        this.status = httpStatusCode.GATEWAY_TIMEOUT;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.message = message;
    }
}

export class RequestEntityTooLargeError extends BaseError {
    constructor(message) {
        super('Request entity too large');
        this.name = this.constructor.name;
        this.status = httpStatusCode.REQ_ENTITY_TOO_LARGE;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.message = message;
    }
}

export class ForbiddenError extends BaseError {
    constructor(message) {
        super('Access Forbidden');
        this.name = this.constructor.name;
        this.status = httpStatusCode.FORBIDDEN;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.message = message;
    }
}

export class ConflictError extends BaseError {
    constructor(message) {
        super('Conflict error');
        this.name = this.constructor.name;
        // eslint-disable-next-line no-unneeded-ternary
        this.status = httpStatusCode.CONFLICT;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.message = message;
    }
}

export class InternalServerError extends BaseError {
    constructor(message, coreException?) {
        super('Internal Server Error');
        this.name = this.constructor.name;
        // eslint-disable-next-line no-unneeded-ternary
        this.status = httpStatusCode.INTERNAL_SERVER_ERROR;
        Error.captureStackTrace(this, this.constructor);
        // Saving custom property.
        this.coreException = coreException;
        this.message = message;
    }
}
