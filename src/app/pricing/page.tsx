"use client";

import { plans } from "../data/plans";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-subtle pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100">
            <Sparkles className="h-4 w-4" />
            Simple, Transparent Pricing
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-6xl">
            Choose your{" "}
            <span className="gradient-text">perfect plan</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="mt-10 inline-flex items-center gap-4 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-gray-100">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                !annual
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              id="billing-monthly"
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                annual
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              id="billing-annual"
            >
              Annual
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 stagger-children">
          {plans.map((plan) => {
            const price = annual
              ? Math.round(plan.price * 12 * 0.8)
              : plan.price;
            const period = annual ? "year" : "month";

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-indigo-600 to-violet-700 text-white ring-4 ring-indigo-300 shadow-2xl shadow-indigo-500/25 scale-[1.02] md:scale-105"
                    : "bg-white ring-1 ring-gray-200 card-hover"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold ${
                      plan.highlighted
                        ? "bg-amber-400 text-amber-900"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                <h3
                  className={`text-xl font-bold ${
                    plan.highlighted ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    plan.highlighted
                      ? "text-indigo-200"
                      : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold">${price}</span>
                  <span
                    className={`text-sm ${
                      plan.highlighted
                        ? "text-indigo-200"
                        : "text-gray-400"
                    }`}
                  >
                    /{period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                          plan.highlighted
                            ? "text-indigo-200"
                            : "text-emerald-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.highlighted
                            ? "text-indigo-100"
                            : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all ${
                    plan.highlighted
                      ? "bg-white text-indigo-600 hover:bg-gray-50 hover:shadow-lg"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25"
                  }`}
                  id={`subscribe-${plan.name.toLowerCase()}`}
                >
                  Get {plan.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ hint */}
        <div className="mt-16 text-center">
          <p className="text-gray-500">
            Have questions?{" "}
            <Link
              href="/contact"
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}