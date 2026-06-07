"use client";

import { useAuth } from "../../context/AuthContext";
import { useMail } from "../../context/MailContext";
import { plans } from "../../data/plans";
import { Check, ShieldCheck, Zap, AlertCircle, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function SubscriptionPage() {
  const { user, updateProfile } = useAuth();
  const { activeMailboxes, mails } = useMail();

  const handlePlanChange = (planName: string) => {
    if (user?.plan === planName) {
      toast.success(`You are already subscribed to the ${planName} plan.`);
      return;
    }

    updateProfile({ plan: planName });
    toast.success(`Plan successfully updated to ${planName}!`);
  };

  // Usage stats calculations
  const mailboxCount = activeMailboxes.length;
  const planLimits: { [key: string]: { mailboxes: number; emails: number; storage: number } } = {
    Basic: { mailboxes: 1, emails: 100, storage: 50 },
    Advanced: { mailboxes: 5, emails: 1000, storage: 500 },
    Pro: { mailboxes: 999, emails: 999999, storage: 1000 },
  };

  const currentLimit = planLimits[user?.plan || "Basic"] || planLimits.Basic;
  
  // Storage (mocked: 150KB per email)
  const mockStorageUsed = mails.length * 0.15;
  const storagePercent = Math.min(100, (mockStorageUsed / currentLimit.storage) * 100);
  
  // Mailbox percentage
  const mailboxPercent = Math.min(100, (mailboxCount / currentLimit.mailboxes) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          Subscription Plan
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor your current workspace limits, billing cycle, or upgrade plans.
        </p>
      </div>

      {/* Current Usage Status */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Zap className="h-5 w-5 text-indigo-500" />
          Plan Usage Details
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Mailboxes limit */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-600">Mailbox Limit</span>
              <span className="font-bold text-gray-900">
                {mailboxCount} <span className="text-gray-400 font-medium">/ {currentLimit.mailboxes === 999 ? "Unlimited" : currentLimit.mailboxes} active</span>
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-100">
              <div
                className="h-2.5 rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${currentLimit.mailboxes === 999 ? 100 : mailboxPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">
              {currentLimit.mailboxes === 999 ? "No limit on mailboxes" : `${currentLimit.mailboxes - mailboxCount} mailboxes remaining`}
            </p>
          </div>

          {/* Storage limit */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-600">Storage Used</span>
              <span className="font-bold text-gray-900">
                {mockStorageUsed.toFixed(2)} <span className="text-gray-400 font-medium">/ {currentLimit.storage} MB</span>
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-100">
              <div
                className="h-2.5 rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${storagePercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">
              {(currentLimit.storage - mockStorageUsed).toFixed(2)} MB of storage available
            </p>
          </div>
        </div>

        {/* Current Tier Badge */}
        <div className="mt-8 border-t border-gray-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Active Subscription</p>
              <h4 className="text-sm font-bold text-gray-900">MailNest {user?.plan} Tier</h4>
            </div>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            Billing cycle renews automatically every month.
          </div>
        </div>
      </div>

      {/* Available Plans Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = user?.plan === plan.name;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 ${
                  isCurrent
                    ? "bg-gradient-to-b from-indigo-600 to-violet-700 text-white ring-4 ring-indigo-300 shadow-xl shadow-indigo-500/20"
                    : "bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <span
                    className={`absolute -top-3.5 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      isCurrent ? "bg-amber-400 text-amber-900" : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                <h3 className={`text-lg font-bold ${isCurrent ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 text-xs leading-relaxed ${isCurrent ? "text-indigo-200" : "text-gray-500"}`}>
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className={`text-xs ${isCurrent ? "text-indigo-200" : "text-gray-400"}`}>
                    /{plan.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-gray-100 pt-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs">
                      <Check
                        className={`h-4.5 w-4.5 flex-shrink-0 ${
                          isCurrent ? "text-white" : "text-indigo-600"
                        }`}
                      />
                      <span className={isCurrent ? "text-indigo-100" : "text-gray-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanChange(plan.name)}
                  disabled={isCurrent}
                  className={`mt-6 w-full flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition-all ${
                    isCurrent
                      ? "bg-indigo-500/40 text-indigo-100 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10"
                  }`}
                >
                  {isCurrent ? (
                    "Active Tier"
                  ) : (
                    <>
                      <span>Activate Plan</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}