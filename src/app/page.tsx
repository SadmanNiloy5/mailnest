import Link from "next/link";

export default function HomePage() {
  return (
    <div>

      <section className="bg-gray-100 py-24">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <h1 className="text-5xl font-bold">
            Secure Temporary Mailbox
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Receive and manage emails securely
            with your personal temporary mailbox.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            Get Started
          </Link>

        </div>

      </section>

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-10 text-center text-3xl font-bold">
            Features
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-lg border p-6">
              <h3 className="font-bold">
                Instant Mailbox
              </h3>

              <p className="mt-3 text-gray-600">
                Create mailbox instantly.
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="font-bold">
                Secure Emails
              </h3>

              <p className="mt-3 text-gray-600">
                Protect your privacy.
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="font-bold">
                Easy Management
              </h3>

              <p className="mt-3 text-gray-600">
                Organize mails easily.
              </p>
            </div>

          </div>

        </div>

      </section>

      <section className="bg-blue-600 py-20 text-center text-white">

        <h2 className="text-4xl font-bold">
          Start Today
        </h2>

        <p className="mt-4">
          Create your temporary mailbox now.
        </p>

        <Link
          href="/signup"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-blue-600"
        >
          Create Account
        </Link>

      </section>

    </div>
  );
}