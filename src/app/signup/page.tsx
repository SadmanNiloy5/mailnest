import Link from "next/link";
import AuthContainer from "../components/AuthContainer";

export default function SignupPage() {
  return (
    <AuthContainer
      title="Create Account"
      subtitle="Start using MailNest today"
    >
      <form className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-lg border p-3"
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-lg border p-3"
        />

        <button
          className="w-full rounded-lg bg-blue-600 py-3 text-white"
        >
          Sign Up
        </button>

      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600"
        >
          Login
        </Link>
      </p>
    </AuthContainer>
  );
}