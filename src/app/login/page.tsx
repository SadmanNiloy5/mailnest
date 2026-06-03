"use client";

import toast from "react-hot-toast";
import Link from "next/link";
import AuthContainer from "@/components/AuthContainer";

export default function LoginPage() {
  return (
    <AuthContainer
      title="Welcome Back"
      subtitle="Login to your account"
    >
      <form className="space-y-4">

        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border p-3"
        />

       <button
  type="button"
  onClick={() =>
    toast.success("Login Successful")
  }
  className="w-full rounded-lg bg-blue-600 py-3 text-white"
>
  Login
</button>

      </form>

      <div className="mt-4 text-center">

        <Link
          href="/forgot-password"
          className="text-sm text-blue-600"
        >
          Forgot Password?
        </Link>

      </div>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600"
        >
          Sign Up
        </Link>
      </p>
    </AuthContainer>
  );
}