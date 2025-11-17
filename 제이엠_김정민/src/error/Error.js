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

// 유저가 존재하지 않을 경우 에러
export class UserNotFoundError extends Error {
  errorCode = "NOT_FOUND_USER";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션이 존재하지 않을 경우 에러
export class MissionNotFoundError extends Error {
  errorCode = "NOT_FOUND_MISSION";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션 이름이 중복될 경우 에러
export class MissionNameDuplicatedError extends Error {
  errorCode = "DUPLICATE_MISSION_NAME";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션이 이미 등록되어 있을 경우 에러
export class MissionAlreadyExistsError extends Error {
  errorCode = "MISSION_ALREADY_EXISTS";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션 필수 필드가 누락될 경우 에러
export class MissionRequiredFieldsError extends Error {
  errorCode = "REQUIRED_MISSION_FIELDS";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
