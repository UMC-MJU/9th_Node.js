export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    phoneNumber: body.phoneNumber, //필수
    createAt: body.createAt, //필수

    province: body.province, //선택 (도)
    district: body.district, //선택 (시/군/구)
    detailAddress: body.detailAddress || "", //선택
    favoriteFoods: body.favoriteFoods, //필수
  };
};

export const responseFromUser = (data) => {
  // Service에서 { user: [SingleUser], favoriteFoods: Array<FavoriteFoodObject> } 형태로 전달됨
  const { user, favoriteFoods } = data;

  // getUser 결과는 배열이므로, 실제 사용자 객체는 첫 번째 요소입니다.
  const singleUser = user && user[0] ? user[0] : {};

  // 1. DB에서 조회된 카테고리 객체 배열에서 'name' 필드만 추출하여 클라이언트용 배열로 변환합니다.
  const favoriteFoodCategoriesNames = (favoriteFoods || [])
    .map((food) => food.name) // food.name 필드는 레포지토리의 JOIN 쿼리 결과입니다.
    .filter((name) => name);

  // 2. DB 스네이크 케이스 필드를 카멜 케이스로 변환하고 날짜 형식을 처리합니다.

  // 날짜 변환 (DB에서 Date 객체 또는 문자열로 넘어왔다고 가정)
  const birthDate = singleUser.birth ? new Date(singleUser.birth) : null;
  const createAtDate = singleUser.created_at
    ? new Date(singleUser.created_at)
    : null;
  const updateAtDate = singleUser.updated_at
    ? new Date(singleUser.updated_at)
    : null;

  const birthString = birthDate ? birthDate.toISOString().split("T")[0] : null; // YYYY-MM-DD
  const createAtString = createAtDate ? createAtDate.toISOString() : null; // ISO 8601
  const updateAtString = updateAtDate ? updateAtDate.toISOString() : null; // ISO 8601

  // 참고: user 테이블에 주소 상세 필드가 없으므로, province, district, detailAddress는 DTO에서 제외합니다.
  // 대신 address_id를 포함하여 주소 테이블 조회를 위한 키를 제공합니다.

  return {
    // 유저 기본 정보 (DB 필드명을 카멜 케이스로 변환)
    id: singleUser.id, // 유저 ID
    addressId: singleUser.adress_id, // DB 필드: adress_id (오타가 있어도 DB 스키마를 따릅니다)
    email: singleUser.email,
    name: singleUser.name,
    gender: singleUser.gender,

    // DB에서 스네이크 케이스로 저장된 필드
    phoneNumber: singleUser.phone_number || null, // DB 필드: phone_number

    // 날짜 정보
    birth: birthString,
    createAt: createAtString,
    updateAt: updateAtString,

    status: singleUser.status || null,

    // 선호 음식 카테고리 리스트 (user_favorite_food 테이블에서 조회된 이름 목록)
    favoriteFoods: favoriteFoodCategoriesNames,
  };
};
