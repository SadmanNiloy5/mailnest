const steps = [
  {
    id: 1,
    title: "Create Account",
    description:
      "Sign up and create your account.",
  },

  {
    id: 2,
    title: "Get Mailbox",
    description:
      "Receive your temporary mailbox instantly.",
  },

  {
    id: 3,
    title: "Receive Emails",
    description:
      "Start receiving emails securely.",
  },

  {
    id: 4,
    title: "Manage Messages",
    description:
      "View and organize your emails.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">

      <h1 className="mb-12 text-center text-4xl font-bold">
        How It Works
      </h1>

      <div className="grid gap-8 md:grid-cols-4">

        {steps.map((step) => (
          <div
            key={step.id}
            className="rounded-xl border p-6 text-center"
          >
            <div className="mb-4 text-3xl font-bold text-blue-600">
              {step.id}
            </div>

            <h3 className="font-bold">
              {step.title}
            </h3>

            <p className="mt-3 text-gray-600">
              {step.description}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}