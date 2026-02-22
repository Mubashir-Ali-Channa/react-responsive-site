import { useState } from "react";
import { apiRequest } from "../lib/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    topic: "Feature request",
    message: "Hi team, I would like to request a blog search feature.",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await apiRequest("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setStatus({ type: "success", message: "Message sent successfully." });
      setFormData((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Could not send your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={onChange}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
      />

      <label htmlFor="topic">Topic</label>
      <input
        id="topic"
        name="topic"
        type="text"
        value={formData.topic}
        onChange={onChange}
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows="5"
        value={formData.message}
        onChange={onChange}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      {status.message ? (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
};

export default ContactForm;
