const normalizeText = (value) => (value || "").toString().trim();

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

async function fetchOpenAIReply(message) {
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
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method Not Allowed." });
    }

    const message = normalizeText(req.body?.message);
    if (!message) {
      return res.status(400).json({ ok: false, error: "Message is required." });
    }

    let reply;
    try {
      reply = await fetchOpenAIReply(message);
    } catch {
      reply = makeFallbackAssistantReply(message);
    }
    return res.status(200).json({ ok: true, reply });
  } catch {
    return res.status(500).json({ ok: false, error: "Assistant request failed." });
  }
}
