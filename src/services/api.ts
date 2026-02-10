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

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getProductos(): Promise<StrapiProducto[]> {
  const res = await fetch(`${API_URL}/api/productos?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Error Strapi");
  const json = await res.json();
  return json.data;
}

// compatibilidad con imports viejos
export const getProducts = getProductos;

export async function getProductById(id: number | string) {
  const res = await fetch(`${API_URL}/api/productos/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}
