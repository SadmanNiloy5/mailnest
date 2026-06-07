import Link from "next/link";
import {
  Shield,
  Zap,
  Lock,
  Globe,
  ArrowRight,
  Mail,
  CheckCircle2,
  Star,
  Users,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Mailbox",
    description:
      "Create a temporary mailbox in seconds. No verification needed, no waiting — just instant access.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description:
      "Keep your real email safe from spam and data breaches. Your privacy is our top priority.",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Lock,
    title: "Encrypted Storage",
    description:
      "All emails are encrypted at rest and in transit. Enterprise-grade security for everyone.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description:
      "Check your temporary mailbox from any device — desktop, tablet, or mobile. Always in sync.",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Clock,
    title: "Auto Expiry",
    description:
      "Set retention periods for your mailbox. Emails auto-delete after the timer, leaving no trace.",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
  },
  {
    icon: Mail,
    title: "Smart Filtering",
    description:
      "Advanced spam filters keep junk out. Only receive the emails that matter to you.",
    color: "from-violet-500 to-indigo-500",
    bgColor: "bg-violet-50",
  },
];

const stats = [
  { value: "2M+", label: "Emails Processed" },
  { value: "150K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "User Rating" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    text: "MailNest saved me from countless spam emails. I use it for every online signup now.",
    rating: 5,
  },
  {
    name: "Alex Johnson",
    role: "Freelance Developer",
    text: "The instant mailbox creation is a game-changer. Clean interface, fast, and reliable.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Startup Founder",
    text: "We use MailNest for all our testing environments. The API access on Pro is fantastic.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white section-padding">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-100 to-cyan-100 blur-3xl opacity-60" />
          <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 blur-3xl opacity-40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                Trusted by 150K+ Users Worldwide
              </span>
            </div>

            <h1
              className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-7xl animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Your Privacy,{" "}
              <span className="gradient-text">Your Mailbox</span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 md:text-xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Create instant temporary mailboxes to receive, manage, and
              organize emails securely. No spam, no data breaches — just
              privacy.
            </p>

            <div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                href="/signup"
                className="btn-primary flex items-center gap-2 rounded-2xl px-8 py-4 text-base"
              >
                <span>Start Free Today</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="btn-outline flex items-center gap-2 rounded-2xl px-8 py-4 text-base"
              >
                See How It Works
              </Link>
            </div>

            <div
              className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-400 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Free tier available
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No credit card
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold gradient-text md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white" id="features">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Features
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-5xl">
              Everything you need for{" "}
              <span className="gradient-text">secure email</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Powerful features designed to keep your inbox clean and your
              identity private.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-8 card-hover"
              >
                <div
                  className={`mb-5 inline-flex rounded-2xl ${feature.bgColor} p-3.5`}
                >
                  <feature.icon
                    className={`h-6 w-6 bg-gradient-to-r ${feature.color} bg-clip-text`}
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding gradient-bg-subtle">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-5xl">
              Loved by{" "}
              <span className="gradient-text">thousands</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              See what our users have to say about MailNest.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 stagger-children">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-white p-8 shadow-sm card-hover border border-gray-100"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 gradient-bg opacity-95" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-5xl">
            Ready to protect your inbox?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Join thousands of users who trust MailNest for their email
            privacy. Get started in seconds.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-indigo-600 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}