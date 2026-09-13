import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { HiXMark, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";

export default function PortfolioModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        style={{
          background: "rgba(9, 10, 13, 0.85)",
          backdropFilter: "blur(16px)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 24, stiffness: 260 }}
          className="relative w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl"
          style={{
            background: "var(--card)",
            border: "1px solid rgba(148,163,184,0.18)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative h-60 sm:h-72 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${getProjectGradient(project.category)})`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[5rem] sm:text-[7rem] font-black opacity-10 text-white"
                style={{ fontFamily: "Sora" }}
              >
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
            <div className="absolute top-5 left-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-sm ring-1 ring-white/10">
                {project.category}
              </span>
            </div>
            <div className="absolute top-5 right-5">
              <button
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white transition-transform duration-200 hover:scale-110"
                aria-label="Close modal"
              >
                <HiXMark size={20} />
              </button>
            </div>
          </div>

          <div className="px-6 pb-6 pt-8 sm:px-10 sm:pb-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3
                  className="text-3xl font-black tracking-tight text-slate-950"
                  style={{ fontFamily: "Sora" }}
                >
                  {project.title}
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="uppercase tracking-[0.24em] text-slate-500">
                    {project.year}
                  </span>
                  {project.role && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                      {project.role}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
              {project.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(120px,auto))]">
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-flow-col sm:auto-cols-max">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-gradient-to-r from-slate-900 via-violet-600 to-violet-500 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                <HiArrowTopRightOnSquare size={16} />
                <span className="ml-2">Live Demo</span>
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:-translate-y-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={16} />
                <span className="ml-2">GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function getProjectGradient(category) {
  const map = {
    mobile: "#06b6d4, #7C3AED",
    frontend: "#7C3AED, #A855F7",
    fullstack: "#0ea5e9, #7C3AED",
    design: "#f43f5e, #fb923c",
    backend: "#22c55e, #0ea5e9",
  };
  return map[category] || "#7C3AED, #A855F7";
}


