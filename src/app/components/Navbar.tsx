"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "How It Works",
      href: "/how-it-works",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          MailNest
        </Link>

        <nav className="hidden items-center gap-6 md:flex">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "font-semibold text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Login
          </Link>

        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">

          <div className="flex flex-col p-4">

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-center text-white"
            >
              Login
            </Link>

          </div>

        </div>
      )}
    </header>
  );
}