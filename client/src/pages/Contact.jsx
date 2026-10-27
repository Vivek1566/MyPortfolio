import { useState } from "react";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState({ status: "idle", message: "" });

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submitForm(event) {
    event.preventDefault();
    const subject = form.subject.trim() || `Portfolio enquiry from ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      "",
      form.message.trim(),
    ].join("\n");
    const mailtoUrl = `mailto:vivekrajak3004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setState({
      status: "success",
      message: "Your email app should open with the message ready. If it doesn’t, email vivekrajak3004@gmail.com directly.",
    });
  }

  return (
    <main id="main" className="page-wrap inner-page contact-page">
      <div className="contact-heading"><p className="eyebrow">CONTACT</p><h1>Have a good one<br /><span>in mind?</span></h1><p className="page-lead">I’d love to hear about it. Send a note and I’ll get back to you soon.</p></div>
      <section className="contact-panel" data-reveal>
        <div className="contact-main">
          <p className="eyebrow">SAY HELLO</p><h2>Let’s start<br />a conversation.</h2>
          <p className="contact-hint">Use the form to prepare an email in your preferred mail app.</p>
          <div className="contact-details">
            <div><p className="eyebrow">EMAIL</p><a href="mailto:vivekrajak3004@gmail.com">vivekrajak3004@gmail.com</a><small>Best way to get in touch.</small></div>
            <div><p className="eyebrow">ELSEWHERE</p><div className="social-links"><a href="https://github.com/Vivek1566" target="_blank" rel="noreferrer">GitHub ↗</a></div><small>Projects, code, and experiments.</small></div>
          </div>
        </div>
        <form className="contact-form" onSubmit={submitForm}>
          <label htmlFor="name">Name</label>
          <input autoComplete="name" id="name" name="name" maxLength="100" required value={form.name} onChange={updateField} />
          <label htmlFor="email">Email</label>
          <input autoComplete="email" id="email" name="email" type="email" maxLength="254" required value={form.email} onChange={updateField} />
          <label htmlFor="subject">Subject <span>(optional)</span></label>
          <input id="subject" name="subject" maxLength="160" value={form.subject} onChange={updateField} />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" maxLength="5000" required value={form.message} onChange={updateField} />
          <button className="button button-primary" type="submit">Open email app <span aria-hidden="true">↗</span></button>
          <p className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message}</p>
        </form>
      </section>
      <p className="contact-footnote"><span className="status-dot" /> Currently open to select freelance and full-time opportunities.</p>
    </main>
  );
}
