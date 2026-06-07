"use client";

import { useState, useEffect } from "react";
import { useMail } from "../../context/MailContext";
import { useAuth } from "../../context/AuthContext";
import {
  Inbox,
  Star,
  Trash2,
  Mail,
  MailOpen,
  Search,
  RefreshCw,
  Copy,
  Check,
  Plus,
  ChevronLeft,
  Paperclip,
  Download,
  AlertCircle,
  ExternalLink,
  Tag,
} from "lucide-react";
import toast from "react-hot-toast";

export default function MailPage() {
  const { user } = useAuth();
  const {
    activeMailboxes,
    currentMailbox,
    selectedMail,
    selectMail,
    toggleRead,
    toggleStar,
    deleteMail,
    filterLabel,
    setFilterLabel,
    searchQuery,
    setSearchQuery,
    filteredMails,
    generateMailbox,
    setCurrentMailbox,
    simulateIncomingMail,
  } = useMail();

  // Mobile layout state: 'mailbox' | 'list' | 'preview'
  const [mobilePane, setMobilePane] = useState<"mailbox" | "list" | "preview">("list");
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Sync mobile pane
  useEffect(() => {
    if (selectedMail) {
      setMobilePane("preview");
    }
  }, [selectedMail]);

  const handleCopy = () => {
    if (currentMailbox) {
      navigator.clipboard.writeText(currentMailbox);
      setCopiedAddr(true);
      toast.success("Mailbox copied to clipboard!");
      setTimeout(() => setCopiedAddr(false), 2000);
    }
  };

  const handleSimulateMail = () => {
    if (!currentMailbox) {
      toast.error("Please create a mailbox first.");
      return;
    }
    setIsSimulating(true);
    toast.loading("Polling temporary server for new mail...", { id: "refresh" });
    
    setTimeout(() => {
      simulateIncomingMail(currentMailbox);
      setIsSimulating(false);
      toast.dismiss("refresh");
    }, 1500);
  };

  const handleCreateMailbox = () => {
    const planLimits: { [key: string]: number } = { Basic: 1, Advanced: 5, Pro: 999 };
    const limit = planLimits[user?.plan || "Basic"] || 1;

    if (activeMailboxes.length >= limit) {
      toast.error(`Upgrade plan to create more than ${limit} mailbox(es).`);
      return;
    }
    const newAddr = generateMailbox();
    toast.success(`Mailbox created: ${newAddr}`);
    setMobilePane("list");
  };

  const labelColors: { [key: string]: string } = {
    shopping: "bg-amber-50 text-amber-700 border-amber-100",
    security: "bg-red-50 text-red-700 border-red-100",
    work: "bg-indigo-50 text-indigo-700 border-indigo-100",
    billing: "bg-emerald-50 text-emerald-700 border-emerald-100",
    entertainment: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
    social: "bg-sky-50 text-sky-700 border-sky-100",
    inbox: "bg-slate-50 text-slate-700 border-slate-100",
  };

  return (
    <div className="h-[calc(100vh-140px)] min-h-[500px] flex rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* PANE 1: Mailboxes List (Desktop: Left sidebar, Mobile: Drawer view) */}
      <div
        className={`${
          mobilePane === "mailbox" ? "flex w-full" : "hidden"
        } md:flex w-64 border-r border-gray-100 bg-slate-50/50 flex-col flex-shrink-0`}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">My Mailboxes</h3>
          <button
            onClick={handleCreateMailbox}
            className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            title="Create mailbox"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Mailbox List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {activeMailboxes.map((address) => {
            const isSelected = address === currentMailbox;
            return (
              <button
                key={address}
                onClick={() => {
                  setCurrentMailbox(address);
                  setMobilePane("list");
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    isSelected ? "bg-indigo-600 animate-pulse" : "bg-gray-300"
                  }`}
                />
                <span className="truncate flex-1">{address}</span>
              </button>
            );
          })}
        </div>

        {/* User active mailbox utilities */}
        {currentMailbox && (
          <div className="p-4 border-t border-gray-100 bg-white space-y-2">
            <div className="text-[10px] uppercase font-bold text-gray-400">Current Mailbox</div>
            <div className="text-xs text-gray-700 font-semibold truncate bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
              <span className="truncate flex-1 mr-1">{currentMailbox}</span>
              <button onClick={handleCopy} className="text-gray-400 hover:text-indigo-600">
                {copiedAddr ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <button
              onClick={handleSimulateMail}
              disabled={isSimulating}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-gray-500 ${isSimulating ? "animate-spin" : ""}`} />
              Fetch New Mail
            </button>
          </div>
        )}
      </div>

      {/* PANE 2: Email List (Desktop: Middle column, Mobile: Main list) */}
      <div
        className={`${
          mobilePane === "list" ? "flex w-full" : mobilePane === "mailbox" || mobilePane === "preview" ? "hidden" : ""
        } md:flex flex-col flex-1 border-r border-gray-100 min-w-0`}
      >
        {/* Header with Search and Mobile controls */}
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobilePane("mailbox")}
              className="md:hidden p-2 -ml-2 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 inline mr-1" />
              <span className="text-sm font-semibold">Mailboxes</span>
            </button>
            <h2 className="hidden md:block text-base font-bold text-gray-900">Inbox</h2>
            <div className="flex-1" />
            
            {/* Quick Filter tabs */}
            <div className="inline-flex rounded-lg bg-gray-100 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFilterLabel(null)}
                className={`rounded-md px-2.5 py-1 transition-all ${
                  !filterLabel ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterLabel("starred")}
                className={`rounded-md px-2.5 py-1 transition-all ${
                  filterLabel === "starred" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Starred
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sender, subject, body..."
              className="w-full rounded-xl border border-gray-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
        </div>

        {/* Emails Container */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50 p-2 space-y-1">
          {!currentMailbox ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
              <AlertCircle className="h-8 w-8 mb-2" />
              <p className="text-xs">Select or create a mailbox to view inbox</p>
            </div>
          ) : filteredMails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox className="h-10 w-10 text-gray-300 mb-3" />
              <h4 className="font-bold text-gray-800 text-sm">Inbox is empty</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-[200px] mx-auto">
                No emails match your filter. Click "Fetch New Mail" to simulate messages.
              </p>
            </div>
          ) : (
            filteredMails.map((mail) => {
              const isSelected = selectedMail?.id === mail.id;
              return (
                <div
                  key={mail.id}
                  onClick={() => selectMail(mail)}
                  className={`group flex gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border border-transparent ${
                    isSelected
                      ? "bg-indigo-50/40 border-indigo-100"
                      : "hover:bg-slate-50/60"
                  } ${!mail.read ? "bg-slate-50/30" : ""}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs truncate ${!mail.read ? "font-bold text-gray-900" : "text-gray-600"}`}>
                        {mail.sender}
                      </span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">{mail.date}</span>
                    </div>
                    <h4 className={`text-xs truncate ${!mail.read ? "font-bold text-gray-900" : "text-gray-700"}`}>
                      {mail.subject}
                    </h4>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{mail.preview}</p>
                    
                    {/* Tags */}
                    {mail.labels && mail.labels.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {mail.labels.map(label => (
                          <span
                            key={label}
                            className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              labelColors[label] || "bg-gray-50 text-gray-600 border-gray-100"
                            }`}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions (Hover) */}
                  <div className="flex flex-col justify-between items-end flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(mail.id);
                      }}
                      className="text-gray-300 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`h-4.5 w-4.5 ${
                          mail.starred ? "fill-amber-400 text-amber-400" : ""
                        }`}
                      />
                    </button>
                    {!mail.read && (
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* PANE 3: Mail Preview UI (Desktop: Right pane, Mobile: Full overlay) */}
      <div
        className={`${
          mobilePane === "preview" ? "flex w-full" : "hidden animate-fade-in"
        } lg:flex-[2] md:flex-[1.5] md:flex flex-col bg-white min-w-0`}
      >
        {selectedMail ? (
          <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              {/* Back button on mobile */}
              <button
                onClick={() => {
                  selectMail(null);
                  setMobilePane("list");
                }}
                className="md:hidden flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-4.5 w-4.5" />
                <span>Inbox</span>
              </button>

              <div className="flex-1 md:block hidden" />

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => toggleRead(selectedMail.id)}
                  className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  title={selectedMail.read ? "Mark as Unread" : "Mark as Read"}
                >
                  {selectedMail.read ? <Mail className="h-4.5 w-4.5" /> : <MailOpen className="h-4.5 w-4.5" />}
                </button>
                <button
                  onClick={() => toggleStar(selectedMail.id)}
                  className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  title={selectedMail.starred ? "Unstar Email" : "Star Email"}
                >
                  <Star className={`h-4.5 w-4.5 ${selectedMail.starred ? "fill-amber-400 text-amber-400" : ""}`} />
                </button>
                <button
                  onClick={() => deleteMail(selectedMail.id)}
                  className="rounded-xl border border-red-100 bg-white p-2.5 text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete Email"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Email Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Header Info */}
              <div>
                <h1 className="text-xl font-extrabold text-gray-900 leading-snug">
                  {selectedMail.subject}
                </h1>
                
                {/* Sender card */}
                <div className="mt-4 flex items-center justify-between border-b border-gray-50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold text-sm">
                      {selectedMail.sender.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{selectedMail.sender}</h4>
                      <p className="text-xs text-gray-400">From: {selectedMail.senderEmail}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{selectedMail.date}</span>
                </div>
              </div>

              {/* Message Body */}
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-sans">
                {selectedMail.message}
              </div>

              {/* Attachments Section */}
              {selectedMail.attachments && selectedMail.attachments.length > 0 && (
                <div className="border-t border-gray-100 pt-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <Paperclip className="h-3.5 w-3.5" />
                    <span>Attachments ({selectedMail.attachments.length})</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedMail.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-gray-100 bg-slate-50/50 p-3 flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0">
                          <p className="font-bold text-gray-800 truncate">{file.name}</p>
                          <p className="text-gray-400 scale-90 -ml-1 mt-0.5">{file.size}</p>
                        </div>
                        <button
                          onClick={() => toast.success(`Downloading ${file.name} (mocked)`)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center text-gray-400">
            <MailOpen className="h-12 w-12 mb-3 text-gray-300 animate-float" />
            <h3 className="font-bold text-gray-800 text-sm">No email selected</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-[220px] mx-auto">
              Select any email from the list to preview its contents and manage details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}