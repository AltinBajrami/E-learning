import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.msg = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.msg = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.msg = 'UnauthenticatedError';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.msg = 'UnauthorizedError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}