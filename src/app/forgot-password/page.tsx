"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import AuthContainer from "../components/AuthContainer";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setIsSubmitted(true);
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(res.error || "Failed to send reset link");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainer
      title={isSubmitted ? "Check Your Email" : "Reset Password"}
      subtitle={
        isSubmitted
          ? "We have sent password recovery instructions to your email."
          : "Enter the email associated with your account and we will send a reset link."
      }
    >
      {isSubmitted ? (
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 animate-scale-in">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          
          <div className="rounded-xl bg-gray-50 p-4 border border-gray-100 text-sm text-gray-600">
            Reset email sent to: <span className="font-semibold text-gray-900">{email}</span>
          </div>

          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full btn-outline py-3 text-sm font-semibold rounded-xl"
          >
            Resend Email
          </button>
          
          <div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </AuthContainer>
  );
}