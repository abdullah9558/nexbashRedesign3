'use client';

import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="band contact screen" id="contact" data-reveal>
      <div className="contact-shell reveal-child tilt" style={{ '--i': 0 }}>
        <div className="contact-copy">
          <p className="kicker">Contact</p>
          <h2>Open a channel</h2>
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
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
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
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
