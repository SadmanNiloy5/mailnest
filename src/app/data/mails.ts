import { Mail } from "../types/mail";

export const mails: Mail[] = [
  {
    id: 1,
    sender: "Amazon",
    senderEmail: "noreply@amazon.com",
    subject: "Your Order Has Been Shipped! 📦",
    preview: "Your package containing 'Wireless Headphones' has been shipped...",
    message:
      "Hi John,\n\nGreat news! Your package containing 'Wireless Headphones Pro Max' has been shipped and is on its way to you.\n\nTracking Number: AMZ-78234-BD\nEstimated Delivery: June 5, 2026\n\nYou can track your package at any time by visiting your order details page.\n\nThank you for shopping with Amazon!",
    date: "2026-06-01",
    read: false,
    starred: true,
    labels: ["shopping"],
    attachments: [
      { name: "invoice_78234.pdf", size: "245 KB" },
    ],
  },
  {
    id: 2,
    sender: "Facebook",
    senderEmail: "security@facebook.com",
    subject: "Security Alert: New Login Detected",
    preview: "We noticed a new login to your account from Chrome on Windows...",
    message:
      "Hi John,\n\nWe noticed a new login to your Facebook account.\n\nDevice: Chrome on Windows 11\nLocation: Dhaka, Bangladesh\nTime: June 1, 2026, 2:34 PM\n\nIf this was you, you can ignore this message. If you don't recognize this activity, please secure your account immediately.\n\nThe Facebook Security Team",
    date: "2026-05-29",
    read: true,
    starred: false,
    labels: ["security"],
  },
  {
    id: 3,
    sender: "GitHub",
    senderEmail: "notifications@github.com",
    subject: "Pull Request #142 Has Been Merged ✅",
    preview: "Your pull request 'Add dark mode support' has been merged into main...",
    message:
      "Hey @johndoe,\n\nYour pull request #142 'Add dark mode support' has been successfully merged into the main branch.\n\nChanges:\n- Added dark mode toggle component\n- Updated theme context provider\n- Added CSS variables for dark palette\n\n3 files changed, 247 insertions(+), 12 deletions(-)\n\nGreat work! 🎉",
    date: "2026-05-25",
    read: true,
    starred: true,
    labels: ["work"],
  },
  {
    id: 4,
    sender: "Stripe",
    senderEmail: "receipts@stripe.com",
    subject: "Payment Receipt - $29.00",
    preview: "Your payment of $29.00 for MailNest Pro subscription has been processed...",
    message:
      "Payment Confirmation\n\nAmount: $29.00\nPlan: MailNest Pro (Monthly)\nDate: May 20, 2026\nCard: •••• 4242\n\nYour subscription has been renewed successfully. Next billing date: June 20, 2026.\n\nView your billing history at dashboard.mailnest.com/billing\n\nThank you for being a Pro subscriber!",
    date: "2026-05-20",
    read: false,
    starred: false,
    labels: ["billing"],
    attachments: [
      { name: "receipt_may2026.pdf", size: "120 KB" },
    ],
  },
  {
    id: 5,
    sender: "Google",
    senderEmail: "no-reply@accounts.google.com",
    subject: "Your Google Account: 2-Step Verification Update",
    preview: "You recently changed your 2-step verification settings...",
    message:
      "Hi John,\n\nYou recently updated the 2-step verification settings for your Google Account (john@example.com).\n\nChange made: Added a new security key\nTime: May 18, 2026 at 10:15 AM\n\nIf you didn't make this change, someone else might have access to your account. Review your security settings now.\n\nGoogle Accounts Team",
    date: "2026-05-18",
    read: true,
    starred: false,
    labels: ["security"],
  },
  {
    id: 6,
    sender: "Vercel",
    senderEmail: "notifications@vercel.com",
    subject: "Deployment Successful: mailnest-app",
    preview: "Your project mailnest-app has been deployed to production...",
    message:
      "Deployment Complete ✅\n\nProject: mailnest-app\nEnvironment: Production\nURL: https://mailnest-app.vercel.app\nCommit: feat: add mail preview component\nBranch: main\nDuration: 42s\n\nAll checks passed. Your site is live!",
    date: "2026-05-15",
    read: true,
    starred: false,
    labels: ["work"],
  },
  {
    id: 7,
    sender: "Spotify",
    senderEmail: "no-reply@spotify.com",
    subject: "Your Weekly Discovery is Ready 🎵",
    preview: "30 fresh tracks picked just for you based on your listening habits...",
    message:
      "Hey John,\n\nYour Discover Weekly playlist has been updated with 30 fresh tracks!\n\nTop picks this week:\n🎵 Midnight City - M83\n🎵 Blinding Lights - The Weeknd\n🎵 Levitating - Dua Lipa\n\nListen now on Spotify and let us know what you think.\n\nHappy listening! 🎧",
    date: "2026-05-12",
    read: false,
    starred: false,
    labels: ["entertainment"],
  },
  {
    id: 8,
    sender: "LinkedIn",
    senderEmail: "messages@linkedin.com",
    subject: "You Have 5 New Connection Requests",
    preview: "Sarah Chen and 4 others want to connect with you on LinkedIn...",
    message:
      "Hi John,\n\nYou have 5 new connection requests:\n\n1. Sarah Chen - Senior Developer at Google\n2. Mike Johnson - CTO at TechStartup\n3. Priya Sharma - Product Manager at Microsoft\n4. Alex Kim - Full Stack Developer\n5. David Brown - Engineering Manager at Meta\n\nGrow your professional network by accepting these requests.\n\nThe LinkedIn Team",
    date: "2026-05-10",
    read: true,
    starred: false,
    labels: ["social"],
  },
];