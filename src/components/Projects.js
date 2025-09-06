import React from "react";

const Projects = ({ projects }) => {
  return (
    <section id="work" className="section">
      <h2 className="reveal from-left" data-reveal>
        My Projects
      </h2>
      <p className="muted reveal from-right" data-reveal>
        Full-stack applications showcasing expertise in React, Next.js, React
        Native, and cloud technologies. Each project demonstrates secure
        authentication, scalable architecture, and modern UX/UI design
        principles.
      </p>

      {/* Projects grid */}
      <div className="grid projects-grid">
        {projects.map((p, idx) => (
          <a
            key={p.id}
            className={`card depth reveal ${
              idx % 2 ? "from-right" : "from-left"
            }`}
            href={`#project-${p.id}`}
            aria-label={`Open case study ${p.title}`}
            data-reveal
            data-tilt
          >
            <div className="cardTop">
              <div className="badge" data-depth="0.8">
                {p.id.toString().padStart(2, "0")}
              </div>
              <div className="thumb" data-depth="0.6" aria-hidden>
                <img src={p.imageUrl} alt={p.title} className="thumbImage" />
                <div className="thumbOverlay" />
              </div>
            </div>
            <div className="cardBody">
              <div className="cardTitle" data-depth="0.9">
                {p.title}
              </div>
              <div className="muted" data-depth="0.4">
                {p.note}
              </div>
            </div>
            <span className="shine" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
