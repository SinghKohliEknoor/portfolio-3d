import React from "react";

const SkillDescription = ({ activeSkill, skills }) => {
  if (!activeSkill || !skills[activeSkill]) {
    return null;
  }

  return (
    <section className="skill-description-section">
      <div className="skill-description-container">
        <div className="skill-description-card">
          <h3 className="skill-description-title">{activeSkill}</h3>
          <p className="skill-description-text">
            {skills[activeSkill].technologies}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillDescription;
