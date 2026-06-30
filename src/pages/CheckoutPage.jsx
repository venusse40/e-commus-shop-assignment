import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, useClearCart } from "../features/cart/useCart";
import { useToast } from "../context/ToastContext";

function CheckoutPage() {
  const { data, isLoading } = useCart();
  const clearCart = useClearCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);

  const items = data?.items || [];
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      showToast("Please fill in your name and address", "error");
      return;
    }

    setPlacing(true);

    // Save a simple order record locally (order history feature)
    const order = {
      id: crypto.randomUUID(),
      items,
      total,
      name,
      address,
      placedAt: new Date().toISOString(),
    };
    const existingOrders = JSON.parse(localStorage.getItem("ecomus_orders") || "[]");
    localStorage.setItem("ecomus_orders", JSON.stringify([order, ...existingOrders]));

    clearCart.mutate(undefined, {
      onSuccess: () => {
        showToast("Order placed!");
        navigate(`/orders/${order.id}`);
      },
      onError: () => {
        showToast("Could not place order", "error");
        setPlacing(false);
      },
    });
  }

  if (isLoading) {
    return <div className="text-center py-16 text-gray-400">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 mb-4">Your cart is empty.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t mt-2 pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Delivery address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Kigali, Rwanda"
          />
        </div>

        <button
          type="submit"
          disabled={placing}
          className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {placing ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;