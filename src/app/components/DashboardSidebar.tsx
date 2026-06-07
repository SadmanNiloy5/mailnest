"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Inbox,
  CreditCard,
  User,
  LogOut,
  Mail,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

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
    toast.success("Successfully logged out");
    router.push("/");
  };

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white md:flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="flex h-16 items-center px-6 border-b border-gray-100 gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
          <Mail className="h-4.5 w-4.5" />
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          MailNest
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-1.5 p-4 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile info block */}
      {user && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-md shadow-indigo-500/10">
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
    </aside>
  );
}