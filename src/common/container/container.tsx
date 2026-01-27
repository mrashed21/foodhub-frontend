const Container = ({
  children, className  =''
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <main className={`max-w-[1600px] mx-auto ${className}`}>{children}</main>
  )
}

export default Container