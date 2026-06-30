import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useproduct } from "../features/products/useproduct";
import { useAddToCart } from "../features/cart/useCart";
import { useToast } from "../context/ToastContext";

function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const addToCart = useAddToCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addToCart.mutate(
      { product, quantity },
      {
        onSuccess: () => showToast("Added to cart"),
        onError: () => showToast("Could not add to cart", "error"),
      }
    );
  }

  if (isLoading) {
    return <div className="text-center py-16 text-gray-400">Loading product...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-red-500">
        Failed to load product: {error.message}
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-16 text-gray-400">Product not found.</div>;
  }

  const imageUrl = product.images?.[0]?.url || product.images?.[0] || null;

  return (
    <div>
      <Link to="/" className="text-sm text-indigo-600 hover:underline">
        ← Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          {(() => {
            const imageUrl =
              product.images?.[0]?.url ||
              product.images?.[0] ||
              `https://picsum.photos/seed/${product.id}/600/600`;
            return <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />;
          })()}
        </div>

        <div className="flex flex-col gap-3">
          {product.category?.name && (
            <span className="text-xs uppercase tracking-wide text-indigo-500 font-medium">
              {product.category.name}
            </span>
          )}
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <span className="text-3xl font-bold text-gray-900">${product.price}</span>

          {product.stock === 0 ? (
            <span className="text-red-500 font-medium">Out of stock</span>
          ) : (
            <span className="text-sm text-gray-400">{product.stock} in stock</span>
          )}

          <div className="flex items-center gap-3 mt-4">
            <label htmlFor="qty" className="text-sm font-medium text-gray-700">
              Qty
            </label>
            <input
              id="qty"
              type="number"
              min="1"
              max={product.stock || 99}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || addToCart.isPending}
            className="mt-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addToCart.isPending ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;