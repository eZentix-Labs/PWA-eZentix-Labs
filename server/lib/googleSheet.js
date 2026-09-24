import { google } from "googleapis";

const HEADERS = [
  "Booked At",
  "Name",
  "Business Name",
  "Business Type",
  "Phone / WhatsApp",
  "Consultation Date",
  "Consultation Time",
  "Biggest Challenge"
];

function getClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !key || !process.env.GOOGLE_SHEET_ID) return null;

  const auth = new google.auth.JWT({
    email,
    // .env stores the key with literal \n escapes
    key: key.replace(/\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  return google.sheets({ version: "v4", auth });
}

export function sheetUrl() {
  const id = process.env.GOOGLE_SHEET_ID;
  return id ? `https://docs.google.com/spreadsheets/d/${id}` : "";
}

// Make sure row 1 holds our headers (runs once on an empty sheet).
async function ensureHeaders(sheets, spreadsheetId, tab) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!A1:H1`
  });
  if (!res.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tab}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] }
    });
  }
}

export async function appendBooking(booking) {
  const sheets = getClient();
  if (!sheets) throw new Error("Google Sheets is not configured");

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const tab = process.env.GOOGLE_SHEET_TAB || "Bookings";

  await ensureHeaders(sheets, spreadsheetId, tab);
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        booking.name,
        booking.businessName,
        booking.businessType,
        booking.phone,
        booking.date,
        booking.time,
        booking.notes || ""
      ]]
    }
  });
}
