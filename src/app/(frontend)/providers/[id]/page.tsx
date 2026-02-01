import ProviderDetails from "@/components/frontend/provider/provider-details";

export const metadata = {
  title: "Provider Details",
};

interface Props {
  params: {
    id: string;
  };
}
const ProviderDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <section>
      <ProviderDetails id={id} />
    </section>
  );
};

export default ProviderDetailsPage;
