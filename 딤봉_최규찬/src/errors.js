export class DuplicateUserEmailError extends Error {
  errorCode = "U001";
  statusCode = 409;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotFoundError extends Error {
  errorCode = "N001";
  statusCode = 404;

  constructor(resource, identifier = null) {
    const reason = identifier
      ? `${resource}(${identifier})를 찾을 수 없습니다.`
      : `${resource}를 찾을 수 없습니다.`;
    super(reason);
    this.reason = reason;
    this.data = { resource, identifier };
  }
}

export class ValidationError extends Error {
  errorCode = "V001";
  statusCode = 400;

  constructor(reason, data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class UnauthorizedError extends Error {
  errorCode = "A001";
  statusCode = 401;

  constructor(reason = "로그인이 필요합니다.", data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class ConflictError extends Error {
  errorCode = "C001";
  statusCode = 409;

  constructor(reason, data = null) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
