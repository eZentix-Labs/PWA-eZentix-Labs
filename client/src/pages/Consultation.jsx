import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

const EMPTY = {
  name: "",
  businessName: "",
  businessType: "",
  phone: "",
  date: "",
  time: "",
  notes: ""
};

function prettyDate(key) {
  const d = new Date(`${key}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function prettyTime(t) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export default function Consultation() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");

  const [form, setForm] = useState(() =>
    plan ? { ...EMPTY, notes: `Interested in the ${plan} plan.` } : EMPTY
  );
  const [slots, setSlots] = useState({ dates: [], businessTypes: [] });
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/consultations/slots`)
      .then((r) => r.json())
      .then(setSlots)
      .catch(() => setError("Could not load available dates. Please refresh."));
  }, []);

  const set = (field) => (e) => {
    const value = e.target.value;
    // changing the date clears a time that may not exist on the new date
    setForm((f) => (field === "date" ? { ...f, date: value, time: "" } : { ...f, [field]: value }));
  };

  const timesForDate = slots.dates.find((d) => d.date === form.date)?.times || [];

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <main className="page page--scroll">
        <div className="container container--form">
          <Header />
          <section className="form-card form-card--done">
            <h2 className="form-title">You're booked in</h2>
            <p className="form-subtitle">
              We have your details and will call you back on {prettyDate(form.date)} at{" "}
              {prettyTime(form.time)}.
            </p>
            <Link className="back-link" to="/">← Back to home</Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page page--scroll">
      <div className="container container--form">
        <Header />
        <form className="form-card" onSubmit={onSubmit}>
          {plan && <span className="plan-chip plan-chip--inline">{plan} plan</span>}
          <h2 className="form-title">Start the conversation</h2>
          <p className="form-subtitle">Fill this in and we will call you back. It takes a minute.</p>
          <hr className="form-rule" />

          <div className="form-grid">
            <label className="field">
              <span className="field-label">Your name <span className="req">*</span></span>
              <input value={form.name} onChange={set("name")} required maxLength={80} />
            </label>

            <label className="field">
              <span className="field-label">Business name <span className="req">*</span></span>
              <input value={form.businessName} onChange={set("businessName")} required maxLength={80} />
            </label>

            <label className="field">
              <span className="field-label">What kind of business <span className="req">*</span></span>
              <select value={form.businessType} onChange={set("businessType")} required>
                <option value="">—</option>
                {slots.businessTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">Phone or WhatsApp number <span className="req">*</span></span>
              <input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                required
                inputMode="tel"
                maxLength={20}
              />
            </label>

            <label className="field">
              <span className="field-label">Pick a date <span className="req">*</span></span>
              <select value={form.date} onChange={set("date")} required>
                <option value="">—</option>
                {slots.dates.map((d) => (
                  <option key={d.date} value={d.date}>{prettyDate(d.date)}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="field-label">Pick a time <span className="req">*</span></span>
              <select value={form.time} onChange={set("time")} required disabled={!form.date}>
                <option value="">{form.date ? "—" : "Pick a date first"}</option>
                {timesForDate.map((t) => (
                  <option key={t} value={t}>{prettyTime(t)}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="field field--full">
            <span className="field-label">
              What is the biggest thing slowing you down right now?{" "}
              <span className="field-optional">· optional</span>
            </span>
            <textarea rows={4} value={form.notes} onChange={set("notes")} maxLength={600} />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="submit-button" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send it over"}
          </button>

          <p className="form-note">We use your details only to get back to you. No lists, no spam.</p>
          <Link className="back-link" to="/">← Back</Link>
        </form>
      </div>
    </main>
  );
}
