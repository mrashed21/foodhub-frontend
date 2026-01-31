import VendorOrder from "@/components/vendor/order/order";

export const metadata = {
  title: "Orders",
};
const OrdersPage = () => {
  return (
    <section>
      <VendorOrder />
    </section>
  );
};

export default OrdersPage;
