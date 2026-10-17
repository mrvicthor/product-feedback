export const updateById = <T extends { id: number }>(
  items: T[],
  id: number,
  update: (item: T) => T,
) => items.map((item) => (item.id === id ? update(item) : item));
