import { Mail } from "@/types/mail";

export const mails: Mail[] = [
  {
    id: 1,
    sender: "Amazon",
    subject: "Order Shipped",
    message:
      "Your package has been shipped successfully.",
    date: "2026-06-01",
  },

  {
    id: 2,
    sender: "Facebook",
    subject: "Security Alert",
    message:
      "New login detected on your account.",
    date: "2026-05-29",
  },

  {
    id: 3,
    sender: "GitHub",
    subject: "Pull Request Merged",
    message:
      "Your pull request has been merged.",
    date: "2026-05-25",
  },
];