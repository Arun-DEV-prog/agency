import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../context/ActiveSectionContext";
import { useTheme } from "../context/ThemeContext";
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiPaperAirplane,
  HiCog,
  HiSun,
  HiMoon,
  HiArrowUp,
} from "react-icons/hi2";

export default function RightNav() {
  const { activeSection, setActiveSection } = useActiveSection();
  const { theme, toggleTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const navItems = [
    { id: "home", label: "Home", Icon: HiHome, sections: ["home"] },
    {
      id: "about",
      label: "About",
      Icon: HiUser,
      sections: ["about", "skills"],
    },
    {
      id: "experience",
      label: "Work",
      Icon: HiBriefcase,
      sections: ["experience", "portfolio", "services", "team", "testimonials"],
    },
    {
      id: "contact",
      label: "Contact",
      Icon: HiPaperAirplane,
      sections: ["contact"],
    },
  ];

  const getActiveItem = () => {
    const found = navItems.find((item) =>
      item.sections.includes(activeSection),
    );
    return found ? found.id : "home";
  };

  const activeNavId = getActiveItem();

  return (
    <div
      className="right-nav-container"
      style={{
        position: "fixed",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 45,
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        display: "none" /* Overridden to flex by media query */,
      }}
    >
      {/* Settings cog */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Settings"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(45deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
          }}
        >
          <HiCog size={20} style={{ color: "var(--muted)" }} />
        </button>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
              style={{
                position: "absolute",
                right: "calc(100% + 12px)",
                bottom: 0,
                width: 200,
                padding: "16px",
                borderRadius: 16,
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                zIndex: 50,
              }}
            >
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 8,
                  fontFamily: "Sora",
                }}
              >
                Preferences
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 11, color: "var(--muted)" }}>
                  Theme Mode
                </span>
                <button
                  onClick={toggleTheme}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 600,
                    background: "var(--border)",
                    border: "none",
                    color: "var(--text)",
                    cursor: "pointer",
                  }}
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "var(--card)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, background 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
        }}
      >
        {theme === "dark" ? (
          <HiSun size={20} style={{ color: "var(--muted)" }} />
        ) : (
          <HiMoon size={20} style={{ color: "var(--muted)" }} />
        )}
      </button>

      {/* Navigation menu pill */}
      <div
        style={{
          borderRadius: 30,
          background: "var(--card)",
          border: "1px solid var(--border)",
          width: 44,
          padding: "10px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeNavId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.sections[0])}
              aria-label={`Go to ${item.label}`}
              title={item.label}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: isActive
                  ? "rgba(34, 197, 94, 0.12)"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(34, 197, 94, 0.25)"
                  : "1px solid transparent",
                color: isActive ? "#22c55e" : "var(--muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.background = "var(--border)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <item.Icon size={16} />
            </button>
          );
        })}
      </div>

      {/* Scroll to top */}
      {/*<AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
            }}
          >
            <HiArrowUp size={18} style={{ color: 'var(--muted)' }} />
          </motion.button>
        )}
      </AnimatePresence>*/}
    </div>
  );
}


