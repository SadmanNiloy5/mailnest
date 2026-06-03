"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "How It Works",
      href: "/how-it-works",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          MailNest
        </Link>

        <nav className="flex items-center gap-6">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "font-semibold text-blue-600"
                  : "text-gray-600"
              }
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Login
          </Link>

        </nav>

      </div>
    </header>
  );
}