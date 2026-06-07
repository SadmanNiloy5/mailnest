"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Mail } from "../types/mail";
import { mails as initialMails } from "../data/mails";
import toast from "react-hot-toast";

interface MailContextType {
  mails: Mail[];
  activeMailboxes: string[];
  currentMailbox: string | null;
  selectedMail: Mail | null;
  selectMail: (mail: Mail | null) => void;
  toggleRead: (id: number) => void;
  toggleStar: (id: number) => void;
  deleteMail: (id: number) => void;
  markAllRead: () => void;
  unreadCount: number;
  starredCount: number;
  filterLabel: string | null;
  setFilterLabel: (label: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredMails: Mail[];
  generateMailbox: () => string;
  deleteMailbox: (address: string) => void;
  setCurrentMailbox: (address: string | null) => void;
  simulateIncomingMail: (address: string) => void;
}

const MailContext = createContext<MailContextType | undefined>(undefined);

const DEFAULT_MAILBOXES = ["john_doe@mailnest.com", "dev_testing@mailnest.com"];

export function MailProvider({ children }: { children: React.ReactNode }) {
  const [activeMailboxes, setActiveMailboxes] = useState<string[]>([]);
  const [currentMailbox, setCurrentMailboxState] = useState<string | null>(null);
  const [mails, setMails] = useState<Mail[]>([]);
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [filterLabel, setFilterLabel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load from localStorage or defaults
  useEffect(() => {
    const savedMailboxes = localStorage.getItem("mailnest_mailboxes");
    const parsedMailboxes = savedMailboxes ? JSON.parse(savedMailboxes) : DEFAULT_MAILBOXES;
    setActiveMailboxes(parsedMailboxes);
    setCurrentMailboxState(parsedMailboxes[0] || null);

    const savedMails = localStorage.getItem("mailnest_mails");
    if (savedMails) {
      try {
        setMails(JSON.parse(savedMails));
      } catch {
        // Fallback: assign initial mails to the default mailbox
        const processed = initialMails.map(m => ({
          ...m,
          recipient: m.recipient || DEFAULT_MAILBOXES[0]
        }));
        setMails(processed);
      }
    } else {
      const processed = initialMails.map(m => ({
        ...m,
        recipient: m.recipient || DEFAULT_MAILBOXES[0]
      }));
      setMails(processed);
      localStorage.setItem("mailnest_mails", JSON.stringify(processed));
    }
  }, []);

  const saveMailsToLocalStorage = (updatedMails: Mail[]) => {
    localStorage.setItem("mailnest_mails", JSON.stringify(updatedMails));
  };

  const selectMail = useCallback((mail: Mail | null) => {
    setSelectedMail(mail);
    if (mail && !mail.read) {
      setMails((prev) => {
        const updated = prev.map((m) => (m.id === mail.id ? { ...m, read: true } : m));
        saveMailsToLocalStorage(updated);
        return updated;
      });
    }
  }, []);

  const toggleRead = useCallback((id: number) => {
    setMails((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m));
      saveMailsToLocalStorage(updated);
      return updated;
    });
  }, []);

  const toggleStar = useCallback((id: number) => {
    setMails((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m));
      saveMailsToLocalStorage(updated);
      return updated;
    });
    setSelectedMail((prev) =>
      prev && prev.id === id ? { ...prev, starred: !prev.starred } : prev
    );
  }, []);

  const deleteMail = useCallback((id: number) => {
    setMails((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      saveMailsToLocalStorage(updated);
      return updated;
    });
    setSelectedMail((prev) => (prev && prev.id === id ? null : prev));
  }, []);

  const markAllRead = useCallback(() => {
    setMails((prev) => {
      const updated = prev.map((m) => ({ ...m, read: true }));
      saveMailsToLocalStorage(updated);
      return updated;
    });
  }, []);

  const generateMailbox = useCallback(() => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randStr = "";
    for (let i = 0; i < 8; i++) {
      randStr += chars[Math.floor(Math.random() * chars.length)];
    }
    const newAddress = `temp_${randStr}@mailnest.com`;
    
    setActiveMailboxes((prev) => {
      const updated = [...prev, newAddress];
      localStorage.setItem("mailnest_mailboxes", JSON.stringify(updated));
      return updated;
    });
    setCurrentMailboxState(newAddress);
    return newAddress;
  }, []);

  const deleteMailbox = useCallback((address: string) => {
    setActiveMailboxes((prev) => {
      const updated = prev.filter((a) => a !== address);
      localStorage.setItem("mailnest_mailboxes", JSON.stringify(updated));
      
      // If we deleted the current mailbox, switch to another
      if (currentMailbox === address) {
        setCurrentMailboxState(updated[0] || null);
      }
      return updated;
    });

    // Also delete mails associated with this mailbox (optional, let's keep them in history or clean them)
    setMails((prev) => {
      const updated = prev.filter((m) => m.recipient !== address);
      saveMailsToLocalStorage(updated);
      return updated;
    });
    setSelectedMail(null);
    toast.success(`Mailbox ${address} deleted`);
  }, [currentMailbox]);

  const setCurrentMailbox = useCallback((address: string | null) => {
    setCurrentMailboxState(address);
    setSelectedMail(null);
  }, []);

  // Simulator for receiving random dummy emails
  const simulateIncomingMail = useCallback((mailboxAddress: string) => {
    const senders = [
      { name: "Netflix", email: "info@netflix.com", subjects: ["New Show Released: Season 3 Out Now! 🍿", "Your Netflix receipt", "Finish setting up your account"] },
      { name: "Slack", email: "no-reply@slack.com", subjects: ["New message from workspace owner", "Weekly Slack Analytics", "Verify your Slack email"] },
      { name: "Dribbble", email: "hello@dribbble.com", subjects: ["Weekly design inspiration 🎨", "Sarah liked your shot!", "Trending designs this week"] },
      { name: "Zoom", email: "meetings@zoom.us", subjects: ["Upcoming meeting scheduled", "Zoom App Update Available", "Recording is now ready"] },
      { name: "GitHub", email: "notifications@github.com", subjects: ["Security Alert: update dependency", "Starred repository update", "Someone replied to your comment"] }
    ];

    const randomSender = senders[Math.floor(Math.random() * senders.length)];
    const randomSubject = randomSender.subjects[Math.floor(Math.random() * randomSender.subjects.length)];
    
    const newMail: Mail = {
      id: Date.now(),
      sender: randomSender.name,
      senderEmail: randomSender.email,
      subject: randomSubject,
      preview: `Hello from ${randomSender.name}! Here is a quick update regarding your account.`,
      message: `Hi there,\n\nThis is a mock email simulated live in MailNest.\n\nSender: ${randomSender.name} (${randomSender.email})\nRecipient: ${mailboxAddress}\nSubject: ${randomSubject}\n\nThis email has been generated in real-time to demonstrate the incoming mail capabilities of the MailNest temporary mailbox client.\n\nBest regards,\nThe MailNest Team`,
      date: new Date().toISOString().split("T")[0],
      read: false,
      starred: false,
      recipient: mailboxAddress,
      labels: ["inbox"]
    };

    setMails((prev) => {
      const updated = [newMail, ...prev];
      saveMailsToLocalStorage(updated);
      return updated;
    });

    toast.success(`New mail received on ${mailboxAddress}!`);
  }, []);

  const unreadCount = mails.filter((m) => !m.read && m.recipient === currentMailbox).length;
  const starredCount = mails.filter((m) => m.starred && m.recipient === currentMailbox).length;

  const filteredMails = mails.filter((mail) => {
    const matchesMailbox = mail.recipient === currentMailbox;
    const matchesLabel = !filterLabel || mail.labels.includes(filterLabel) || (filterLabel === "starred" && mail.starred);
    const matchesSearch =
      !searchQuery ||
      mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMailbox && matchesLabel && matchesSearch;
  });

  return (
    <MailContext.Provider
      value={{
        mails,
        activeMailboxes,
        currentMailbox,
        selectedMail,
        selectMail,
        toggleRead,
        toggleStar,
        deleteMail,
        markAllRead,
        unreadCount,
        starredCount,
        filterLabel,
        setFilterLabel,
        searchQuery,
        setSearchQuery,
        filteredMails,
        generateMailbox,
        deleteMailbox,
        setCurrentMailbox,
        simulateIncomingMail,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}

export function useMail() {
  const context = useContext(MailContext);
  if (context === undefined) {
    throw new Error("useMail must be used within a MailProvider");
  }
  return context;
}
