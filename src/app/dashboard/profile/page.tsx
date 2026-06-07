"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMail } from "../../context/MailContext";
import { User as UserIcon, Phone, Mail, ShieldAlert, Key, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { deleteMailbox, activeMailboxes } = useMail();

  // Profile fields state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Name and Email are required");
      return;
    }

    setIsSavingProfile(true);
    // Simulate delay
    setTimeout(() => {
      updateProfile({ name, email, phone });
      setIsSavingProfile(false);
      toast.success("Profile details saved successfully!");
    }, 1000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully!");
    }, 1200);
  };

  const handleResetMailboxes = () => {
    if (activeMailboxes.length === 0) {
      toast.error("You don't have any active mailboxes to reset.");
      return;
    }
    const confirm = window.confirm("Are you sure you want to delete all active mailboxes and clear their emails? This action cannot be undone.");
    if (confirm) {
      // Create a shallow copy of activeMailboxes and delete them one by one
      const list = [...activeMailboxes];
      list.forEach((addr) => deleteMailbox(addr));
      toast.success("All mailboxes and emails have been reset.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
          Profile Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Update your profile details, reset password, and manage workspace parameters.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left/Middle Columns: Details and Password Forms (2/3 width) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Card 1: Account Details */}
          <form onSubmit={handleSaveProfile} className="rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
              <UserIcon className="h-5 w-5 text-indigo-500" />
              Personal Details
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <UserIcon className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Mail className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Phone className="h-4.5 w-4.5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSavingProfile}
                className="btn-primary flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold disabled:opacity-75"
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4.5 w-4.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Card 2: Password Change */}
          <form onSubmit={handleChangePassword} className="rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
              <Key className="h-5 w-5 text-indigo-500" />
              Security credentials
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 chars"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Min. 6 chars"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 px-4 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="btn-primary flex items-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold disabled:opacity-75"
              >
                {isChangingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating credentials...
                  </>
                ) : (
                  <span>Update Password</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Sidebar summaries & Danger Zones (1/3 width) */}
        <div className="space-y-8">
          {/* Card 3: Account Info Summary */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold text-3xl shadow-xl shadow-indigo-500/10">
              {user?.name?.charAt(0) || "U"}
            </div>
            
            <h3 className="mt-4 font-bold text-gray-900 text-lg">{user?.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
            
            <div className="mt-6 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {user?.plan} Subscriber
            </div>

            <div className="mt-6 border-t border-gray-50 pt-5 text-left text-xs space-y-3 text-gray-500">
              <div className="flex justify-between">
                <span>Account Created:</span>
                <span className="font-bold text-gray-700">{user?.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Mailboxes:</span>
                <span className="font-bold text-gray-700">{activeMailboxes.length} active</span>
              </div>
            </div>
          </div>

          {/* Card 4: Danger Zone */}
          <div className="rounded-3xl border border-red-100 bg-red-50/20 p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-red-600 flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-red-500" />
              Danger Zone
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              These actions are destructive and cannot be undone. Please be careful.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleResetMailboxes}
                className="w-full rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-600 py-3 text-xs font-bold transition-all text-center"
              >
                Reset All Mailboxes
              </button>
              <button
                onClick={() => toast.error("Account closure is disabled in mock demonstration.")}
                className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white py-3 text-xs font-bold transition-all text-center shadow-lg shadow-red-600/10"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}