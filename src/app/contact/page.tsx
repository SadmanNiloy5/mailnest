"use client";

import toast from "react-hot-toast";


export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Contact Us
      </h1>

      <form className="space-y-6 rounded-xl border p-8">

        <div>
          <label className="mb-2 block font-medium">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Message
          </label>

          <textarea
            rows={5}
            placeholder="Write your message"
            className="w-full rounded-lg border p-3"
          />
        </div>
<button
  type="button"
  onClick={() =>
    toast.success("Message Sent Successfully")
  }
  className="rounded-lg bg-blue-600 px-6 py-3 text-white"
>
  Send Message
</button>

      </form>
    </div>
  );
}