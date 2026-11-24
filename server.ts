import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(__dirname, "data");
const QUOTES_FILE = path.join(DATA_DIR, "quotes.json");
const RECIPIENT_EMAIL = process.env.QUOTE_RECIPIENT_EMAIL || "paul@paulroofs.com";

interface QuoteRecord {
  id: string;
  urgency: "standard" | "emergency";
  projectType: string;
  roofType: string;
  description: string;
  name: string;
  phone: string;
  email: string;
  town: string;
  emailDispatched: boolean;
  createdAt: string;
}

function readQuotes(): QuoteRecord[] {
  try {
    if (!fs.existsSync(QUOTES_FILE)) return [];
    const raw = fs.readFileSync(QUOTES_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeQuote(record: QuoteRecord): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const existing = readQuotes();
  existing.unshift(record);
  fs.writeFileSync(QUOTES_FILE, JSON.stringify(existing.slice(0, 500), null, 2), "utf8");
}

function cleanField(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

async function dispatchToEmail(record: QuoteRecord): Promise<boolean> {
  const prefix = record.urgency === "emergency" ? "[URGENT 24/7 EMERGENCY]" : "[Quote Request]";
  const subject = `${prefix} ${record.projectType} (${record.roofType}) — ${record.name}${
    record.town ? ` in ${record.town}` : ""
  } [${record.id}]`;

  const textBody = [
    `Reference: ${record.id}`,
    `Urgency: ${record.urgency === "emergency" ? "24/7 Emergency Leak / Urgent" : "Standard Quote / Inspection"}`,
    `Name: ${record.name}`,
    `Phone: ${record.phone}`,
    `Email: ${record.email || "Not provided"}`,
    `Town: ${record.town || "Not provided"}`,
    `Project Type: ${record.projectType}`,
    `Roof Type: ${record.roofType}`,
    "",
    "Job Details:",
    record.description || "No additional details provided.",
    "",
    `Submitted: ${record.createdAt}`,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "Paul's Roofing Website <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        reply_to: record.email || undefined,
        subject,
        text: textBody,
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend HTTP ${res.status}`);
    }
    return true;
  }

  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (web3formsKey) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject,
        from_name: record.name,
        email: record.email || RECIPIENT_EMAIL,
        replyto: record.email || undefined,
        to: RECIPIENT_EMAIL,
        message: textBody,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.success) {
      throw new Error(`Web3Forms error: ${data?.message || res.status}`);
    }
    return true;
  }

  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT?.trim();
  if (formspreeEndpoint) {
    const res = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: record.email || undefined,
        referenceId: record.id,
        urgency: record.urgency,
        name: record.name,
        phone: record.phone,
        email: record.email,
        town: record.town,
        projectType: record.projectType,
        roofType: record.roofType,
        description: record.description,
      }),
    });
    if (!res.ok) {
      throw new Error(`Formspree HTTP ${res.status}`);
    }
    return true;
  }

  return false;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "32kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "pauls-roofing", recipient: RECIPIENT_EMAIL });
  });

  app.post("/api/quotes", async (req, res) => {
    const body = req.body ?? {};
    const urgency = body.urgency === "emergency" ? "emergency" : "standard";
    const projectType = cleanField(body.projectType, 60);
    const roofType = cleanField(body.roofType, 40);
    const description = cleanField(body.description, 2000);
    const name = cleanField(body.name, 120);
    const phone = cleanField(body.phone, 40);
    const email = cleanField(body.email, 160);
    const town = cleanField(body.town, 80);

    const missing: string[] = [];
    if (!projectType) missing.push("a project type");
    if (!roofType) missing.push("a roof type");
    if (!name) missing.push("your name");
    if (!phone) missing.push("your phone number");

    if (missing.length > 0) {
      res.status(400).json({
        ok: false,
        error: `Please add ${missing.join(", ")} so Paul can quote the job and call you back.`,
      });
      return;
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      res.status(400).json({
        ok: false,
        error: "Please enter a valid 7- to 10-digit phone number so we can reach you.",
      });
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({
        ok: false,
        error: "Please enter a valid email address or leave the email field blank.",
      });
      return;
    }

    const id = `PR-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const record: QuoteRecord = {
      id,
      urgency,
      projectType,
      roofType,
      description,
      name,
      phone,
      email,
      town,
      emailDispatched: false,
      createdAt: new Date().toISOString(),
    };

    try {
      record.emailDispatched = await dispatchToEmail(record);
    } catch (err) {
      console.error("Form-to-email dispatch failed:", err);
      // Still persist the quote locally so no homeowner lead is lost
    }

    try {
      writeQuote(record);
    } catch (err) {
      console.error("Failed to save quote:", err);
      res.status(500).json({
        ok: false,
        error: `Unable to save your request right now. Please call (506) 271-4162 or email ${RECIPIENT_EMAIL} directly.`,
      });
      return;
    }

    const responseMsg =
      urgency === "emergency"
        ? `Urgent request ${id} logged for ${name}. For an active leak right now, please also call (506) 271-4162 — Paul answers 24/7.`
        : record.emailDispatched
        ? `Quote request ${id} sent to ${RECIPIENT_EMAIL} for ${name}. Paul will follow up during business hours (Mon–Fri 6 a.m.–7 p.m.).`
        : `Quote request ${id} saved for ${name}. You can also tap "Email copy to Paul" below or call (506) 271-4162 anytime.`;

    res.status(201).json({
      ok: true,
      referenceId: id,
      emailDispatched: record.emailDispatched,
      recipient: RECIPIENT_EMAIL,
      message: responseMsg,
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Paul's Roofing server running on http://localhost:${PORT}`);
  });
}

startServer();
