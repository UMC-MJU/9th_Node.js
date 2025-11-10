export const bodyToStore = (b = {}) => ({
  name: String(b.name ?? "").trim(),
  address: b.address ?? null,
  category: b.category ?? null,
  phone: b.phone ?? null,
});
