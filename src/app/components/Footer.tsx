import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="flex flex-col gap-4 md:flex-row md:justify-between">

          <div>
            <h2 className="text-xl font-bold text-blue-600">
              MailNest
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Secure temporary mailbox platform.
            </p>
          </div>

          <div className="flex gap-6">
            <Link href="/terms">Terms</Link>

            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/contact">
              Contact
            </Link>
          </div>

        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          © 2026 MailNest. All rights reserved.
        </p>

      </div>
    </footer>
  );
}