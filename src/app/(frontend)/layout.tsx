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
    </>
  );
};

export default FrontendLayout;
