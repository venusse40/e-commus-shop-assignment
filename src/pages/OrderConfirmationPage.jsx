import { useParams, Link } from "react-router-dom";

function OrderConfirmationPage() {
  const { id } = useParams();
  const orders = JSON.parse(localStorage.getItem("ecomus_orders") || "[]");
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 mb-4">Order not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center py-8">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-6">Thank you, {order.name}. Your order has been placed.</p>

      <div className="bg-white border border-gray-200 rounded-lg p-4 text-left mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t mt-2 pt-2">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-3">Delivering to: {order.address}</p>
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/orders" className="text-indigo-600 hover:underline">View order history</Link>
        <Link to="/" className="text-indigo-600 hover:underline">Continue shopping</Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;