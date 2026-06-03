"use client";

import { currentUser } from "../../data/users";
import toast from "react-hot-toast";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Profile Settings
      </h1>

      <div className="max-w-2xl rounded-xl bg-white p-8 shadow">

        <div className="space-y-5">

          <input
            defaultValue={currentUser.name}
            className="w-full rounded-lg border p-3"
          />

          <input
            defaultValue={currentUser.email}
            className="w-full rounded-lg border p-3"
          />

          <input
            defaultValue={currentUser.phone}
            className="w-full rounded-lg border p-3"
          />

          <button
            onClick={() =>
              toast.success("Profile Updated")
            }
            className="rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}