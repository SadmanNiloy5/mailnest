import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "MailNest",
  description: "Temporary Mailbox Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
<Toaster position="top-right" />
      </body>
    </html>
  );
}