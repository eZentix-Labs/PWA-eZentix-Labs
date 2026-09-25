import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { plans } from "../data/plans.js";

function formatINR(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function Pricing() {
  const [cycle, setCycle] = useState("monthly"); // monthly | yearly

  return (
    <main className="page page--scroll">
      <div className="container container--pricing">
        <Header />
        <section className="content content--pricing">
          <div className="plan-toggle" role="tablist" aria-label="Billing cycle">
            <button
              type="button"
              role="tab"
              aria-selected={cycle === "monthly"}
              className={cycle === "monthly" ? "active" : ""}
              onClick={() => setCycle("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={cycle === "yearly"}
              className={cycle === "yearly" ? "active" : ""}
              onClick={() => setCycle("yearly")}
            >
              Yearly
            </button>
          </div>
          <p className="plan-save-note">
            {cycle === "yearly" && <span className="plan-save-check">✓</span>}
            Pay yearly and two months are on us.
          </p>

          <div className="plan-grid">
            {plans.map((plan) => {
              const price = cycle === "monthly" ? plan.monthly : plan.yearly;
              const perMonthWhenYearly = Math.round(plan.yearly / 12);

              return (
                <article key={plan.id} className={`plan-card${plan.featured ? " plan-card--featured" : ""}`}>
                  {plan.badge && <span className="plan-badge">{plan.badge}</span>}

                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>

                  <p className="plan-price">
                    <span className="amount">{formatINR(price)}</span>
                    <span className="period">/{cycle === "monthly" ? "month" : "year"}</span>
                  </p>
                  {cycle === "yearly" && (
                    <p className="plan-billed-note">{formatINR(perMonthWhenYearly)}/month, billed yearly</p>
                  )}

                  <span className="plan-chip">{plan.chip}</span>

                  <div className="plan-stats">
                    {plan.stats.map((s) => (
                      <div className="plan-stat" key={s.label}>
                        <span className="plan-stat-label">{s.label}</span>
                        <span className="plan-stat-value">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <ul className="plan-features">
                    {plan.included.map((f) => (
                      <li key={f}>
                        <span className="tick">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.excluded.length > 0 && (
                    <>
                      <p className="plan-excluded-title">Not in this plan</p>
                      <ul className="plan-excluded">
                        {plan.excluded.map((f) => (
                          <li key={f}>
                            <span className="cross">✕</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Link
                    className={`plan-cta ${plan.featured ? "plan-cta--filled" : "plan-cta--outline"}`}
                    to={`/consultation?plan=${encodeURIComponent(plan.name)}`}
                  >
                    {plan.cta}
                  </Link>
                </article>
              );
            })}
          </div>

          <Link className="back-link" to="/">← Back</Link>
        </section>
      </div>
    </main>
  );
}
