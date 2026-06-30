import { useState } from "react";
import { useProducts } from "../features/products/useproducts";
import { useCategories } from "../features/categories/useCategories";
import ProductCard from "../components/ui/ProductCard";

function ProductListPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { data: categories } = useCategories();
  const { data, isLoading, isError, error, isFetching } = useProducts({
    page,
    limit: 12,
    search,
    categoryId,
  });

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function handleCategoryChange(e) {
    setPage(1);
    setCategoryId(e.target.value);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            Search
          </button>
        </form>

        <select
          value={categoryId}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading && (
        <div className="text-center py-16 text-gray-400">Loading products...</div>
      )}

      {isError && (
        <div className="text-center py-16 text-red-500">
          Failed to load products: {error.message}
        </div>
      )}

      {!isLoading && !isError && data?.products?.length === 0 && (
        <div className="text-center py-16 text-gray-400">No products found.</div>
      )}

      {!isLoading && !isError && data?.products?.length > 0 && (
        <>
          {isFetching && (
            <p className="text-xs text-gray-400 mb-2">Updating...</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {data.pagination.page} of {data.pagination.pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(data.pagination.pages, p + 1))}
              disabled={page >= data.pagination.pages}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductListPage;