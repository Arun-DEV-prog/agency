import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../context/ActiveSectionContext";
import { useTheme } from "../context/ThemeContext";
import {
  HiBars3,
  HiXMark,
  HiSun,
  HiMoon,
  HiPaperAirplane,
  HiSparkles,
} from "react-icons/hi2";

import nexoraLogo from "../assets/nexora_logo.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "team", label: "Team" },
  { id: "experience", label: "Milestones" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact Us" },
];

/* ── Agency Brand Logo ─────────────────────────────────────── */
function AgencyLogo({ onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          overflow: "hidden",
          border: "1.5px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
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
            transform: "scale(1.25)",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "Sora",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            lineHeight: 1.1,
          }}
        >
          Nexora <span style={{ color: "#22c55e" }}>Labs</span>
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Software Agency
        </span>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { activeSection, setActiveSection } = useActiveSection();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .desktop-nav-links {
          display: flex;
        }
        .mobile-nav-toggle {
          display: none;
        }
        .nav-contact-btn {
          display: inline-flex;
        }
        @media (max-width: 1023px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 639px) {
          .nav-contact-btn {
            display: none !important;
          }
        }
      `}</style>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 70,
          zIndex: 50,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          background:
            theme === "dark"
              ? scrolled
                ? "rgba(11, 15, 25, 0.95)"
                : "rgba(11, 15, 25, 0.82)"
              : scrolled
              ? "rgba(255, 255, 255, 0.96)"
              : "rgba(240, 245, 243, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          boxShadow: scrolled
            ? theme === "dark"
              ? "0 10px 30px rgba(0,0,0,0.3)"
              : "0 10px 30px rgba(0,0,0,0.06)"
            : "none",
          transition: "all 0.3s ease",
        }}
        className="top-navbar"
      >
        <div
          style={{
            maxWidth: 1440,
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {/* Brand Logo */}
          <AgencyLogo onClick={() => scrollToSection("home")} />

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-nav-links"
            style={{
              alignItems: "center",
              gap: 6,
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border)",
              padding: "4px 8px",
              borderRadius: 999,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    position: "relative",
                    background: "transparent",
                    border: "none",
                    padding: "7px 15px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    fontFamily: "Sora",
                    color: isActive ? "#ffffff" : "var(--muted)",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(135deg, var(--primary), var(--secondary))",
                        borderRadius: 999,
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              {theme === "dark" ? (
                <HiSun size={17} style={{ color: "#f59e0b" }} />
              ) : (
                <HiMoon size={17} style={{ color: "var(--text)" }} />
              )}
            </button>

            {/* Contact Us CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="nav-contact-btn"
              style={{
                alignItems: "center",
                gap: 8,
                padding: "9px 20px",
                borderRadius: 999,
                background:
                  "linear-gradient(135deg, var(--primary), var(--secondary))",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Sora",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 18px rgba(124,58,237,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(124,58,237,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 4px 18px rgba(124,58,237,0.3)";
              }}
            >
              <HiPaperAirplane size={14} />
              Contact Us
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="mobile-nav-toggle"
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {mobileMenuOpen ? <HiXMark size={20} /> : <HiBars3 size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(8px)",
                zIndex: 55,
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                right: 0,
                width: 300,
                background: "var(--card)",
                borderLeft: "1px solid var(--border)",
                padding: "88px 24px 32px",
                display: "flex",
                flexDirection: "column",
                zIndex: 60,
                boxShadow: "-10px 0 30px rgba(0,0,0,0.4)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 16,
                  fontFamily: "Sora",
                }}
              >
                Nexora Labs Menu
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  flexGrow: 1,
                }}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        width: "100%",
                        padding: "12px 18px",
                        borderRadius: 14,
                        background: isActive
                          ? "rgba(124, 58, 237, 0.12)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(124, 58, 237, 0.25)"
                          : "1px solid transparent",
                        color: isActive ? "var(--primary)" : "var(--text)",
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
              </div>

              {/* Mobile Drawer Bottom Action */}
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <button
                  onClick={() => scrollToSection("contact")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 12,
                    background:
                      "linear-gradient(135deg, var(--primary), var(--secondary))",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "Sora",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <HiPaperAirplane size={15} />
                  Contact Us
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
