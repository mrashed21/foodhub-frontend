import { MenuInterface } from "@/api/public-api/menu.api";

export interface CartItem extends MenuInterface {
  quantity: number;
}

const CART_KEY = "foodhub_cart";
const CART_EVENT = "cart-updated";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

const setCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
};

export const isInCart = (id: string): boolean => {
  return getCart().some((item) => item.id === id);
};

export const addToCart = (meal: MenuInterface) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === meal.id);

  if (existing) {
    setCart(
      cart.map((item) =>
        item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
    return;
  }

  setCart([...cart, { ...meal, quantity: 1 }]);
};

export const decreaseFromCart = (id: string) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);

  if (!item) return;

  if (item.quantity === 1) {
    setCart(cart.filter((i) => i.id !== id));
    return;
  }

  setCart(
    cart.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)),
  );
};

export const removeFromCart = (id: string) => {
  setCart(getCart().filter((item) => item.id !== id));
};

export const clearCart = () => {
  setCart([]);
};

export const CART_UPDATED_EVENT = CART_EVENT;
