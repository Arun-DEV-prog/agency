import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiArrowUpRight,
  FiGithub,
  FiSend,
} from "react-icons/fi";
import { useTypingEffect } from "../hooks/useTypingEffect";
import {
  HiXMark as Hi2XMark,
  HiBars3 as Hi2Bars3,
  HiEnvelope as Hi2Envelope,
} from "react-icons/hi2";
import { useTheme } from "../context/ThemeContext";
import { useActiveSection } from "../context/ActiveSectionContext";
import { agencyInfo, personalInfo, social } from "../data/portfolioData";
import profilePhoto from "../assets/profile_photo.png";
import nexoraLogo from "../assets/nexora_logo.jpg";

const MOBILE_NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "team", label: "Team" },
  { id: "experience", label: "Milestones" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact Us" },
];

/* ── Custom Logo Component ─────────────────────────────────────── */
function Logo() {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 14,
        overflow: "hidden",
        border: "1.5px solid rgba(255,255,255,0.18)",
        boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
        background: "#080c14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <img
        src={nexoraLogo}
        alt="Nexora Labs"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "left center",
          transform: "scale(1.2)",
        }}
      />
    </div>
  );
}

/* ── Profile / Agency Card Component ─────────────────────────────── */
export function ProfileCard({ isMobile = false }) {
  const { hoveredProject } = useActiveSection();
  const info = agencyInfo || personalInfo;
  const titles = ["Nexora Labs Agency", ...info.titles];
  const typedName = useTypingEffect(titles, 100, 70, 2200);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // If hoveredProject is active, render the project details view!
  if (hoveredProject) {
    return (
      <div
        className="profile-card-container"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: isMobile ? 620 : "100%",
          borderRadius: 32,
          overflow: "hidden",
          background: "#0d1117",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "4px solid #ffffff",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
          padding: "24px",
        }}
      >
        {/* Background Image of Project */}
        {hoveredProject.image && (
          <img
            src={hoveredProject.image}
            alt={hoveredProject.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              opacity: 0.25,
            }}
          />
        )}

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(12,15,23,0.95) 0%, rgba(12,15,23,0.7) 60%, rgba(12,15,23,0.4) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Top Left Logo */}
        <div
          style={{ position: "relative", zIndex: 10, alignSelf: "flex-start" }}
        >
          <Logo />
        </div>

        {/* Project Metadata Contents */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Sora",
                fontWeight: 800,
                fontSize: "clamp(26px, 3.5vw, 32px)",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: 10,
              }}
            >
              {hoveredProject.title}
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                fontFamily: "SF Pro Display, sans-serif",
              }}
            >
              {hoveredProject.description}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingTop: 10,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 4,
                  fontFamily: "Sora",
                }}
              >
                Year
              </span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#ffffff",
                  fontFamily: "Sora",
                }}
              >
                {hoveredProject.year}
              </span>
            </div>

            <div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 4,
                  fontFamily: "Sora",
                }}
              >
                Scope &amp; Delivery
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#ffffff",
                  fontFamily: "Sora",
                }}
              >
                {hoveredProject.role || "Nexora Labs Team"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise show the Agency Hub Card
  return (
    <div
      className="profile-card-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: isMobile ? 620 : "100%",
        borderRadius: 32,
        overflow: "hidden",
        background: "#182025",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        border: "4px solid #ffffff",
      }}
    >
      {/* Background Nexora Labs Brand Banner */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#080c14",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={nexoraLogo}
          alt={info.name}
          style={{
            width: "100%",
            height: "65%",
            objectFit: "contain",
            objectPosition: "center top",
            paddingTop: "24px",
            pointerEvents: "none",
            filter: "drop-shadow(0 10px 30px rgba(124,58,237,0.35))",
          }}
        />
      </div>

      {/* Dark gradient overlay for typography readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(12,15,23,0.98) 0%, rgba(12,15,23,0.92) 50%, rgba(12,15,23,0.4) 80%, rgba(12,15,23,0.6) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Top Left Logo & Agency Name */}
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 20,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Logo />
        <div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "Sora",
              color: "#fff",
              display: "block",
              lineHeight: 1.1,
            }}
          >
            Nexora Labs
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Agency Studio
          </span>
        </div>
      </div>

      {/* Top Right Social Column */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 10,
        }}
      >
        {[
          {
            icon: FiFacebook,
            url: "https://www.facebook.com/arunkumar.roy.52090008/",
          },
          { icon: FiGithub, url: "https://github.com/Arun-DEV-prog" },
          {
            icon: FiLinkedin,
            url: "https://www.linkedin.com/in/arunkumar-roy/",
          },
        ].map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000000",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <item.icon size={15} />
          </a>
        ))}
      </div>

      {/* Available for Work badge on desktop */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: 76,
            left: 20,
            zIndex: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255, 255, 255, 0.94)",
            color: "#111",
            padding: "6px 14px",
            borderRadius: 999,
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 8px rgba(34,197,94,0.35)",
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "Sora",
              whiteSpace: "nowrap",
            }}
          >
            Accepting New Projects
          </span>
        </div>
      )}

      {/* Bottom Text and Actions */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          padding: "24px 24px",
          color: "#ffffff",
        }}
      >
        {/* Available Badge on Mobile */}
        {isMobile && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "5px 12px",
              borderRadius: 99,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#fff",
                fontFamily: "Sora",
              }}
            >
              Accepting Projects
            </span>
          </div>
        )}

        {/* Typing Name / Role */}
        <h2
          style={{
            fontFamily: "Sora",
            fontWeight: 700,
            fontSize: "clamp(18px, 2.6vw, 22px)",
            marginBottom: 8,
            lineHeight: 1.2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {typedName}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "0.9em",
              background: "#ffffff",
              marginLeft: 4,
              animation: "blink 0.9s step-end infinite",
            }}
          />
        </h2>

        {/* Agency Bio */}
        <p
          style={{
            fontSize: "clamp(12px, 1.4vw, 13px)",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.5,
            marginBottom: 20,
            maxWidth: "92%",
          }}
        >
          {info.bio}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Arrow Circle */}
          <button
            onClick={scrollToContact}
            aria-label="Contact Nexora Labs"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#22c55e",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000000",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08) rotate(45deg)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            <FiArrowUpRight size={18} />
          </button>

          {/* Let's Talk CTA */}
          <button
            onClick={scrollToContact}
            style={{
              padding: "0 20px",
              height: 42,
              borderRadius: 21,
              background: "#22c55e",
              border: "none",
              fontSize: 13,
              fontWeight: 700,
              color: "#000000",
              cursor: "pointer",
              fontFamily: "Sora",
              transition: "transform 0.2s",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
          >
            Let's Talk
          </button>

          {/* View Services */}
          <button
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
            }
          >
            Our Services <FiArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile Clock ───────────────────────────────────────── */
function MobileClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = (d) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  const fmtDate = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  return (
    <div style={{ textAlign: "right", marginRight: 12 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "var(--text)",
          fontFamily: "Sora",
          lineHeight: 1.2,
        }}
      >
        {fmt(time)}
      </div>
      <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 1 }}>
        {fmtDate(time)}
      </div>
    </div>
  );
}

/* ── Main Sidebar Export ─────────────────────────────────── */
export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection, setActiveSection } = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside
        style={{
          position: "fixed",
          left: 24,
          top: 96,
          bottom: 24,
          width: 370,
          zIndex: 40,
          display: "none",
        }}
        className="desktop-sidebar-container"
      >
        <ProfileCard isMobile={false} />
      </aside>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(6px)",
              zIndex: 55,
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              right: 0,
              width: 280,
              background: "var(--card)",
              borderLeft: "1px solid var(--border)",
              padding: "80px 24px 40px",
              display: "flex",
              flexDirection: "column",
              zIndex: 60,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 16,
              }}
            >
              Nexora Labs
            </div>

            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                flexGrow: 1,
              }}
            >
              {MOBILE_NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: isActive
                        ? "rgba(34,197,94,0.1)"
                        : "transparent",
                      border: "none",
                      color: isActive ? "#22c55e" : "var(--text)",
                      textAlign: "left",
                      fontSize: 14,
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: "Sora",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>
                  Theme
                </span>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </div>
              </div>
              <button
                onClick={toggleTheme}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--bg-secondary)",
                  color: "var(--text)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {theme === "dark" ? "☀" : "🌙"}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
