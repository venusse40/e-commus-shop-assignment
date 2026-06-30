import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/products";

export function useProducts(filters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
}