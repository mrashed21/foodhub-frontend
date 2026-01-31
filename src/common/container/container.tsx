const Container = ({
  children, className  =''
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <main className={`max-w-400 mx-auto px-5 ${className}`}>{children}</main>
  )
}

export default Container