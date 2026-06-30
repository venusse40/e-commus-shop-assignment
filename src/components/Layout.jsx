import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Ecomus
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-gray-600">
            <Link to="/cart" className="hover:text-indigo-600">Cart</Link>
            <Link to="/orders" className="hover:text-indigo-600">Orders</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;