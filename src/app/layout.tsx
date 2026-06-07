import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { MailProvider } from "./context/MailContext";

export const metadata: Metadata = {
  title: "MailNest — Secure Temporary Mailbox Service",
  description:
    "Create instant temporary mailboxes to receive, manage, and organize emails securely. Protect your privacy with MailNest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MailProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1e293b",
                color: "#f8fafc",
                borderRadius: "12px",
                padding: "14px 20px",
                fontSize: "14px",
                fontFamily: "'Inter', sans-serif",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#f8fafc",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#f8fafc",
                },
              },
            }}
          />
          </MailProvider>
        </AuthProvider>
      </body>
    </html>
  );
}