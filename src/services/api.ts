export async function getProductos(): Promise<StrapiProducto[]> {
  const res = await fetch(`${API_URL}/api/productos?populate=*`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });

  if (!res.ok) throw new Error("Error Strapi");
  const json = await res.json();

  return (json.data ?? []).map((item: any) => ({
    id: item.id,
    ...(item.attributes ?? {}),
  }));
}

export async function getProductById(id: number | string) {
  const res = await fetch(`${API_URL}/api/productos/${id}?populate=*`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });

  if (!res.ok) return null;
  const json = await res.json();

  const item = json.data;
  if (!item) return null;

  return { id: item.id, ...(item.attributes ?? {}) };
}
