import VerifyEmail from "@/components/auth/verifiy-email/verify-email";
import { Suspense } from "react";

export const metadata = {
  title: "Verify Email",
};

const VerifyEmailPage = () => {
  return (
    <section>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading…
          </div>
        }
      >
        <VerifyEmail />
      </Suspense>
    </section>
  );
};

export default VerifyEmailPage;
