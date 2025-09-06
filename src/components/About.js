import React from "react";

const About = () => {
  return (
    <section id="about" className="section">
      <h2 className="reveal from-left" data-reveal>
        About
      </h2>
      <p className="muted reveal from-right" data-reveal>
        Software Development graduate from SAIT with a 3.99/4.0 GPA. Experienced
        in delivering scalable, cloud-ready applications with expertise in
        React, Next.js, Node.js, and modern DevOps practices. Proven ability to
        translate complex requirements into user-friendly solutions.
      </p>
      <div className="stats">
        {[
          ["GPA 3.99/4", "SAIT — Software Development"],
          ["Full-Stack", "React / Next.js / Node.js"],
          ["Cloud-Ready", "Supabase / Firebase / Docker"],
          ["UX/UI Design", "Figma / Mobile-First / Responsive"],
        ].map(([n, l], i) => (
          <div
            key={i}
            className="stat depth reveal from-bottom"
            data-reveal
            data-tilt
          >
            <div className="num" data-depth="0.9">
              {n}
            </div>
            <div className="lab muted" data-depth="0.4">
              {l}
            </div>
            <span className="shine" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
