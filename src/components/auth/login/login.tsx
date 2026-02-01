"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const { data, error } = await authClient.signIn.email(values);

      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }

      if (data) {
        toast.success("User Logged in Successfully", { id: toastId });
        window.location.href = "/";
      }
    } catch {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };

  // const onSubmit = async (data: LoginFormValues) => {
  //   try {
  //     const res = await fetch(`${env.NEXT_PUBLIC_AUTH_URL}/sign-in/email`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify(data),
  //     });

  //     const result = await res.json();
  //     if (!res.ok) {
  //       toast.error(result?.message || "Login failed");
  //       return;
  //     }

  //     if (result.status === "verification_required") {
  //       toast.warning("Please verify your email before logging in.");
  //       return;
  //     }

  //     toast.success("Login successful");
  //     router.refresh();
  //     if (result?.user?.role === "customer") {
  //       router.push("/");
  //     }
  //     if (result?.user?.role === "provider") {
  //       router.push("/vendor");
  //     }
  //     if (result?.user?.role === "admin") {
  //       router.push("/admin");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };

  return (
    <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="rashedjaman768@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label>Password</Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <Link href="/auth/register" className="font-medium underline">
          {" "}
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
