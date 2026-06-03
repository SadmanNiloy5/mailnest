"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "My Mail",
      href: "/dashboard/mail",
    },
    {
      label: "Subscription",
      href: "/dashboard/subscription",
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
    },
  ];

  return (
    <>
      <div className="mb-4 md:hidden">

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg border p-2"
        >
          <Menu />
        </button>

      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50">

          <div className="h-full w-64 bg-white p-4">

            <div className="mb-6 flex justify-end">

              <button onClick={() => setOpen(false)}>
                <X />
              </button>

            </div>

            <nav className="flex flex-col gap-2">

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg p-3 ${
                    pathname === link.href
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            </nav>

          </div>

        </div>
      )}
    </>
  );
}