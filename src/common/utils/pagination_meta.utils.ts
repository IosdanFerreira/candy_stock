interface IPaginationMeta {
  total_items: number;
  limit_per_page: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  total_pages: number;
}

export function paginationMeta(
  totalItems: number,
  page: number,
  limit: number,
): IPaginationMeta {
  const totalPages = Math.ceil(totalItems / limit);

  const prevPage = page > 1 ? page - 1 : null;

  const nextPage = page < totalPages ? page + 1 : null;

  return {
    total_items: totalItems,
    limit_per_page: limit,
    current_page: page,
    prev_page: prevPage,
    next_page: nextPage,
    total_pages: totalPages,
  };
}
