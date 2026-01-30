import Container from "@/common/container/container";
import CartPage from "@/components/frontend/cart/cart-page";
export const metadata = {
  title: "Cart",
};
const Cart = () => {
  return (
    <section className="py-10 px-4">
      <Container>
        <CartPage />
      </Container>
    </section>
  );
};

export default Cart;
