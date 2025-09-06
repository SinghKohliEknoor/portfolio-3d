import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2 className="reveal from-left" data-reveal>
        Contact
      </h2>
      <div className="ctaRow reveal from-right" data-reveal>
        <a className="btn" href="mailto:singhsaabop123@gmail.com" data-tilt>
          singhsaabop123@gmail.com
          <span className="shine" />
        </a>
        <a
          className="btn btnOutline"
          href="https://www.linkedin.com/in/eknoor-singh-kohli"
          target="_blank"
          rel="noreferrer"
          data-tilt
        >
          LinkedIn
          <span className="shine" />
        </a>
        <a
          className="btn btnOutline"
          href="https://github.com/SinghKohliEknoor"
          target="_blank"
          rel="noreferrer"
          data-tilt
        >
          GitHub
          <span className="shine" />
        </a>
      </div>
    </section>
  );
};

export default Contact;
