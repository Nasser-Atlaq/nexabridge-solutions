"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { CONTACT_INFO, CONTACT_FORM_SERVICES } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimateInView } from "@/components/ui/AnimateInView";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const NEXT_STEPS = [
  {
    step: "01",
    title: "We Review Your Request",
    description:
      "Our team reviews your message and assigns the right specialist to your project.",
  },
  {
    step: "02",
    title: "Discovery Call",
    description:
      "We schedule a free 30-minute call to discuss your goals, timeline, and technical requirements.",
  },
  {
    step: "03",
    title: "Proposal & Roadmap",
    description:
      "You receive a detailed proposal with scope, timeline, and transparent pricing within 48 hours.",
  },
];

export function ContactPageContent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputBase =
    "w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 py-3.5 text-base text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20";

  return (
    <div className="pt-28">
      <SectionWrapper>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="cyan">Contact Us</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            Let&apos;s Start a{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Have a project in mind? Need a technology partner? Tell us about your
            goals and we&apos;ll map out the best path forward.
          </p>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper>
        <AnimateInView
          variants={staggerContainer}
          className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-2"
        >
          {/* Form — left */}
          <motion.div variants={staggerItem}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-8 sm:p-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10">
                  <CheckCircle size={32} className="text-cyan-400" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-zinc-50">
                  Message Sent Successfully
                </h3>
                <p className="mt-2 max-w-sm text-sm text-zinc-400">
                  Thank you for reaching out! Our team will review your message and
                  get back to you within 24 hours.
                </p>
                <button
                  className="mt-6 cursor-pointer text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", company: "", service: "", message: "" });
                  }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={errors.name ? true : undefined}
                      className={cn(inputBase, errors.name && "border-red-500/40")}
                    />
                    {errors.name && <p id="name-error" role="alert" aria-live="assertive" className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={errors.email ? true : undefined}
                      className={cn(inputBase, errors.email && "border-red-500/40")}
                    />
                    {errors.email && <p id="email-error" role="alert" aria-live="assertive" className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={cn(inputBase, "cursor-pointer appearance-none")}
                    >
                      <option value="">Select a service</option>
                      {CONTACT_FORM_SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={errors.message ? true : undefined}
                    className={cn(inputBase, "resize-none", errors.message && "border-red-500/40")}
                  />
                  {errors.message && <p id="message-error" role="alert" aria-live="assertive" className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>

                <div className="mt-6">
                  <MagneticButton variant="amber" type="submit">
                    Send Message
                    <Send size={15} />
                  </MagneticButton>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right side — contact info + visual */}
          <motion.div variants={staggerItem} className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8">
              <h3 className="text-base font-bold text-zinc-50">
                Get in Touch Directly
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-xs text-zinc-400">Email</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm text-zinc-300 transition-colors hover:text-white"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-xs text-zinc-400">Phone</p>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`}
                      className="text-sm text-zinc-300 transition-colors hover:text-white"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-xs text-zinc-400">Office</p>
                    <p className="text-sm text-zinc-300">{CONTACT_INFO.address}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8">
              <h3 className="text-base font-bold text-zinc-50">
                What Happens Next?
              </h3>
              <ol className="mt-5 flex flex-col gap-5">
                {NEXT_STEPS.map((step) => (
                  <li key={step.step} className="flex gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-xs font-bold text-cyan-400"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {step.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{step.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Decorative glow */}
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] to-blue-500/[0.04]" />
              <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[60px]" />
              <div className="relative text-center">
                <p className="text-lg font-bold text-zinc-200">
                  Response within <span className="text-cyan-400">24 hours</span>
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  We value your time and respond promptly.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimateInView>
      </SectionWrapper>
    </div>
  );
}
