"use client";

import { useState } from "react";
import { profile } from "@/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <h2
          id="contact-title"
          className="display"
          style={{ "--c": "var(--rst-text)" } as React.CSSProperties}
        >
          Email me
        </h2>
        <p className="contact-lede">
          For freelance work, a collaboration, or a question about one of these
          projects, email is the fastest way to reach me.
        </p>
        <a className="contact-address" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-actions">
          <button type="button" className="button button--rst" onClick={copy}>
            {copied ? "Address copied" : "Copy address"}
          </button>
          <a className="button button--rst" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span className="sr-only" role="status">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>
      </div>

      <div className="colophon">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <p>
          Set in Anybody and Fragment Mono. Colors taken from Wireshark&rsquo;s
          default packet coloring rules.
        </p>
      </div>
    </footer>
  );
}
