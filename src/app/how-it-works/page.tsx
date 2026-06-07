import Link from "next/link";
import {
  UserPlus,
  Inbox,
  MailOpen,
  Settings,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Create Your Account",
    description:
      "Sign up in seconds with just your email. No credit card required, no complicated verification process.",
    icon: UserPlus,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    title: "Get Your Mailbox",
    description:
      "Instantly receive a temporary mailbox address. Use it anywhere you need a disposable email.",
    icon: Inbox,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    title: "Receive Emails",
    description:
      "All emails sent to your temporary address appear in your dashboard in real-time. Fully encrypted.",
    icon: MailOpen,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "Manage & Organize",
    description:
      "Read, star, search, and delete emails. Set auto-expiry timers or forward important messages.",
    icon: Settings,
    color: "from-amber-500 to-orange-500",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Zero Data Leaks",
    description:
      "Your temporary mailbox is completely isolated. We never sell or share your data.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Emails arrive in under 3 seconds. Our infrastructure is built for speed.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description:
      "Compatible with any service that accepts email. No restrictions.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white section-padding">
        <div className="absolute inset-0 gradient-bg-subtle pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 animate-fade-in-up">
            Simple Process
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-6xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            How{" "}
            <span className="gradient-text">MailNest</span>{" "}
            Works
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Getting started is easy. Four simple steps to protect your email
            privacy and take control of your inbox.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative flex items-start gap-8 pb-16 last:pb-0"
              >
                {/* Timeline line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 h-full w-0.5 bg-gradient-to-b from-indigo-200 to-transparent md:left-10" />
                )}

                {/* Step number circle */}
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg md:h-20 md:w-20`}
                  >
                    <step.icon className="h-7 w-7 text-white md:h-8 md:w-8" />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-indigo-500">
                    Step {step.id}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding gradient-bg-subtle">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Why choose MailNest?
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3 stagger-children">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 card-hover"
              >
                <div className="inline-flex rounded-xl bg-indigo-50 p-3">
                  <b.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 gradient-bg opacity-95" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-5xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
            Create your free temporary mailbox in under 30 seconds.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-indigo-600 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}