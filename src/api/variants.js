import apiClient from "./client";

export async function createVariant(productId, variantData) {
  const { data } = await apiClient.post(`/products/${productId}/variants`, variantData);
  return data.data;
}