"use client";

import Link from "next/link";
import { SignInForm } from "@/components/auth/SignInForm/SignInForm";

const SignInPage = () => {
  return (
    <main className="w-full max-w-[500px] pb-[30px] mb:pb-[60px] m-auto">
      <div className="bg-[var(--primary-background)] text-[var(--primary-color)] rounded-[30px] py-[32px] px-[28px] md:py-[50px] md:px-[44px] mb-[18px]">
        <SignInForm />
      </div>
      <div className="text-center">
        <Link
          href="/register"
          className="text-[var(--primary-color)] underline"
        >
          Sign up
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
