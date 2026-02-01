import Container from "@/common/container/container";
import Provider from "@/components/frontend/provider/provider";

export const metadata = {
  title: "Provider",
};
const ProviderPage = () => {
  return (
    <section>
      <Container>
        <Provider />
      </Container>
    </section>
  );
};

export default ProviderPage;
