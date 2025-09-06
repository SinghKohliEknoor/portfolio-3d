import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import SkillDescription from "./components/SkillDescription";
import About from "./components/About";
import Contact from "./components/Contact";
import ThreeBackground from "./components/ThreeBackground";
import { useRevealAnimation, useTiltEffect } from "./hooks/useAnimations";
import { projects, skills } from "./data/portfolioData";
import "./styles/portfolio.css";

export default function PortfolioCanvasSite() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [animatingIcons, setAnimatingIcons] = useState([]);

  // Handle skill animation
  const handleSkillClick = (skillName) => {
    if (activeSkill === skillName) {
      setActiveSkill(null);
      setAnimatingIcons([]);
      return;
    }

    setActiveSkill(skillName);
    setAnimatingIcons([]);

    // Animate icons one by one with staggered timing
    const icons = skills[skillName].icons;
    icons.forEach((icon, index) => {
      setTimeout(() => {
        setAnimatingIcons((prev) => [
          ...prev,
          {
            icon,
            id: Date.now() + index,
            stackLevel: Math.floor(index / 3), // Level in the stack
            stackPosition: index % 3, // Position within the level
          },
        ]);
      }, index * 400); // Increased delay for better stacking effect
    });
  };

  // Initialize reveal and tilt animations
  useRevealAnimation();
  useTiltEffect();

  return (
    <div className="site-root">
      <ThreeBackground initials="ESK" />

      <main className="overlay">
        <Header />
        <Hero />

        <section id="work" className="section">
          <Projects projects={projects} />
          <Skills
            skills={skills}
            activeSkill={activeSkill}
            animatingIcons={animatingIcons}
            handleSkillClick={handleSkillClick}
          />
        </section>

        <SkillDescription activeSkill={activeSkill} skills={skills} />

        <About />
        <Contact />

        <footer className="footer">
          © {new Date().getFullYear()} Eknoor Singh Kohli
        </footer>
      </main>
    </div>
  );
}
