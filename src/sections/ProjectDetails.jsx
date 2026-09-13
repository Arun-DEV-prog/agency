import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";
import { motion } from "framer-motion";
import { projects } from "../data/portfolioData";
import { useActiveSection } from "../context/ActiveSectionContext";

const pageVariants = {
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setHoveredProject } = useActiveSection();
  const [isLeaving, setIsLeaving] = useState(false);
  const project = projects.find((item) => String(item.id) === String(id));

  useEffect(() => {
    if (project) {
      setHoveredProject(project);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    return () => setHoveredProject(null);
  }, [project, setHoveredProject]);

  if (!project) {
    return (
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          background: "var(--bg)",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 560 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              marginBottom: 16,
              color: "var(--text)",
              fontFamily: "Sora",
            }}
          >
            Project not found
          </h1>
          <p
            style={{ color: "var(--muted)", marginBottom: 28, lineHeight: 1.7 }}
          >
            The project you are looking for does not exist or may have been
            removed. Please return to the portfolio list and choose another
            project.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "12px 26px",
              background:
                "linear-gradient(135deg, var(--primary), var(--secondary))",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              fontFamily: "Sora",
            }}
          >
            Back to Portfolio
          </button>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={pageVariants.enter}
      animate={isLeaving ? pageVariants.exit : pageVariants.enter}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        minHeight: "100vh",
        padding: "80px 24px",
        background: "var(--bg)",
      }}
    >
      <div
        style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gap: 32 }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 20,
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              setIsLeaving(true);
              setTimeout(
                () => navigate("/", { state: { scrollTo: "portfolio" } }),
                360,
              );
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--text)",
              padding: "12px 20px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Sora",
            }}
          >
            <HiArrowLeft size={18} />
            Back to Work
          </button>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--muted)",
                fontFamily: "Sora",
              }}
            >
              Year
              <strong
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 18,
                  color: "var(--text)",
                }}
              >
                {project.year}
              </strong>
            </span>
            <span
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--muted)",
                fontFamily: "Sora",
              }}
            >
              Role
              <strong
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 18,
                  color: "var(--text)",
                }}
              >
                {project.role}
              </strong>
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gap: 28 }}>
          <div>
            <h1
              style={{
                fontSize: "clamp(38px, 4vw, 56px)",
                margin: 0,
                fontWeight: 900,
                color: "var(--text)",
                lineHeight: 1.05,
                fontFamily: "Sora",
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                marginTop: 18,
                maxWidth: 760,
                color: "var(--muted)",
                lineHeight: 1.8,
                fontSize: 16,
              }}
            >
              {project.description}
            </p>
          </div>

          <div
            style={{
              borderRadius: 32,
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 30px 70px rgba(15,23,42,0.12)",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 22 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  style={{
                    borderRadius: 999,
                    padding: "10px 16px",
                    background: "rgba(124, 58, 237, 0.08)",
                    color: "var(--text)",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 999,
                  padding: "14px 24px",
                  background:
                    "linear-gradient(135deg, var(--primary), var(--secondary))",
                  color: "#fff",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 18px 45px rgba(124,58,237,0.22)",
                }}
              >
                <HiArrowTopRightOnSquare size={18} />
                Live Demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 999,
                  padding: "14px 24px",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--text)",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <FiGithub size={18} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}


