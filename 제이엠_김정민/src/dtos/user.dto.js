const pad = (n) => String(n).padStart(2, "0");
const toMySQLDate = (v) => {
  const d = new Date(v);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const toMySQLDateTime = (v) => {
  const d = v ? new Date(v) : new Date();
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
};

export const bodyToUser = (body) => {
  const birth = new Date(body.birth); // 날짜 변환

  return {
    email: body.email, //필수
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth: toMySQLDate(birth), // 필수
    phoneNumber: body.phoneNumber, //필수
    createAt: toMySQLDateTime(body.createAt), // 필수 (ISO 8601 문자열)

    province: body.province ?? null, //선택 (도)
    district: body.district ?? null, //선택 (시/군/구)
    detailAddress: body.detailAddress ?? null, //선택
    favoriteFoods: body.favoriteFoods, //필수
    password: body.password ?? null, //선택
    role: body.role ?? "USER", //선택 (기본값: USER)
  };
};

export const responseFromUser = (data) => {
  // Service에서 { user: [SingleUser], favoriteFoods: Array<FavoriteFoodObject> } 형태로 전달됨
  const { user, favoriteFoods } = data;

  // getUser 결과는 배열이므로, 실제 사용자 객체는 첫 번째 요소입니다.
  const singleUser = user && user[0] ? user[0] : {};

  // 1. 선호 카테고리 이름 배열로 변환
  // - Prisma include 사용 시: favoriteFood.food_category.food_type
  // - 평평한 형태로 반환 시: favoriteFood.name 또는 favoriteFood.food_type
  const favoriteFoodCategoriesNames = (favoriteFoods || [])
    .map((favoriteFood) => {
      if (!favoriteFood) return null;
      // nested include 형태
      if (
        favoriteFood.food_category &&
        typeof favoriteFood.food_category.food_type === "string"
      ) {
        return favoriteFood.food_category.food_type;
      }
      // 평평한 형태 지원
      if (typeof favoriteFood.name === "string") return favoriteFood.name;
      if (typeof favoriteFood.food_type === "string")
        return favoriteFood.food_type;
      return null;
    })
    .filter((name) => name);

  // 2. DB 스네이크 케이스 필드를 카멜 케이스로 변환하고 날짜 형식을 처리합니다.

  // 날짜 변환 (DB에서 Date 객체 또는 문자열로 넘어왔다고 가정)
  const birthDate = singleUser.birth ? new Date(singleUser.birth) : null;
  const createAtDate = singleUser.create_at
    ? new Date(singleUser.create_at)
    : null;
  const updateAtDate = singleUser.update_at
    ? new Date(singleUser.update_at)
    : null;

  const birthString = birthDate ? birthDate.toISOString().split("T")[0] : null; // YYYY-MM-DD
  const createAtString = createAtDate ? createAtDate.toISOString() : null; // ISO 8601
  const updateAtString = updateAtDate ? updateAtDate.toISOString() : null; // ISO 8601

  // 참고: user 테이블에 주소 상세 필드가 없으므로, province, district, detailAddress는 DTO에서 제외합니다.
  // 대신 address_id를 포함하여 주소 테이블 조회를 위한 키를 제공합니다.

  return {
    // 유저 기본 정보 (DB 필드명을 카멜 케이스로 변환)
    id: singleUser.id, // 유저 ID
    addressId: singleUser.address_id, // DB 필드: address_id
    email: singleUser.email,
    name: singleUser.name,
    gender: singleUser.gender,
    role: singleUser.role ?? "USER", //선택 (기본값: USER)

    // DB에서 스네이크 케이스로 저장된 필드
    phoneNumber: singleUser.phone_number || null, // DB 필드: phone_number

    // 날짜 정보
    birth: birthString,
    createAt: createAtString,
    updateAt: updateAtString,

    status: singleUser.status || null,

    // 선호 음식 카테고리 리스트 (user_favor_category 조인 결과의 이름 목록)
    favoriteFoods: favoriteFoodCategoriesNames,
  };
};

export const bodyToLoginUser = (body) => {
  return {
    email: body.email,
    password: body.password,
  };
};

export const responseFromLoginUser = (data) => {
  const { user, accessToken, refreshToken } = data;
  return {
    email: user.email,
    name: user.name,
    role: user.role ?? "USER", //선택 (기본값: USER)
    accessToken: accessToken ?? null,
    refreshToken: refreshToken ?? null,
  };
};
