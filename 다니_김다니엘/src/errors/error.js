export class DuplicateUserEmailError extends Error {
    errorCode = "DUPLICATE_USER_EMAIL";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class RestaurantNotFoundError extends Error {
    errorCode = "RESTAURANT_NOT_FOUND";

    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class MissionNotFoundError extends Error {
    errorCode = "MISSION_NOT_FOUND";

    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  export class NotThisRestaurantMissionError extends Error {
    errorCode = "NOT_THIS_RESTAURANT_MISSION";

    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class UserNotFoundError extends Error {
    errorCode = "USER_NOT_FOUND";

    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class AlreadyChallengedMissionError extends Error {
    errorCode = "ALREADY_CHALLENGED_MISSION";

    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  // 사용자 미션 도전 생성 실패 에러
  export class UserMissionCreationFailedError extends Error {
    errorCode = "USER_MISSION_CREATION_FAILED";

    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
 
  // 리뷰 생성 실패 에러
  export class ReviewCreationFailedError extends Error {
    errorCode = "REVIEW_CREATION_FAILED";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  // 리뷰 생성 후 조회 실패패
  export class ReviewNotFoundError extends Error {
    errorCode = "REVIEW_NOT_FOUND";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  // 존재하지 않는 지역 ID
  export class InvalidRegionIdError extends Error {
    errorCode = "INVALID_REGION_ID";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  //레스토랑 생성 실패
  export class RestaurantCreationFailedError extends Error {
    errorCode = "RESTAURANT_CREATION_FAILED";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  