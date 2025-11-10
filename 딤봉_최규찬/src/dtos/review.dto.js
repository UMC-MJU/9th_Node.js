export const bodyToReview = (b = {}) => ({
    rating: Number(b.rating ?? 0),
    content: b.content ?? null,
    images: Array.isArray(b.images) ? b.images : [], // 테이블 분리 안 했으니 보관만
  });
  