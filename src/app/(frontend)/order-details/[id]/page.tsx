import Container from "@/common/container/container";
import Order from "@/components/frontend/order/order";

export const metadata = {
  title: "Order Details",
};

interface Props {
  params: {
    id: string;
  };
}

const OrderDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <section className="py-10">
      <Container>
        <Order id={id} />
      </Container>
    </section>
  );
};

export default OrderDetailsPage;
