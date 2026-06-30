import apiClient from "./client";

export async function fetchProducts({ page = 1, limit = 12, categoryId, brand, search, minPrice, maxPrice } = {}) {
  const params = { page, limit };
  if (categoryId) params.categoryId = categoryId;
  if (brand) params.brand = brand;
  if (search) params.search = search;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;

  const { data } = await apiClient.get("/products", { params });

  const products = data.data?.all || [];
  const pagination = data.pagination || { page, limit, total: products.length, pages: 1 };

  return { products, pagination };
}

export async function fetchProductById(id) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data.data;
}

export async function fetchProductsByCategory(categoryId) {
  const { data } = await apiClient.get(`/products/category/${categoryId}`);
  return data.data;
}