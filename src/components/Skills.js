import React from "react";

const Skills = ({ skills, activeSkill, animatingIcons, handleSkillClick }) => {
  return (
    <>
      {/* Skills title added */}
      <h2 className="reveal from-left" data-reveal style={{ marginTop: 64 }}>
        My Skills
      </h2>

      {/* Pointer Text under My Skills */}
      <div
        className="pointerTextContainer"
        style={{
          opacity: activeSkill ? "0" : "1",
          visibility: activeSkill ? "hidden" : "visible",
          transition: "all 0.5s ease",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        <span className="pointerText">Click on skills to see the magic!</span>
      </div>

      {/* Skills Wrapper with Dynamic Layout */}
      <div className={`skillsWrapper ${activeSkill ? "hasSelection" : ""}`}>
        {/* Arrow Pointer above first skill */}
        <div
          className="skillsArrowPointer"
          style={{
            opacity: activeSkill ? "0" : "1",
            visibility: activeSkill ? "hidden" : "visible",
            transition: "all 0.5s ease",
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: "0px",
            marginBottom: "8px",
          }}
        >
          <div className="pointerArrow"></div>
        </div>

        {/* Skill Category Buttons */}
        <div className="skillButtons">
          {Object.keys(skills).map((skillName) => (
            <button
              key={skillName}
              className={`skillBtn ${
                activeSkill === skillName ? "active" : ""
              }`}
              onClick={() => handleSkillClick(skillName)}
              type="button"
              aria-label={`View ${skillName} skills`}
            >
              {skillName}
              <span className="shine" />
            </button>
          ))}
        </div>

        {/* Glass Container */}
        {activeSkill && (
          <div className="glassContainer">
            <div className="glassWrapper">
              <div className="glass">
                <div className="glassRim" />
                <div className="glassBody">
                  <div className="liquid" />
                  {animatingIcons.map((item, index) => {
                    // Responsive spacing - tighter on mobile, wider on desktop
                    const isMobile = window.innerWidth <= 768;
                    const spacing = isMobile ? 36 : 52; // Tighter spacing on mobile
                    const bottomPos = 12 + index * spacing;

                    return (
                      <div
                        key={item.id}
                        className="skillIcon"
                        style={{
                          animationDelay: `${index * 0.4}s`,
                          bottom: `${bottomPos}px`,
                          left: "50%",
                          transform: "translateX(-50%)",
                          zIndex: 10 + index,
                        }}
                      >
                        <img
                          src={item.icon}
                          alt={`${activeSkill} skill icon`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Skills;
