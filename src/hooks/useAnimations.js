import { useEffect } from "react";

export const useRevealAnimation = () => {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("[data-reveal], .reveal")
    );
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("in");
            else e.target.classList.remove("in");
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
      );
      elements.forEach((el) => io.observe(el));
    } else {
      elements.forEach((el) => el.classList.add("in"));
    }

    return () => {
      if (io) io.disconnect();
    };
  }, []);
};

export const useTiltEffect = () => {
  useEffect(() => {
    const tiltEls = Array.from(document.querySelectorAll("[data-tilt]"));
    const handleMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * 10;
      const ry = (x - 0.5) * 12;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      const shine = el.querySelector(".shine");
      if (shine)
        shine.style.background = `radial-gradient(600px circle at ${x * 100}% ${
          y * 100
        }%, rgba(255,255,255,0.25), transparent 45%)`;
      el.querySelectorAll("[data-depth]").forEach((child) => {
        const depth = parseFloat(child.getAttribute("data-depth") || "0");
        const tx = (x - 0.5) * depth * 6;
        const ty = (0.5 - y) * depth * 6;
        child.style.transform = `translate3d(${tx}px, ${ty}px, ${
          depth * 12
        }px)`;
      });
    };
    const handleLeave = (e) => {
      const el = e.currentTarget;
      el.style.transform = "";
      const shine = el.querySelector(".shine");
      if (shine)
        shine.style.background =
          "radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.12), transparent 42%)";
      el.querySelectorAll("[data-depth]").forEach((child) => {
        child.style.transform = "";
      });
    };
    tiltEls.forEach((el) => {
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
    });
    return () => {
      tiltEls.forEach((el) => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);
};
