import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using MailNest, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service. These terms apply to all visitors, users, and others who access or use the Service.",
  },
  {
    title: "2. Description of Service",
    content:
      "MailNest provides temporary mailbox services that allow users to create disposable email addresses for receiving and managing emails. The service is designed for privacy protection and is not intended for illegal activities, harassment, or spam distribution.",
  },
  {
    title: "3. User Accounts",
    content:
      "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password and for all activities that occur under your account.",
  },
  {
    title: "4. Acceptable Use",
    content:
      "You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service. You must not attempt to gain unauthorized access to any part of the service, other accounts, or computer systems. Automated access to the service is prohibited without express written consent.",
  },
  {
    title: "5. Privacy & Data",
    content:
      "Your use of MailNest is also governed by our Privacy Policy. We collect only the minimum data necessary to provide our services. Temporary mailbox contents are automatically deleted after the retention period specified by your plan. We do not sell or share your personal data with third parties.",
  },
  {
    title: "6. Subscription & Billing",
    content:
      "Some parts of the service are billed on a subscription basis. You will be billed in advance on a recurring basis (monthly or annually), depending on the plan you select. You can cancel your subscription at any time. Upon cancellation, your account will remain active until the end of the current billing period.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "In no event shall MailNest, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
  },
  {
    title: "8. Changes to Terms",
    content:
      "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Continued use of the service after changes constitutes acceptance.",
  },
];

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-subtle pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <FileText className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-500">
            Last updated: January 15, 2026
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 space-y-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 md:p-10">
            <p className="text-base leading-relaxed text-gray-600">
              Welcome to MailNest. These terms and conditions outline the rules
              and regulations for the use of our temporary mailbox service.
              Please read them carefully before using the platform.
            </p>
          </div>

          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 md:p-10"
            >
              <h2 className="text-xl font-bold text-gray-900">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}