import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";
import { projects } from "../data/portfolioData";
import { useActiveSection } from "../context/ActiveSectionContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ── Custom Browser Window Mockup ────────────────────────── */
function BrowserMockup({ project, onViewDetails, disableMotion = false }) {
  return (
    <motion.div
      whileHover={disableMotion ? undefined : { y: -4, scale: 1.01 }}
      whileTap={disableMotion ? undefined : { scale: 0.995 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        width: "90%",
        maxWidth: 720,
        height: "clamp(280px, 48vh, 450px)",
        background: "#ffffff",
        borderRadius: 24,
        border: "3px solid rgba(255,255,255,0.95)",
        overflow: "hidden",
        boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Mockup header */}
      <div
        style={{
          height: 38,
          background: "#f1f3f4",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          justifyContent: "space-between",
        }}
      >
        {/* Window controls */}
        <div style={{ display: "flex", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ff5f56",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ffbd2e",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#27c93f",
            }}
          />
        </div>
        {/* Address bar */}
        <div
          style={{
            width: "50%",
            height: 22,
            background: "#ffffff",
            borderRadius: 6,
            fontSize: 9,
            color: "#5f6368",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
            border: "1px solid #dadce0",
          }}
        >
          {project.title.toLowerCase().replace(/\s+/g, "-")}.com
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Mockup content */}
      <div style={{ flexGrow: 1, overflow: "hidden", position: "relative" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
              fontFamily: "Sora",
            }}
          >
            {project.title}
          </div>
        )}
        {onViewDetails && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            style={{
              position: "absolute",
              right: 18,
              bottom: 18,
              padding: "10px 16px",
              borderRadius: 999,
              border: "none",
              background: "rgba(17,24,39,0.95)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.02em",
              boxShadow: "0 12px 30px rgba(15,23,42,0.25)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            View Details
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main Portfolio Component ────────────────────────────── */
export default function Portfolio() {
  const { setHoveredProject } = useActiveSection();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldUseSimpleMobileAnimation = isMobile || isTouchDevice;
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const { ref: badgeRef, inView: badgeInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.18,
  });
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < 1024;
      const touch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches;

      setIsMobile(mobile);
      setIsTouchDevice(touch);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Desktop GSAP Pin & Overscroll Stack using official useGSAP hook
  useGSAP(
    () => {
      if (
        typeof window === "undefined" ||
        shouldUseSimpleMobileAnimation ||
        !containerRef.current
      ) {
        return;
      }

      // Get all panel elements with class ".section"
      const panels = gsap.utils.toArray(".section");
      if (panels.length === 0) return;

      // Create a copy of the panels array and pop the last one (so it remains unpinned at the bottom)
      const pinPanels = [...panels];
      pinPanels.pop();

      pinPanels.forEach((panel, i) => {
        let innerpanel = panel.querySelector(".section-inner");
        if (!innerpanel) return;
        let panelHeight = innerpanel.offsetHeight;
        let windowHeight = window.innerHeight;
        let difference = panelHeight - windowHeight;

        let fakeScrollRatio =
          difference > 0 ? difference / (difference + windowHeight) : 0;

        if (fakeScrollRatio) {
          panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
        }

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () =>
              fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true,
            onEnter: () => setHoveredProject(projects[i]),
            onEnterBack: () => setHoveredProject(projects[i]),
            onLeave: () => {
              if (i + 1 < projects.length) {
                setHoveredProject(projects[i + 1]);
              } else {
                setHoveredProject(null);
              }
            },
            onLeaveBack: () => {
              if (i - 1 >= 0) {
                setHoveredProject(projects[i - 1]);
              } else {
                setHoveredProject(null);
              }
            },
          },
        });

        if (fakeScrollRatio) {
          tl.to(innerpanel, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          });
        }
        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.7, opacity: 0.5, duration: 0.9 },
        ).to(panel, { opacity: 0, duration: 0.1 });
      });

      // Global ScrollTrigger for resetting sidebar profile card when outside the portfolio area
      const globalTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onLeave: () => setHoveredProject(null),
        onLeaveBack: () => setHoveredProject(null),
        onEnter: () => setHoveredProject(projects[0]),
        onEnterBack: () => setHoveredProject(projects[projects.length - 1]),
      });

      return () => {
        globalTrigger.kill();
      };
    },
    { dependencies: [shouldUseSimpleMobileAnimation], scope: containerRef },
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "60px 0 90px",
        overflow: "visible",
      }}
    >
      <style>{`
        .slides-wrapper {
          margin-top: 24px;
          width: 100%;
        }
        #portfolio {
          overflow: visible;
        }
        .section {
          width: 100%;
          height: calc(100vh - 120px);
          display: flex;
          justifyContent: center;
          align-items: center;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid var(--border);
          background: var(--card);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .section-content {
          width: 100%;
          height: 100%;
          display: flex;
          justifyContent: center;
          align-items: center;
        }
        .section-inner {
          height: 100%;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
        }
        @media (max-width: 1023px) {
          #portfolio {
            min-height: auto;
            padding: 48px 0 88px;
          }
          .section {
            height: auto !important;
            margin-bottom: 24px !important;
          }
        }
      `}</style>

      {/* ── Desktop View (GSAP Stack) ── */}
      {!shouldUseSimpleMobileAnimation ? (
        <div
          ref={containerRef}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Header row */}
          <div style={{ marginBottom: 10 }} ref={badgeRef}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={badgeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-badge" style={{ marginBottom: 0 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                Work Highlights
              </span>
            </motion.div>
            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="section-title"
              style={{ marginTop: 14, fontSize: 36 }}
            >
              Selected Projects
            </motion.h2>
          </div>

          {/* Stacking panels */}
          <div className="slides-wrapper">
            {projects.map((project, idx) => (
              <motion.section
                key={project.id}
                className="section"
                initial="hidden"
                animate={titleInView ? "visible" : "hidden"}
                variants={cardVariants}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.06,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8, scale: 1.01 }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate(`/project/${project.id}`)}
                style={{
                  marginBottom: idx < projects.length - 1 ? 40 : 0,
                  cursor: "pointer",
                }}
              >
                <div className="section-content">
                  <div className="section-inner">
                    <BrowserMockup
                      project={project}
                      onViewDetails={() => navigate(`/project/${project.id}`)}
                      disableMotion={shouldUseSimpleMobileAnimation}
                    />
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      ) : (
        /* ── Mobile/Tablet View (Vertical list) ── */
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 48,
            width: "100%",
            padding: "0 16px 8px",
            overflow: "visible",
          }}
        >
          {/* Header */}
          <div>
            <span className="section-badge">
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              Work Highlights
            </span>
            <h2 className="section-title" style={{ marginTop: 8 }}>
              Selected Projects
            </h2>
          </div>

          {/* Project List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.16 }}
                transition={{
                  duration: 0.55,
                  delay: 0.04 + idx * 0.035,
                  ease: "easeOut",
                }}
                whileHover={
                  shouldUseSimpleMobileAnimation
                    ? undefined
                    : { y: -4, scale: 1.005 }
                }
                onClick={() => navigate(`/project/${project.id}`)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  borderRadius: 24,
                  padding: 20,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
              >
                {/* Mockup */}
                <BrowserMockup
                  project={project}
                  disableMotion={shouldUseSimpleMobileAnimation}
                />

                {/* Details */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        fontFamily: "Sora",
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      {project.title}
                    </h3>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--muted)",
                        fontFamily: "Sora",
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.8,
                      color: "var(--muted)",
                      margin: 0,
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      paddingTop: 14,
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#22c55e",
                        fontFamily: "Sora",
                      }}
                    >
                      {project.role || "Developer"}
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "10px 16px",
                          borderRadius: 999,
                          background: "rgba(79, 70, 229, 0.16)",
                          color: "var(--text)",
                          border: "1px solid rgba(129, 140, 248, 0.28)",
                          fontSize: 12,
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        <HiArrowTopRightOnSquare size={14} /> Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "10px 16px",
                          borderRadius: 999,
                          background: "rgba(255, 255, 255, 0.08)",
                          color: "var(--text)",
                          border: "1px solid var(--border)",
                          fontSize: 12,
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        <FiGithub size={14} /> Code
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
