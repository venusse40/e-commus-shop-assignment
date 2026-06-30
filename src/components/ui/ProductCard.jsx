import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
];

function getFallbackImage(name) {
  const found = imageKeywordMap.find((entry) => entry.match.test(name));
  return found ? found.url : "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=500&fit=crop";
}

const imageUrl = product.images?.[0]?.url || product.images?.[0] || getFallbackImage(product.name);
  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
  src={imageUrl || "https://placehold.co/500x500/e5e7eb/9ca3af?text=Ecomus"}
  alt={product.name}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
/>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        {product.category?.name && (
          <span className="text-xs uppercase tracking-wide text-indigo-500 font-medium">
            {product.category.name}
          </span>
        )}
        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.stock === 0 ? (
            <span className="text-xs text-red-500 font-medium">Out of stock</span>
          ) : (
            <span className="text-xs text-gray-400">{product.stock} in stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;