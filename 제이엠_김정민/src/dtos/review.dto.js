export const bodyToReview = (params, body) => {
  const restaurantId = Number(params.restaurantId || body.restaurantId);

  return {
    userId: Number(body.userId),
    restaurantId,
    description: body.description,
    rating: Number(body.rating),
    // createdAt은 DB DEFAULT(CURRENT_TIMESTAMP)를 사용
  };
};

export const responseFromReview = (row) => {
  if (!row) return {};
  return {
    id: row.id,
    userId: row.user_id,
    restaurantId: row.restaurant_id,
    description: row.description,
    rating: Number(row.rating),
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
