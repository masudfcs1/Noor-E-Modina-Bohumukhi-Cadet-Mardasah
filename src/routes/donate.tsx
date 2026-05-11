import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import bkash from "@/assets/bkash-qr.png";
import nagad from "@/assets/nagad-qr.png";
import { Heart, Copy, Check } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "ডোনেট করুন — নূর-ই-মদিনা বহুমুখী মাদ্রাসা" },
      { name: "description", content: "Support Noor-E-Madina Madrasa via bKash, Nagad, or our donation form." },
    ],
  }),
  component: DonatePage,
});

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/REPLACE_WITH_YOUR_FORM_ID/formResponse";
const ENTRY = {
  name: "entry.1111111111",
  email: "entry.2222222222",
  amount: "entry.3333333333",
  trxId: "entry.4444444444",
  message: "entry.5555555555",
};

const PAYMENT_NUMBER = "01794525464";

function PaymentCard({
  brand,
  qr,
  number,
  bgClass,
  delay,
}: {
  brand: string;
  qr: string;
  number: string;
  bgClass: string;
  delay: number;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-2xl border border-primary/20 bg-card p-6 shadow-sm"
    >
      <div className={`inline-block rounded-md px-3 py-1 text-sm font-bold text-white ${bgClass}`}>
        {brand}
      </div>
      <div className="mt-4 grid place-items-center">
        <img src={qr} alt={`${brand} QR`} width={240} height={240} className="rounded-xl border border-border" loading="lazy" />
      </div>
      <div className="mt-4 rounded-lg bg-primary-soft p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground">{brand} Number</p>
            <p className="text-lg font-bold text-primary tracking-wide">{number}</p>
          </div>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DonatePage() {
  const { tr } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const body = new URLSearchParams();
    body.append(ENTRY.name, String(fd.get("name") ?? ""));
    body.append(ENTRY.email, String(fd.get("email") ?? ""));
    body.append(ENTRY.amount, String(fd.get("amount") ?? ""));
    body.append(ENTRY.trxId, String(fd.get("trxId") ?? ""));
    body.append(ENTRY.message, String(fd.get("message") ?? ""));
    try {
      await fetch(GOOGLE_FORM_URL, { method: "POST", mode: "no-cors", body });
    } catch {}
    setSubmitted(true);
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-gradient-to-b from-primary-soft/50 to-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
            <Heart className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary">{tr("donateNow")}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-foreground/80">{tr("donateIntro")}</p>
        </motion.div>

        <h2 className="text-xl font-bold text-primary mb-4 text-center">{tr("scanQr")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          <PaymentCard brand="bKash" qr={bkash} number={PAYMENT_NUMBER} bgClass="bg-[#E2136E]" delay={0.1} />
          <PaymentCard brand="Nagad" qr={nagad} number={PAYMENT_NUMBER} bgClass="bg-[#EC1C24]" delay={0.2} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-primary/20 bg-card p-6 shadow-sm max-w-2xl mx-auto"
        >
          <h2 className="text-xl font-bold text-primary">{tr("donationForm")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{tr("formIntro")}</p>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 rounded-lg bg-primary-soft p-6 text-center"
            >
              <Check className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-2 font-semibold text-primary">{tr("thanks")}</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-sm text-primary underline"
              >
                {tr("submit")} →
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <Field name="name" label={tr("fullName")} required />
              <Field name="email" type="email" label={tr("yourEmail")} />
              <Field name="amount" type="number" label={tr("amount")} required />
              <Field name="trxId" label={tr("trxId")} required />
              <div>
                <label className="text-sm font-medium text-foreground">{tr("message_field")}</label>
                <textarea
                  name="message"
                  rows={3}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 transition"
              >
                {submitting ? "..." : tr("submit")}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}{required && <span className="text-destructive"> *</span>}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
