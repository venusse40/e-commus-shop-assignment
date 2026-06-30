import { Link } from "react-router-dom";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "../features/cart/useCart";

function CartPage() {
  const { data, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  if (isLoading) {
    return <div className="text-center py-16 text-gray-400">Loading cart...</div>;
  }

  const items = data?.items || [];

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 mb-4">Your cart is empty.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Browse products</Link>
      </div>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4">
            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 overflow-hidden">
              {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : "No image"}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateItem.mutate({ itemId: item.id, quantity: Math.max(1, Number(e.target.value)) })
              }
              className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <span className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</span>
            <button
              onClick={() => removeItem.mutate(item.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <span className="text-lg font-bold">Total: ${total.toFixed(2)}</span>
        <Link
          to="/checkout"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPage;