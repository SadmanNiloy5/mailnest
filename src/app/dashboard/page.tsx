export default function DashboardPage() {
  return (
    <div>

      <h1 className="mb-8 text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">
            Total Emails
          </h3>

          <p className="mt-2 text-3xl font-bold">
            124
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">
            Active Mailbox
          </h3>

          <p className="mt-2 text-3xl font-bold">
            3
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">
            Current Plan
          </h3>

          <p className="mt-2 text-3xl font-bold">
            Pro
          </p>
        </div>

      </div>

    </div>
  );
}