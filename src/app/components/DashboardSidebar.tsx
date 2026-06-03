"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
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
    <aside className="hidden w-64 border-r bg-white md:block">

      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-blue-600">
          MailNest
        </h2>
      </div>

      <nav className="flex flex-col gap-2 p-4">

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg p-3 transition ${
              pathname === link.href
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}

      </nav>

    </aside>
  );
}