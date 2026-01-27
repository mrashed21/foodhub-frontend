"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { env } from "@/env";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/* ---------------- Schema ---------------- */

import { BDPhoneInput, validatePhoneNumber } from "bd-number-validator";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || validatePhoneNumber(val),
        "Invalid phone number",
      ),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),

    role: z.enum(["user", "provider"]),
    provider_name: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "provider" && !data.provider_name?.trim()) {
      ctx.addIssue({
        path: ["provider_name"],
        message: "Provider name is required",
        code: z.ZodIssueCode.custom,
      });
    }
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

/* ---------------- Component ---------------- */

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
      phone: "",
    },
  });

  const role = watch("role");
  const emailValue = watch("email");
  const isEmailValid = !!emailValue && !errors.email;

  /* ---------------- Submit ---------------- */

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_AUTH_URL}/sign-up/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Something went wrong! Try again");
        return;
      }

      toast.success("Registered successfully! Please verify your email.");
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* ---------------- Resend Email ---------------- */

  const resendVerification = async (email: string) => {
    if (!email) return;

    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_AUTH_URL}/send-verification-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (!res.ok) {
        toast.error("Failed to resend email");
        return;
      }

      toast.success("Verification email sent again.");

      setCooldown(60);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Create an account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input {...register("name")} placeholder="Enter your name" />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone (optional) */}
          <div className="space-y-1">
            <Label>
              Phone <span className="text-muted-foreground">(optional)</span>
            </Label>

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <BDPhoneInput
                  value={field.value || ""}
                  showLabel={false}
                  onValueChange={(val) => field.onChange(val)}
                  wrapperClass="flex items-center gap-3 rounded-md border px-3 py-2"
                  flagClass="w-6 h-4 rounded"
                  prefixClass="text-sm font-semibold"
                  inputClass="flex-1 outline-none text-sm"
                />
              )}
            />

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
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

          {/* Role */}
          <div className="space-y-1">
            <Label>Role</Label>
            <Select
              defaultValue="user"
              onValueChange={(value) =>
                setValue("role", value as "user" | "provider")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Provider Name */}
          {role === "provider" && (
            <div className="space-y-1">
              <Label>Vendor / Restaurant Name</Label>
              <Input
                placeholder="Restaurant / Business name"
                {...register("provider_name")}
              />
              {errors.provider_name && (
                <p className="text-sm text-destructive">
                  {errors.provider_name.message}
                </p>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>

          {/* Resend */}
          <button
            type="button"
            disabled={!isEmailValid || cooldown > 0 || isSubmitting}
            onClick={() => resendVerification(emailValue)}
            className={`text-sm underline ${
              !isEmailValid || cooldown > 0 || isSubmitting
                ? "text-muted-foreground cursor-not-allowed"
                : "text-primary"
            }`}
          >
            {cooldown > 0
              ? `Resend available in ${cooldown}s`
              : "Resend verification email"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
