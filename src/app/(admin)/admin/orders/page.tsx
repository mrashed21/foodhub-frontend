import AllOrders from "@/components/admin/order/all-orders";

export const metadata = {
  title: "All Orders",
};
const OrdersPage = () => {
  return (
    <section className="flex-1 p-6">
      <AllOrders />
    </section>
  );
};

export default OrdersPage;
