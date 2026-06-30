import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const imageKeywordMap = [
  { match: /jacket|coat|puffer/i, query: "jacket" },
  { match: /cardigan|sweater|knit/i, query: "sweater" },
  { match: /shirt|oxford|button-down/i, query: "dress-shirt" },
  { match: /trouser|chino|pants/i, query: "trousers" },
  { match: /jean|denim/i, query: "jeans" },
  { match: /dress/i, query: "dress" },
  { match: /sneaker|shoe/i, query: "sneakers" },
  { match: /sunglasses/i, query: "sunglasses" },
  { match: /bag|crossbody|handbag/i, query: "handbag" },
  { match: /hoodie/i, query: "hoodie" },
  { match: /tee|t-shirt|graphic tee/i, query: "tshirt" },
];

function getImageQuery(name) {
  const found = imageKeywordMap.find((entry) => entry.match.test(name));
  return found ? found.query : "fashion-clothing";
}

const imageUrl =
  product.images?.[0]?.url ||
  product.images?.[0] ||
  `https://loremflickr.com/500/500/${getImageQuery(product.name)}?lock=${product.id}`;
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