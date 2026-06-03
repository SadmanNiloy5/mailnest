import { mails } from "@/data/mails";

export default function MailPage() {
  return (
    <div>

      <h1 className="mb-8 text-4xl font-bold">
        My Mail
      </h1>

      <div className="space-y-4">

        {mails.map((mail) => (
          <div
            key={mail.id}
            className="rounded-xl bg-white p-6 shadow"
          >
            <h3 className="font-bold">
              {mail.sender}
            </h3>

            <p className="mt-2">
              {mail.subject}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {mail.date}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}