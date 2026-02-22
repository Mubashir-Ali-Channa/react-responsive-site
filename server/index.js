import "dotenv/config";
import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const app = express();
const port = Number(process.env.PORT) || 8787;
const jwtSecret = process.env.APP_JWT_SECRET || "dev-only-change-me";
const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClient = new OAuth2Client(googleClientId);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const contactStorePath = path.join(dataDir, "contact-submissions.json");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ensureContactStore = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(contactStorePath);
  } catch {
    await fs.writeFile(contactStorePath, "[]", "utf8");
  }
};

const readContacts = async () => {
  await ensureContactStore();
  const raw = await fs.readFile(contactStorePath, "utf8");
  return JSON.parse(raw);
};

const writeContacts = async (records) => {
  await fs.writeFile(contactStorePath, JSON.stringify(records, null, 2), "utf8");
};

const normalizeText = (value) => (value || "").toString().trim();
const getBearerToken = (headerValue) => {
  if (!headerValue || !headerValue.startsWith("Bearer ")) return "";
  return headerValue.slice("Bearer ".length).trim();
};

const getUserFromAuthHeader = (req) => {
  const token = getBearerToken(req.headers.authorization);
  if (!token) return null;
  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    return null;
  }
};

const requireAuth = (req, res, next) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  req.user = user;
  return next();
};

const validateContactPayload = (payload) => {
  const name = normalizeText(payload.name);
  const email = normalizeText(payload.email);
  const topic = normalizeText(payload.topic);
  const message = normalizeText(payload.message);

  if (!name || !email || !topic || !message) {
    return { ok: false, error: "All fields are required." };
  }
  if (!emailPattern.test(email)) {
    return { ok: false, error: "Email format is invalid." };
  }
  if (message.length < 10) {
    return { ok: false, error: "Message should be at least 10 characters." };
  }

  return { ok: true, value: { name, email, topic, message } };
};

const makeFallbackAssistantReply = (message) => {
  const lower = message.toLowerCase();

  if (lower.includes("summary") || lower.includes("summarize")) {
    return "Quick summary: priorities are finalizing scope, resolving UI issues, and preparing release checks.";
  }
  if (lower.includes("email") || lower.includes("draft")) {
    return "Draft: Hi team, this week we completed the planned UI updates, closed key bugs, and aligned on next sprint goals.";
  }
  if (lower.includes("checklist")) {
    return "Release checklist: freeze scope, run test suite, verify responsive layouts, confirm analytics, then deploy and monitor.";
  }
  return "I can help with summaries, status updates, release checklists, and content drafts. Ask with a specific goal.";
};

const fetchOpenAIReply = async (message) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "You are a concise support assistant for a project dashboard. Keep answers practical and short.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const data = await response.json();
  const text = data?.output_text?.trim();
  if (!text) {
    throw new Error("No assistant text returned by OpenAI.");
  }
  return text;
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/google", async (req, res) => {
  const credential = normalizeText(req.body?.credential);
  if (!credential) {
    return res.status(400).json({ ok: false, error: "Google credential is required." });
  }
  if (!googleClientId) {
    return res.status(500).json({ ok: false, error: "GOOGLE_CLIENT_ID is not configured." });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload?.sub || !payload?.email) {
      return res.status(400).json({ ok: false, error: "Invalid Google profile payload." });
    }

    const user = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name || payload.email,
      picture: payload.picture || "",
    };

    const token = jwt.sign(user, jwtSecret, { expiresIn: "7d" });
    return res.json({ ok: true, token, user });
  } catch {
    return res.status(401).json({ ok: false, error: "Google sign-in failed." });
  }
});

app.get("/api/auth/me", (req, res) => {
  const user = getUserFromAuthHeader(req);
  if (!user) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  return res.json({ ok: true, user });
});

app.post("/api/auth/logout", (_req, res) => {
  return res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const validated = validateContactPayload(req.body || {});
    if (!validated.ok) {
      return res.status(400).json({ ok: false, error: validated.error });
    }

    const user = getUserFromAuthHeader(req);
    const record = {
      id: Date.now().toString(36),
      ...validated.value,
      user: user
        ? {
            sub: user.sub,
            email: user.email,
            name: user.name,
          }
        : null,
      createdAt: new Date().toISOString(),
    };

    const contacts = await readContacts();
    contacts.push(record);
    await writeContacts(contacts);

    return res.status(201).json({ ok: true, id: record.id });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Could not save contact submission." });
  }
});

app.post("/api/assistant", async (req, res) => {
  const message = normalizeText(req.body?.message);
  if (!message) {
    return res.status(400).json({ ok: false, error: "Message is required." });
  }

  try {
    let reply;
    try {
      reply = await fetchOpenAIReply(message);
    } catch {
      reply = makeFallbackAssistantReply(message);
    }

    return res.json({ ok: true, reply });
  } catch {
    return res.status(500).json({ ok: false, error: "Assistant request failed." });
  }
});

app.listen(port, async () => {
  await ensureContactStore();
  console.log(`API server running on http://localhost:${port}`);
});
