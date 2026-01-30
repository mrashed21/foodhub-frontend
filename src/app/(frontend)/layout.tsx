import Footer from "@/common/footer/footer";
import Navbar from "@/common/navbar/navbar";

const FrontendLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default FrontendLayout;
