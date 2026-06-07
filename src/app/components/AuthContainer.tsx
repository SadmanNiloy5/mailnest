"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

interface AuthContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthContainer({
  title,
  subtitle,
  children,
}: AuthContainerProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-bg-subtle" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200 to-cyan-200 blur-3xl opacity-40" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 blur-3xl opacity-30" />

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-indigo-500/20">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">MailNest</span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-xl shadow-indigo-500/5 ring-1 ring-gray-100">
          <h1 className="text-center text-2xl font-extrabold text-gray-900 md:text-3xl">
            {title}
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500">
            {subtitle}
          </p>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}