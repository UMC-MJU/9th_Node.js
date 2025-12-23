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

// 이미 존재하는 가게 이름 에러
export class DuplicateRestaurantNameError extends Error {
  errorCode = "DUPLICATE_RESTAURANT_NAME";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 가게 필수 필드가 누락될 경우 에러
export class RestaurantRequiredFieldsError extends Error {
  errorCode = "REQUIRED_RESTAURANT_FIELDS";
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
// 미션이 가게에 등록되지 않은 경우 에러
export class MissionNotRegisteredError extends Error {
  errorCode = "MISSION_NOT_REGISTERED";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 이미 완료된 미션 에러
export class UserMissionAlreadyCompletedError extends Error {
  errorCode = "USER_MISSION_ALREADY_COMPLETED";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 진행중인 미션이 없을 경우 에러
export class UserMissionNotFoundError extends Error {
  errorCode = "USER_MISSION_NOT_FOUND";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 비밀번호가 일치하지 않을 경우 에러
export class InvalidPasswordError extends Error {
  errorCode = "INVALID_PASSWORD";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 이메일이 존재하지 않을 경우 에러
export class EmailNotFoundError extends Error {
  errorCode = "EMAIL_NOT_FOUND";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
