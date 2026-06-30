const CART_KEY = "ecomus_cart";

function readCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  return items;
}

export async function fetchCart() {
  return { items: readCart() };
}

export async function addToCart({ product, quantity = 1 }) {
  const items = readCart();
  const existing = items.find((i) => i.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.images?.[0]?.url || product.images?.[0] || null,
      quantity,
    });
  }
  return writeCart(items);
}

export async function updateCartItem({ itemId, quantity }) {
  const items = readCart().map((i) =>
    i.id === itemId ? { ...i, quantity } : i
  );
  return writeCart(items);
}

export async function removeCartItem(itemId) {
  const items = readCart().filter((i) => i.id !== itemId);
  return writeCart(items);
}

export async function clearCart() {
  return writeCart([]);
}