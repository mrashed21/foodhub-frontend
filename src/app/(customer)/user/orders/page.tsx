import MyOrder from "@/components/customer/my-order/my-order";

export const metadata = {
  title: "My Orders",
};
const OrderPage = () => {
  return (
    <section>
      <MyOrder />
    </section>
  );
};

export default OrderPage;
