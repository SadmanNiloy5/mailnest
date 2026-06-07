export interface Mail {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  message: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  recipient?: string;
  labels: string[];
  attachments?: { name: string; size: string }[];
}