export const bodyToReview = (b = {}) => ({
  rating: Number(b.rating ?? 0),
  content: b.content ?? null,
  images: Array.isArray(b.images) ? b.images : [], // 테이블 분리 안 했으니 보관만
});

export const previewReviewResponseDTO = (reviews = [], cursorId = null) => {
  if (!reviews.length) return { reviewData: [], cursorId: null };

  const reviewData = reviews.map((r) => ({
    id: r.id,
    nickname: r.user?.name ?? null,
    rating: r.rating,
    content: r.content,
    images: r.images?.map((img) => img.url) ?? [],
    createdAt: r.createdAt,
  }));

  return {
    reviewData,
    cursorId,
  };
};