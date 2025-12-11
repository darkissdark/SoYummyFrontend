"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import Button from "@/components/form/button/Button";
import { Input } from "@/components/form/input/Input";
import useAuthStore from "@/lib/store/authStore";
import { useFormValidation } from "@/lib/hooks/useFormValidation";
import { extractApiErrorMessage } from "@/lib/utils/apiErrorHandler";
import {
  registerValidationSchema,
  type RegisterFormValues,
} from "@/lib/validation/registerSchema";
import toast from "react-hot-toast";

const checkPasswordStrength = (
  value: string
): {
  state: "error" | "warning" | "correct";
  message: string;
} => {
  if (value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
    return { state: "correct", message: "Password is secure" };
  } else if (value.length >= 6) {
    return { state: "warning", message: "Your password is little secure" };
  }
  return { state: "error", message: "" };
};

export const RegisterForm = () => {
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
  } = useFormValidation<RegisterFormValues>({
    schema: registerValidationSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    passwordStrengthCheck: checkPasswordStrength,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({} as Record<keyof RegisterFormValues, string>);

    try {
      const isValid = await validateAll();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      const registerData: RegisterRequest = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const res = await register(registerData);

      if (res) {
        setUser(res);
        toast.success("Registration successful!");
        router.push("/profile");
      }
    } catch (error) {
      const errorMessage = extractApiErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nameField = getFieldState("name");
  const emailField = getFieldState("email");
  const passwordField = getFieldState("password");

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-poppins font-semibold text-[24px] leading-[28px] md:text-[28px] md:leading-[30px] tracking-[-0.02em] mb-[18px] md:mb-[32px]">
        Registration
      </h1>

      <Input
        className="mb-[24px]"
        state={nameField.state}
        placeholder="Name"
        icon="user"
        name="name"
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
        onBlur={() => handleBlur("name")}
        message={nameField.message}
      />

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
        {isSubmitting ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
};
