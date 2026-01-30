export type StrapiProducto = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  badge?: string;
  features?: string[];
  image?: { url?: string };
};

export async function getProductos(): Promise<StrapiProducto[]> {
  const res = await fetch("/api/productos?populate=*");
  if (!res.ok) throw new Error("Error Strapi");
  const json = await res.json();
  return json.data;
}

// compatibilidad con imports viejos
export const getProducts = getProductos;

export async function getProductById(id: number | string) {
  const res = await fetch(`/api/productos/${id}?populate=*`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
