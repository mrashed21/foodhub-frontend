import Container from "@/common/container/container";
import Checkout from "@/components/frontend/cart/checkout";
export const metadata = {
  title: "Checkout",
};
const CheckoutPage = () => {
  return (
    <section className="py-10">
      <Container>
        <Checkout />
      </Container>
    </section>
  );
};

export default CheckoutPage;
