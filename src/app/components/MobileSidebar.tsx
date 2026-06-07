"use client";

import { useState } from "react";
import { Menu, X, LayoutDashboard, Inbox, CreditCard, User, LogOut, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const links = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Mail",
      href: "/dashboard/mail",
      icon: Inbox,
    },
    {
      label: "Subscription",
      href: "/dashboard/subscription",
      icon: CreditCard,
    },
    {
      label: "Profile Settings",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    toast.success("Successfully logged out");
    router.push("/");
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
            <Mail className="h-4.5 w-4.5" />
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            MailNest
          </span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative flex w-full max-w-xs flex-col bg-white p-6 shadow-2xl animate-slide-in-left h-full">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <span className="text-base font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                  MailNest
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
              {links.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-5 w-5 text-gray-400" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Profile info block */}
            {user && (
              <div className="border-t border-gray-100 pt-4 mt-6 space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{user.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 uppercase tracking-wider scale-90">
                    {user.plan}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 text-red-500" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}