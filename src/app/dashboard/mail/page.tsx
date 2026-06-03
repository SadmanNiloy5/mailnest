import { mails } from "@/data/mails";

export default function MailPage() {
  return (
    <div>

      <h1 className="mb-8 text-4xl font-bold">
        My Mail
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">

        {mails.map((mail) => (
          <div
            key={mail.id}
            className="rounded-xl bg-white p-6 shadow"
          >

            <div className="mb-4">

              <p className="font-bold">
                From: {mail.sender}
              </p>

              <p className="text-sm text-gray-500">
                {mail.date}
              </p>

            </div>

            <h3 className="text-xl font-semibold">
              {mail.subject}
            </h3>

            <p className="mt-4 text-gray-600">
              {mail.message}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}