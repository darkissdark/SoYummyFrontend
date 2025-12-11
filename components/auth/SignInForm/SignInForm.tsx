"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginRequest } from "@/lib/api/clientApi";
import Button from "@/components/form/button/Button";
import { Input } from "@/components/form/input/Input";
import useAuthStore from "@/lib/store/authStore";
import { useFormValidation } from "@/lib/hooks/useFormValidation";
import { extractApiErrorMessage } from "@/lib/utils/apiErrorHandler";
import {
  signinValidationSchema,
  type SignInFormValues,
} from "@/lib/validation/signinSchema";
import toast from "react-hot-toast";

export const SignInForm = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    values,
    getFieldState,
    handleChange,
    handleBlur,
    validateAll,
    setErrors,
  } = useFormValidation<SignInFormValues>({
    schema: signinValidationSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({} as Record<keyof SignInFormValues, string>);

    try {
      const isValid = await validateAll();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      const loginData: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      const res = await login(loginData);

      if (res) {
        setUser(res);
        toast.success("Login successful!");
        router.push("/profile");
      }
    } catch (error) {
      const errorMessage = extractApiErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailField = getFieldState("email");
  const passwordField = getFieldState("password");

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-poppins font-semibold text-[24px] leading-[28px] md:text-[28px] md:leading-[30px] tracking-[-0.02em] mb-[18px] md:mb-[32px]">
        Sign in
      </h1>

      <Input
        className="mb-[24px]"
        state={emailField.state}
        placeholder="Email"
        type="email"
        icon="mail"
        name="email"
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        message={emailField.message}
      />

      <Input
        className="mb-[28px] md:mb-[50px]"
        state={passwordField.state}
        placeholder="Password"
        type="password"
        icon="lock"
        name="password"
        value={values.password}
        onChange={(e) => handleChange("password", e.target.value)}
        onBlur={() => handleBlur("password")}
        message={passwordField.message}
      />

      <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Log in"}
      </Button>
    </form>
  );
};
