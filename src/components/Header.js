import React from "react";

const Header = () => {
  return (
    <header className="nav reveal from-top" data-reveal>
      <a href="/" className="brand">
        Eknoor Singh Kohli
      </a>
      <nav className="links">
        <a href="#work" className="btn" data-tilt>
          Work
          <span className="shine" />
        </a>
        <a href="#about" className="btn" data-tilt>
          About
          <span className="shine" />
        </a>
        <a href="#contact" className="btn" data-tilt>
          Contact
          <span className="shine" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
