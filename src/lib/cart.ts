import { MenuInterface } from "@/api/public-api/menu.api";

const CART_KEY = "foodhub_cart";
const CART_EVENT = "cart-updated";

export const getCart = (): MenuInterface[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

const setCart = (cart: MenuInterface[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event(CART_EVENT));
};

export const isInCart = (id: string): boolean => {
  return getCart().some((item) => item.id === id);
};

export const addToCart = (meal: MenuInterface) => {
  const cart = getCart();

  if (cart.some((item) => item.id === meal.id)) {
    return;
  }

  setCart([...cart, meal]);
};

export const removeFromCart = (id: string) => {
  const cart = getCart().filter((item) => item.id !== id);
  setCart(cart);
};

export const clearCart = () => {
  setCart([]);
};

export const CART_UPDATED_EVENT = CART_EVENT;
