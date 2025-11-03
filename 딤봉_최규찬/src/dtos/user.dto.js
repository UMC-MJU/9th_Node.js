export const bodyToUser = (body) => {
    const birth = new Date(body.birth); //날짜 변환
  
    return {
      email: body.email, //필수 
      name: body.name, // 필수
      gender: body.gender, // 필수
      birth, // 필수
      address: body.address || "", //선택 
      detailAddress: body.detailAddress || "", //선택 
      phoneNumber: body.phoneNumber,//필수
      preferences: body.preferences,// 필수 
    };
  };

export const responseFromUser = ({ user, preferences }) => {
  return {
    id: user[0].id,
    email: user[0].email,
    name: user[0].name,
    gender: user[0].gender,
    birth: user[0].birth,
    address: user[0].address,
    detailAddress: user[0].detail_address,
    phoneNumber: user[0].phone_number,
    preferences: preferences.map(pref => ({
      id: pref.id,
      foodCategoryId: pref.food_category_id,
      name: pref.name
    }))
  };
};

