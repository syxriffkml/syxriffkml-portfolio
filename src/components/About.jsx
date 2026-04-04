import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { education } from "../data/experience";
import { GraduationCap } from "lucide-react";

const floatingTags = [
  {
    text: "programmer 💻",
    top: "4%",
    left: "2%",
    rotate: -8,
    color: "#FF7F6E",
    bg: "#FFF0EE",
    speed: ["0%", "-120%"],
    duration: 5.5,
    delay: 0,
  },
  {
    text: "coder ⌨️",
    top: "6%",
    right: "4%",
    rotate: 6,
    color: "#F59E0B",
    bg: "#FFFBEB",
    speed: ["0%", "-130%"],
    duration: 6,
    delay: 0.4,
  },
  {
    text: "creative 🌟",
    top: "28%",
    left: "1%",
    rotate: 10,
    color: "#EC4899",
    bg: "#FDF2F8",
    speed: ["0%", "-80%"],
    duration: 6.5,
    delay: 0.8,
  },
  {
    text: "pixel perfect",
    top: "22%",
    right: "2%",
    rotate: -5,
    color: "#3B82F6",
    bg: "#EFF6FF",
    speed: ["0%", "-90%"],
    duration: 5,
    delay: 0.2,
  },
  {
    text: "UI lover 🎨",
    top: "48%",
    left: "0%",
    rotate: -6,
    color: "#10B981",
    bg: "#ECFDF5",
    speed: ["0%", "-55%"],
    duration: 7,
    delay: 1.0,
  },
  {
    text: "detail-oriented",
    top: "42%",
    right: "1%",
    rotate: 7,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    speed: ["0%", "-60%"],
    duration: 6,
    delay: 0.6,
  },
  {
    text: "problem solver",
    top: "65%",
    left: "10%",
    rotate: -6,
    color: "#10B981",
    bg: "#ECFDF5",
    speed: ["0%", "-30%"],
    duration: 8,
    delay: 0.3,
  },
  {
    text: "Malaysian 🇲🇾",
    top: "72%",
    left: "27%",
    rotate: -3,
    color: "#FF7F6E",
    bg: "#FFF0EE",
    speed: ["0%", "-25%"],
    duration: 7.5,
    delay: 1.2,
  },
];

function FloatingTag({
  text,
  top,
  left,
  right,
  rotate,
  color,
  bg,
  speed,
  duration,
  delay,
  scrollYProgress,
}) {
  const parallaxY = useTransform(scrollYProgress, [0, 1], speed);

  return (
    // Outer: handles parallax scroll
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        right,
        rotate,
        y: parallaxY,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Inner: handles idle float bob */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "0.82rem",
          color,
          background: bg,
          border: `1.5px solid ${color}33`,
          borderRadius: "999px",
          padding: "0.3rem 0.85rem",
          whiteSpace: "nowrap",
          boxShadow: `0 4px 16px ${color}22`,
        }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "var(--color-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating personality tags — hidden below xl (1280px) */}
      <div className="hidden xl:block" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: "absolute",
            top: 40,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(100%, 1350px)",
            pointerEvents: "none",
          }}
        >
          {floatingTags.map((tag, i) => (
            <FloatingTag key={i} {...tag} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="section-label">About Me</span>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3.5rem",
              alignItems: "start",
              marginTop: "1.5rem",
            }}
            className="about-grid"
          >
            {/* Left: Pull quote */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: "var(--color-primary-dark)",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                "I build things that feel good to use."
              </h2>

              {/* Decorative line */}
              <div
                style={{
                  width: "3rem",
                  height: "4px",
                  borderRadius: "999px",
                  background: "var(--color-accent)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Fun stats row */}
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {[
                  { num: "4+", label: "internships" },
                  { num: "4", label: "projects" },
                  { num: "13+", label: "tech skills" },
                ].map(({ num, label }) => (
                  <div
                    key={label}
                    style={{
                      background: "#fff",
                      border: "2px solid var(--color-border)",
                      borderRadius: "1.25rem",
                      padding: "0.75rem 1.25rem",
                      textAlign: "center",
                      minWidth: "80px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.6rem",
                        color: "var(--color-primary-dark)",
                        lineHeight: 1,
                      }}
                    >
                      {num}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "var(--color-text-muted)",
                        fontWeight: 600,
                        marginTop: "0.2rem",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Bio + Education */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.05rem",
                  color: "var(--color-text)",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                Hi! I&apos;m Syariff Kamil, a front-end developer from Malaysia
                with a passion for crafting interfaces that are both beautiful
                and intuitive. I care deeply about the details — the
                micro-animations, the thoughtful spacing, the way a button feels
                when you click it. I&apos;m selective about the work I take on,
                choosing projects that genuinely excite me and push my skills
                forward.
              </p>

              {/* Education */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--color-text)",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <GraduationCap size={18} color="var(--color-primary-dark)" />{" "}
                  Education
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {education.map((edu, i) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      style={{
                        background: "#fff",
                        border: "2px solid var(--color-border)",
                        borderRadius: "1.25rem",
                        padding: "0.9rem 1.1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.2rem",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          color: "var(--color-text)",
                        }}
                      >
                        {edu.degree}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.82rem",
                          color: "var(--color-text-muted)",
                          fontWeight: 600,
                        }}
                      >
                        {edu.institution} · {edu.period}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
