import { Link } from "react-router-dom";

function OrderHistoryPage() {
  const orders = JSON.parse(localStorage.getItem("ecomus_orders") || "[]");

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 mb-4">No orders yet.</p>
        <Link to="/" className="text-indigo-600 hover:underline">Browse products</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{order.items.length} item(s)</span>
              <span className="font-bold">${order.total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(order.placedAt).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OrderHistoryPage;