// Consultation availability — "fixed by us".
// Edit this file to change which dates and times visitors may pick.
export const slotConfig = {
  // 0 = Sunday … 6 = Saturday. Only these weekdays are offered.
  weekdays: [1, 2, 3, 4, 5],
  // Times offered on each available day, 24h "HH:mm".
  times: ["10:00", "11:30", "14:00", "15:30", "17:00"],
  // How far ahead the calendar runs, and how soon the earliest slot may be.
  daysAhead: 14,
  leadTimeDays: 1,
  // How many dates the visitor is offered at once (2–4).
  maxDates: 4,
  // Specific dates to block out, e.g. holidays: "2026-10-02"
  blockedDates: []
};

const pad = (n) => String(n).padStart(2, "0");
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Build the list of selectable dates from the config above.
export function availableDates(from = new Date()) {
  const dates = [];
  for (let i = slotConfig.leadTimeDays; i <= slotConfig.daysAhead; i++) {
    const d = new Date(from);
    d.setDate(d.getDate() + i);
    const key = toKey(d);
    if (!slotConfig.weekdays.includes(d.getDay())) continue;
    if (slotConfig.blockedDates.includes(key)) continue;
    dates.push(key);
  }
  return dates;
}

export function isValidSlot(date, time) {
  return availableDates().includes(date) && slotConfig.times.includes(time);
}
