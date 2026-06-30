import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../features/products/useProduct";
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
            const imageKeywordMap = [
  { match: /jacket|coat|puffer/i, url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop" },
  { match: /cardigan|sweater|knit/i, url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop" },
  { match: /shirt|oxford|button-down/i, url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop" },
  { match: /trouser|chino|pants/i, url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop" },
  { match: /jean|denim/i, url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop" },
  { match: /dress/i, url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop" },
  { match: /sneaker|shoe/i, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop" },
  { match: /sunglasses/i, url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop" },
  { match: /bag|crossbody|handbag/i, url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop" },
  { match: /hoodie/i, url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop" },
  { match: /tee|t-shirt|graphic tee/i, url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop" },
  { match: /headphone|bose|quietcomfort|earbud/i, url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop" },
  { match: /switch|nintendo|console/i, url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop" },
  { match: /galaxy|iphone|smartphone|phone/i, url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop" },
  { match: /macbook|laptop|notebook/i, url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop" },
  { match: /watch/i, url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop" },
  { match: /camera/i, url: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop" },
];

function getFallbackImage(name) {
  const found = imageKeywordMap.find((entry) => entry.match.test(name));
  return found ? found.url : "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=500&fit=crop";
}

const imageUrl = product.images?.[0]?.url || product.images?.[0] || getFallbackImage(product);
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