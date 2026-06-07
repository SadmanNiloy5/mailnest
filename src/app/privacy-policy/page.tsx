import { ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly to us, such as when you create an account, subscribe to a plan, or contact our support team. This includes your name, email address, and payment information (processed securely through Stripe). We also automatically collect certain information about your device and usage of our services, including IP address, browser type, and access times.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use the information we collect to provide, maintain, and improve our services. This includes operating your temporary mailbox, processing transactions, sending service notifications, and responding to your comments and questions. We may also use your information to send you updates about new features, but you can opt out at any time.",
  },
  {
    title: "3. Email Content & Retention",
    content:
      "Emails received in your temporary mailbox are encrypted at rest using AES-256 encryption. Email content is automatically deleted after the retention period specified by your plan (24 hours for Basic, 7 days for Advanced, 30 days for Pro). We do not read, analyze, or share the contents of your emails. After deletion, data is permanently removed from our servers within 48 hours.",
  },
  {
    title: "4. Data Sharing & Third Parties",
    content:
      "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our platform (e.g., payment processors, hosting providers), but they are bound by confidentiality agreements. We may disclose information if required by law or to protect the rights and safety of our users.",
  },
  {
    title: "5. Cookies & Tracking",
    content:
      "We use essential cookies to maintain your session and remember your preferences. We do not use third-party advertising cookies or tracking pixels. Analytics data is collected in aggregate form and cannot be used to identify individual users. You can disable cookies in your browser settings, but some features may not function properly.",
  },
  {
    title: "6. Data Security",
    content:
      "We implement industry-standard security measures to protect your personal information, including SSL/TLS encryption for data in transit, AES-256 encryption for data at rest, regular security audits, and access controls. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "7. Your Rights",
    content:
      "You have the right to access, update, or delete your personal information at any time through your account settings. You can request a copy of all data we hold about you. You have the right to object to processing of your data and to data portability. To exercise these rights, contact us at privacy@mailnest.com.",
  },
  {
    title: "8. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'last updated' date. We encourage you to review this Privacy Policy periodically. Your continued use of the service after changes constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-subtle pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-500">
            Last updated: January 15, 2026
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 space-y-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 md:p-10">
            <p className="text-base leading-relaxed text-gray-600">
              At MailNest, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our temporary mailbox service. We are
              committed to protecting your personal data and being transparent
              about our practices.
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

          {/* Contact */}
          <div className="rounded-2xl bg-indigo-50 p-8 text-center ring-1 ring-indigo-100 md:p-10">
            <h2 className="text-xl font-bold text-gray-900">
              Questions About Privacy?
            </h2>
            <p className="mt-3 text-gray-600">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@mailnest.com"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                privacy@mailnest.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}