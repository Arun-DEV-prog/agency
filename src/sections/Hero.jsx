import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiArrowRight } from "react-icons/hi2";
import { personalInfo, stats } from "../data/portfolioData";
import { ProfileCard } from "../components/Sidebar";
import profilePhoto from "../assets/profile_photo.png";
import nexoraLogo from "../assets/nexora_logo.jpg";

/* ── Individual animated counter ─────────────────────────── */
function StatCard({ stat, index }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(stat.number);
    if (start === end) return;

    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, stat.number]);

  return (
    <div ref={ref} style={{ padding: "8px 0" }}>
      <div
        style={{
          fontFamily: "Sora",
          fontWeight: 800,
          fontSize: "clamp(32px, 5vw, 48px)",
          lineHeight: 1.1,
          color: "var(--text)",
          marginBottom: 4,
        }}
      >
        {count}
        <span style={{ color: "#22c55e" }}>{stat.suffix}</span>
      </div>
      <div
        style={{
          fontSize: "clamp(11px, 1.2vw, 13px)",
          color: "var(--muted)",
          fontWeight: 600,
          lineHeight: 1.4,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontFamily: "Sora",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

/* ── Hero section ─────────────────────────────────────────── */
export default function Hero() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "40px 24px 40px",
        width: "100%",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <style>{`
        .hero-content {
          width: 100%;
          max-width: 920px;
          margin: 0 auto;
        }

        .hero-heading {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(2.1rem, 4.4vw, 3.4rem);
          line-height: 1.36;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-bottom: 24px;
          word-break: break-word;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          padding: 4px 18px;
          border-radius: 999px;
          margin: 0 6px;
          vertical-align: middle;
          font-size: 0.88em;
          line-height: 1.25;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transition: transform 0.2s ease;
        }

        .hero-tag-emerald {
          background: rgba(34, 197, 94, 0.12);
          color: #22c55e;
          border: 1.5px solid rgba(34, 197, 94, 0.3);
        }

        .hero-tag-purple {
          background: rgba(124, 58, 237, 0.12);
          color: #a855f7;
          border: 1.5px solid rgba(124, 58, 237, 0.3);
        }

        .hero-subtext {
          font-size: clamp(14px, 1.25vw, 16px);
          line-height: 1.75;
          color: var(--muted);
          max-width: 680px;
          margin-bottom: 32px;
        }

        .hero-cta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .hero-bottom-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: auto;
          flex-wrap: wrap;
          gap: 32px;
        }

        .hero-stats-block {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          min-width: 0;
        }

        @media (max-width: 1023px) {
          .hero-section {
            padding: 40px 18px 36px;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-heading {
            font-size: clamp(1.8rem, 7.5vw, 2.6rem);
            line-height: 1.34;
            margin-bottom: 18px;
          }

          .hero-tag {
            padding: 3px 12px;
            margin: 0 3px;
          }

          .hero-cta {
            width: 100%;
          }

          .hero-bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          .hero-stats-block {
            width: 100%;
            justify-content: space-between;
            gap: 18px;
          }
        }
      `}</style>

      {/* Mobile Profile Card (Only shown on screen size < 1024px) */}
      <div
        className="block lg:hidden"
        style={{ width: "100%", marginBottom: 32 }}
      >
        <ProfileCard isMobile={true} />
      </div>

      {/* Main Heading & Content */}
      <div className="hero-content" style={{ margin: "auto 0" }}>
        {/* Specialization Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 18 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.28)",
              fontSize: 12,
              fontWeight: 700,
              color: "#22c55e",
              fontFamily: "Sora",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            Mobile Apps (iOS &amp; Android) • React Native Specialists
          </span>
        </motion.div>

        <motion.h1
          className="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          We engineer{" "}
          <span className="hero-tag hero-tag-emerald">
            mobile &amp; web apps
          </span>
          <br />
          &amp;{" "}
          <span className="hero-tag hero-tag-purple">
            digital products
          </span>{" "}
          that <br className="hidden md:block" />
          <span
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            scale &amp; inspire
          </span>
        </motion.h1>

        {/* Agency Subtext */}
        <motion.p
          className="hero-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Nexora Labs is a premier software agency building high-performance mobile apps for iOS &amp; Android using React Native, scalable enterprise web platforms, and custom cloud solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
            style={{
              gap: 8,
              padding: "12px 28px",
              fontSize: "14px",
              background:
                "linear-gradient(135deg, var(--primary), var(--secondary))",
              color: "#ffffff",
              borderRadius: 99,
              display: "inline-flex",
              alignItems: "center",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 10px 25px rgba(124,58,237,0.25)",
            }}
          >
            Explore Our Work <HiArrowRight size={16} />
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-secondary"
            style={{
              padding: "12px 26px",
              fontSize: "14px",
              borderRadius: 99,
              textDecoration: "none",
              fontWeight: 700,
              fontFamily: "Sora",
            }}
          >
            Let's Talk
          </a>
        </motion.div>
      </div>

      {/* Bottom Row - Stats & rotating badge */}
      <div className="hero-bottom-row">
        {/* Left Side: Stats Block */}
        <div className="hero-stats-block">
          {stats.slice(0, 2).map((stat, idx) => (
            <StatCard key={idx} stat={stat} index={idx} />
          ))}
        </div>

        {/* Right Side: Rotating circular badge and 3D Accent ring */}
        <div
          style={{
            position: "relative",
            width: 140,
            height: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Glassmorphic 3D Ring SVG */}
          <svg
            width="220"
            height="220"
            viewBox="0 0 200 200"
            style={{ position: "absolute", pointerEvents: "none", zIndex: 1 }}
            className="animate-float"
          >
            <defs>
              <linearGradient
                id="ring-grad-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient
                id="ring-grad-2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
              </linearGradient>
              <filter
                id="glass-blur"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="60"
              stroke="url(#ring-grad-1)"
              strokeWidth="18"
              fill="none"
              opacity="0.8"
              filter="url(#glass-blur)"
            />
            <path
              d="M 40,100 A 60,60 0 0,1 160,100"
              stroke="url(#ring-grad-2)"
              strokeWidth="14"
              fill="none"
              opacity="0.85"
            />
          </svg>

          {/* Rotating Text Badge Container */}
          <div
            style={{ position: "relative", zIndex: 5, width: 110, height: 110 }}
          >
            <svg
              viewBox="0 0 100 100"
              width="110"
              height="110"
              className="animate-spin-slow"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text
                fill="var(--text)"
                fontSize="6.6"
                fontWeight="800"
                letterSpacing="1.2"
                fontFamily="Sora"
              >
                <textPath href="#circlePath">
                  NEXORA LABS • SOFTWARE AGENCY • INNOVATION HUB •
                </textPath>
              </text>
            </svg>

            {/* Nested Concentric Wireframe Rings in Center */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="23"
                  cy="23"
                  r="16"
                  stroke="var(--text)"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity="0.4"
                />
                <circle
                  cx="23"
                  cy="23"
                  r="12"
                  stroke="#22c55e"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <ellipse
                  cx="23"
                  cy="23"
                  rx="16"
                  ry="5"
                  stroke="var(--primary)"
                  strokeWidth="0.8"
                  transform="rotate(30 23 23)"
                  opacity="0.5"
                />
                <ellipse
                  cx="23"
                  cy="23"
                  rx="16"
                  ry="5"
                  stroke="var(--secondary)"
                  strokeWidth="0.8"
                  transform="rotate(-30 23 23)"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
