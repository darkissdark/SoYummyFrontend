"use client";

import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm/RegisterForm";

const SignUpPage = () => {
  return (
    <main className="w-full max-w-[500px] pb-[30px] mb:pb-[60px] m-auto">
      <div className="bg-[var(--primary-background)] text-[var(--primary-color)] rounded-[30px] py-[32px] px-[28px] md:py-[50px] md:px-[44px] mb-[18px]">
        <RegisterForm />
      </div>
      <div className="text-center">
        <Link href="/signin" className="text-[var(--primary-color)] underline">
          Sign in
        </Link>
      </div>
    </main>
  );
};

export default SignUpPage;
