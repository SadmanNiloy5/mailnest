import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          MailNest
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/contact">Contact</Link>

          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}