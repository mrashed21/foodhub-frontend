"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

/* ---------------- schema ---------------- */
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum length is 8"),
});

type LoginFormValues = z.infer<typeof formSchema>;

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
        window.location.href = "/dashboard";
      }
    } catch {
      toast.error("Something went wrong, please try again.", { id: toastId });
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                {...register("email")}
              />
              {/* {errors.email && (
                <FieldError errors={[errors.email.message ?? ""]} />
              )} */}
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password")}
              />
              {/* {errors.password && (
                <FieldError errors={[errors.password.message ?? ""]} />
              )} */}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-5">
        <Button
          form="login-form"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          Login
        </Button>

       
      </CardFooter>
    </Card>
  );
}
