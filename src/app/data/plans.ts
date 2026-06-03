import { Plan } from "@/types/plan";

export const plans: Plan[] = [
  {
    id: 1,
    name: "Basic",
    price: 5,
    features: [
      "1 Mailbox",
      "100 Emails",
      "Basic Support",
    ],
  },

  {
    id: 2,
    name: "Advanced",
    price: 15,
    features: [
      "5 Mailboxes",
      "1000 Emails",
      "Priority Support",
    ],
  },

  {
    id: 3,
    name: "Pro",
    price: 29,
    features: [
      "Unlimited Mailboxes",
      "Unlimited Emails",
      "Premium Support",
    ],
  },
];