'use client';

import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const sendQuery = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const message = String(form.get('message') || '').trim();
    const subject = encodeURIComponent(`Nexbash website query from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nReply email: ${email}\n\nQuery:\n${message}`);

    window.location.href = `mailto:info@nexbash.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="band contact screen" id="contact" data-reveal>
      <div className="contact-shell reveal-child tilt" style={{ '--i': 0 }}>
        <div className="contact-copy">
          <p className="kicker">Contact</p>
          <h2>Send Us Your Query</h2>
          <p className="lede">Tell us the terrain. We reply with a clear next step.</p>
          <div className="contact-pulse" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        {sent ? (
          <div className="thanks anim-pop">
            <h3>Signal received.</h3>
            <p>We&apos;ll be in touch shortly.</p>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={sendQuery}
          >
            <label className="field-dance" style={{ '--i': 0 }}>
              Name
              <input name="name" required placeholder="Alex Rivera" />
            </label>
            <label className="field-dance" style={{ '--i': 1 }}>
              Email
              <input name="email" type="email" required placeholder="alex@company.com" />
            </label>
            <label className="field-dance" style={{ '--i': 2 }}>
              Notes
              <textarea name="message" rows={4} required placeholder="What are you building?" />
            </label>
            <button type="submit" className="go go-pulse">
              Send to info@nexbash.com
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
