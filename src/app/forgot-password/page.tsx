import Link from "next/link";
import AuthContainer from "../components/AuthContainer";

export default function ForgotPasswordPage() {
  return (
    <AuthContainer
      title="Forgot Password"
      subtitle="Reset your password"
    >
      <form className="space-y-4">

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border p-3"
        />

        <button
          className="w-full rounded-lg bg-blue-600 py-3 text-white"
        >
          Send Reset Link
        </button>

      </form>

      <div className="mt-4 text-center">

        <Link
          href="/login"
          className="text-blue-600"
        >
          Back to Login
        </Link>

      </div>
    </AuthContainer>
  );
}