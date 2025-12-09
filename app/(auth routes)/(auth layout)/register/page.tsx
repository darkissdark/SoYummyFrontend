"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterOrLoginRequest } from "@/lib/api/clientApi";
import Button from "@/components/form/button/Button";
import { isAxiosError } from "axios";
import useAuthStore from "@/lib/store/authStore";
import Link from "next/link";
import { Input } from "@/components/form/input/Input";

const formDataToObject = (formData: FormData): RegisterOrLoginRequest => {
  return {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };
};

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = formDataToObject(formData);
      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.response?.validation?.body?.message ||
            error.response?.data?.response?.message ||
            "Registration failed try again later."
        );
      }
    }
  };

  return (
    <main className="w-full max-w-[500px] pb-[30px] mb:pb-[60px] m-auto">
      <form
        className="bg-[var(--primary-background)] text-[var(--primary-color)] rounded-[30px] py-[32px] px-[28px] md:py-[50px] md:px-[44px] mb-[18px]"
        action={handleSubmit}
      >
        <h1 className="font-poppins font-semibold text-[24px] leading-[28px] md:text-[28px] md:leading-[30px] tracking-[-0.02em] mb-[18px] md:mb-[32px]">
          Registration
        </h1>

        <Input
          className="mb-[12px] md:mb-[24px]"
          state="normal"
          placeholder="Name"
          icon="user"
          name="name"
        />

        <Input
          className="mb-[12px] md:mb-[24px]"
          state="normal"
          placeholder="Email"
          type="email"
          icon="mail"
          name="email"
        />

        <Input
          className="mb-[28px] md:mb-[50px]"
          state="normal"
          placeholder="Password"
          type="password"
          icon="lock"
          name="password"
        />

        {/* Normal State */}
        {/* <Input state="normal" message="Enter your password" /> */}

        {/* Hover State (Simulated by state="normal" and mouse interaction) */}
        {/* <Input state="normal" placeholder="Try hovering me!" /> */}

        {/* Warning State */}
        {/* <Input
          state="warning"
          message="Your password is little secure"
          defaultValue="**********"
        /> */}

        {/* Error State */}
        {/* <Input
          state="error"
          message="Enter a valid Password"
          defaultValue="**********"
        /> */}

        {/* Correct State */}
        {/* <Input
          state="correct"
          message="Password is secure"
          defaultValue="**********"
        /> */}

        <Button type="submit" variant="primary" fullWidth>
          Sign up
        </Button>

        {error && <p>{error}</p>}
      </form>
      <div className="text-center">
        <Link href="/signin" className="text-[var(--primary-color)] underline">
          Sign in
        </Link>
      </div>
    </main>
  );
};

export default SignUpPage;
