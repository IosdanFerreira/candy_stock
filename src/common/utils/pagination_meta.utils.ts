export function paginationMeta(
  totalItems: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    total_items: Number(totalItems),
    limit_per_page: limit,
    current_page: page,
    prev_page: page > 1 ? page - 1 : null,
    next_page: page < totalPages ? page + 1 : null,
    total_pages: totalPages,
  };
}
