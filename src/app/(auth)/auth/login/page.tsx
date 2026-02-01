import { LoginForm } from "@/components/auth/login/login";

export const metadata = {
  title: "Login",
};
const LoginPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/40">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
