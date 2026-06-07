"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setLoading(false);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@mailnest.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Address", value: "San Francisco, CA 94105" },
    { icon: Clock, label: "Hours", value: "Mon-Fri, 9AM - 6PM PST" },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-subtle pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100">
            Get in Touch
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-6xl">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500">
            Have a question or need help? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 card-hover"
              >
                <div className="flex-shrink-0 rounded-xl bg-indigo-50 p-3">
                  <info.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {info.label}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 md:p-10">
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`input-field ${
                        errors.name ? "border-red-400" : ""
                      }`}
                      id="contact-name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`input-field ${
                        errors.email ? "border-red-400" : ""
                      }`}
                      id="contact-email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="input-field"
                    id="contact-subject"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us more about your question..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`input-field resize-none ${
                      errors.message ? "border-red-400" : ""
                    }`}
                    id="contact-message"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm disabled:opacity-60"
                  id="contact-submit"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}