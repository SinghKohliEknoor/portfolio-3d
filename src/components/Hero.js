import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="heroGrid">
        <div
          className="avatar reveal from-left"
          data-reveal
          aria-label="Profile image"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/eknoor.jpg), radial-gradient(120% 120% at 20% 20%, rgba(160,200,255,.35), transparent 60%), linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,0))`,
          }}
        />
        <div className="heroCopy">
          <h1 className="heroTitle reveal from-left" data-reveal>
            Eknoor Singh <span>3D</span> Portfolio
          </h1>
          <p className="heroSub reveal from-right" data-reveal>
            Full Stack Developer with expertise in building secure, cloud-ready
            applications using React, Next.js, Node.js, and Supabase. UX/UI
            prototyping, and front-end development. Proven expertise in
            translating Figma mock-ups into pixel-perfect, responsive websites.
            Passionate about driving innovation through Agile development,
            CI/CD, and modern software architecture practices.
          </p>
          <div className="heroCtas reveal from-bottom" data-reveal>
            <a className="btn" href="#work" data-tilt>
              See Work
              <span className="shine" />
            </a>
            <a className="btnOutline" href="#about" data-tilt>
              About Me
              <span className="shine" />
            </a>
          </div>
          <div className="scrollHint">Scroll</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
