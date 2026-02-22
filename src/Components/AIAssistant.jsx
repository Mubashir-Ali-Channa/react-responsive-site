import { useState } from "react";
import { apiRequest } from "../lib/api";

const quickPrompts = [
  "Summarize this week's updates.",
  "Help me draft a project status email.",
  "Suggest 3 improvements for our landing page.",
];

const AIAssistant = () => {
  const [input, setInput] = useState("Can you create a release checklist?");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I can help with planning, writing, and quick summaries.",
    },
  ]);

  const askAssistant = async (messageText) => {
    const text = messageText.trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setStatus("");
    setIsLoading(true);

    try {
      const data = await apiRequest("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      setInput("");
    } catch (error) {
      setStatus(error.message || "Assistant request failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await askAssistant(input);
  };

  return (
    <section className="assistant-section" id="support">
      <p className="eyebrow">Support</p>
      <h2>AI assistant support</h2>
      <p className="assistant-copy">
        Ask questions and get responses from the backend assistant API.
      </p>

      <div className="assistant-chat">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`assistant-message ${
              message.role === "assistant"
                ? "assistant-message-ai"
                : "assistant-message-user"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading ? (
          <div className="assistant-message assistant-message-ai">Thinking...</div>
        ) : null}
      </div>

      <div className="assistant-prompts">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="assistant-prompt"
            onClick={() => {
              setInput(prompt);
              askAssistant(prompt);
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      <form className="assistant-input-row" onSubmit={onSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask the assistant..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Asking..." : "Ask"}
        </button>
      </form>
      {status ? <p className="form-status error">{status}</p> : null}
    </section>
  );
};

export default AIAssistant;
