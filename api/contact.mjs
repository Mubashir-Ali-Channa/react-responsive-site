const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeText = (value) => (value || "").toString().trim();

const validateContactPayload = (payload) => {
  const name = normalizeText(payload?.name);
  const email = normalizeText(payload?.email);
  const topic = normalizeText(payload?.topic);
  const message = normalizeText(payload?.message);

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

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method Not Allowed." });
    }

    const validated = validateContactPayload(req.body || {});
    if (!validated.ok) {
      return res.status(400).json({ ok: false, error: validated.error });
    }

    const id = Date.now().toString(36);
    return res.status(201).json({ ok: true, id });
  } catch {
    return res.status(500).json({ ok: false, error: "Could not handle contact request." });
  }
}
