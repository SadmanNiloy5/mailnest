import DashboardSidebar from "../components/DashboardSidebar";
import MobileSidebar from "../components/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <DashboardSidebar />

      <main className="flex-1 p-4 md:p-8">

        <MobileSidebar />

        {children}

      </main>

    </div>
  );
}