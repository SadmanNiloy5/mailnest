import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 border-r bg-white">

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold text-blue-600">
          MailNest
        </h2>

      </div>

      <nav className="flex flex-col p-4">

        <Link
          href="/dashboard"
          className="rounded-lg p-3 hover:bg-gray-100"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/mail"
          className="rounded-lg p-3 hover:bg-gray-100"
        >
          My Mail
        </Link>

        <Link
          href="/dashboard/subscription"
          className="rounded-lg p-3 hover:bg-gray-100"
        >
          Subscription
        </Link>

        <Link
          href="/dashboard/profile"
          className="rounded-lg p-3 hover:bg-gray-100"
        >
          Profile
        </Link>

      </nav>

    </aside>
  );
}