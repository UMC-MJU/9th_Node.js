// 이메일 중복 에러
export class DuplicateUserEmailError extends Error {
  errorCode = "DUPLICATE_USER_EMAIL";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 존재하지 않는 가게 에러
export class RestaurantNotFoundError extends Error {
  errorCode = "NOT_FOUND_RESTAURANT";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
