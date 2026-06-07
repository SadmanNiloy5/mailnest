"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMail } from "../context/MailContext";
import { useRouter } from "next/navigation";
import {
  Mail,
  Copy,
  Check,
  Trash2,
  Plus,
  ArrowRight,
  ShieldCheck,
  Inbox,
  HardDrive,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    activeMailboxes,
    currentMailbox,
    mails,
    generateMailbox,
    deleteMailbox,
    setCurrentMailbox,
  } = useMail();
  const router = useRouter();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    toast.success("Address copied to clipboard!");
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleGenerate = () => {
    // Check mailbox limits based on plan
    const planLimits: { [key: string]: number } = { Basic: 1, Advanced: 5, Pro: 999 };
    const limit = planLimits[user?.plan || "Basic"] || 1;

    if (activeMailboxes.length >= limit) {
      toast.error(
        `You have reached the limit of ${limit} mailbox(es) for the ${user?.plan} plan. Please upgrade your plan in the Subscription settings.`
      );
      return;
    }

    const newAddr = generateMailbox();
    toast.success(`Generated mailbox: ${newAddr}`);
  };

  const handleViewInbox = (address: string) => {
    setCurrentMailbox(address);
    router.push("/dashboard/mail");
  };

  // Get current mailbox emails
  const currentMailboxEmails = mails.filter((m) => m.recipient === currentMailbox);
  const totalEmailsCount = mails.length;
  
  // Calculate storage size (mocked)
  const storageLimit = user?.plan === "Pro" ? 1000 : user?.plan === "Advanced" ? 500 : 50; // MB
  const mockStorageUsed = (mails.length * 0.15).toFixed(2); // 150KB per email

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Welcome back, <span className="gradient-text">{user?.name || "User"}</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your temporary mailboxes and secure your online identity.
          </p>
        </div>
        <button
          onClick={handleGenerate}
          className="btn-primary flex items-center justify-center gap-2 rounded-2xl py-3 px-5 text-sm font-bold shadow-lg shadow-indigo-500/15"
        >
          <Plus className="h-5 w-5" />
          <span>New Mailbox</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        {/* Stat 1: Active Mailboxes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Inbox className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400">Active Mailboxes</h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {activeMailboxes.length}{" "}
              <span className="text-xs text-gray-400 font-medium">
                / {user?.plan === "Pro" ? "∞" : user?.plan === "Advanced" ? 5 : 1}
              </span>
            </p>
          </div>
        </div>

        {/* Stat 2: Total Emails */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400">Emails Received</h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">{totalEmailsCount}</p>
          </div>
        </div>

        {/* Stat 3: Current Plan */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400">Current Plan</h3>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-gray-900">{user?.plan}</span>
            </div>
          </div>
        </div>

        {/* Stat 4: Storage */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex items-center gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <HardDrive className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-400">Storage Used</h3>
            <p className="mt-0.5 text-2xl font-bold text-gray-900">
              {mockStorageUsed}{" "}
              <span className="text-xs text-gray-400 font-medium">MB</span>
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
              <div
                className="h-1.5 rounded-full bg-amber-500"
                style={{
                  width: `${Math.min(100, (parseFloat(mockStorageUsed) / storageLimit) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Active Mailboxes & Recent Mails */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Active Mailboxes (2/3 width on large screens) */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Mailboxes</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Generate new temp addresses or read their messages.
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
              {activeMailboxes.length} Active
            </span>
          </div>

          {activeMailboxes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-4">
                <Inbox className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900">No active mailboxes</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">
                Click "New Mailbox" above to generate your first temporary email address!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {activeMailboxes.map((address) => {
                const isActive = address === currentMailbox;
                const mailboxMails = mails.filter((m) => m.recipient === address);
                const unreadMailsCount = mailboxMails.filter((m) => !m.read).length;

                return (
                  <div
                    key={address}
                    className={`flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between transition-colors rounded-xl px-2 ${
                      isActive ? "bg-indigo-50/20" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-bold ${
                          isActive
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        @
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold text-sm truncate ${
                              isActive ? "text-indigo-600 font-bold" : "text-gray-900"
                            }`}
                          >
                            {address}
                          </span>
                          {isActive && (
                            <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-400">
                            {mailboxMails.length} messages
                          </span>
                          {unreadMailsCount > 0 && (
                            <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-700">
                              {unreadMailsCount} unread
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 sm:self-center">
                      <button
                        onClick={() => handleCopy(address)}
                        className="rounded-xl border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        title="Copy to Clipboard"
                      >
                        {copiedAddress === address ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handleViewInbox(address)}
                        className="rounded-xl bg-indigo-50 text-indigo-600 px-3 py-2 text-xs font-bold hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                      >
                        <span>Inbox</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => deleteMailbox(address)}
                        className="rounded-xl border border-red-100 text-red-500 p-2 hover:bg-red-50 transition-colors"
                        title="Delete Mailbox"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Recent Emails (1/3 width on large screens) */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recent Mails</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Latest messages in active mailbox.
              </p>
            </div>
          </div>

          {!currentMailbox ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              <Mail className="h-10 w-10 mb-2" />
              <p className="text-sm">No active mailbox selected</p>
            </div>
          ) : currentMailboxEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-3">
                <Mail className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Inbox is empty</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                Waiting for incoming emails... Try refreshing or simulating emails.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentMailboxEmails.slice(0, 4).map((mail) => (
                <div
                  key={mail.id}
                  onClick={() => {
                    setCurrentMailbox(mail.recipient || currentMailbox);
                    router.push("/dashboard/mail");
                  }}
                  className={`group rounded-2xl border border-gray-50 p-4 transition-all duration-200 cursor-pointer hover:border-indigo-100 hover:bg-indigo-50/5 ${
                    !mail.read ? "border-l-4 border-l-indigo-600 bg-slate-50/20" : ""
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-xs truncate ${!mail.read ? "font-bold text-gray-900" : "text-gray-500"}`}>
                      {mail.sender}
                    </span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{mail.date}</span>
                  </div>
                  <h4 className={`text-sm truncate mt-1 ${!mail.read ? "font-bold text-gray-900" : "text-gray-700"}`}>
                    {mail.subject}
                  </h4>
                  <p className="text-xs text-gray-400 truncate mt-1">{mail.preview}</p>
                </div>
              ))}
              
              <button
                onClick={() => router.push("/dashboard/mail")}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors pt-2"
              >
                <span>View Full Inbox</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}