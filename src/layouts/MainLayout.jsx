import { useEffect, useRef } from "react";
import { useActiveSection } from "../context/ActiveSectionContext";

const SECTIONS = [
  "home",
  "about",
  "services",
  "portfolio",
  "team",
  "experience",
  "skills",
  "testimonials",
  "contact",
];

export default function MainLayout({ children }) {
  const { setActiveSection } = useActiveSection();
  const observerRef = useRef(null);

  useEffect(() => {
    // Create observer with proper error handling
    try {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.25 },
      );

      // Observe all sections safely
      SECTIONS.forEach((id) => {
        try {
          const el = document.getElementById(id);
          if (el && observerRef.current) {
            observerRef.current.observe(el);
          }
        } catch (e) {
          // Silently ignore if element not found
        }
      });
    } catch (e) {
      console.debug("Failed to setup IntersectionObserver:", e);
    }

    return () => {
      try {
        observerRef.current?.disconnect();
      } catch (e) {
        // Silently ignore
      }
    };
  }, [setActiveSection]);

  return (
    <main
      style={{
        marginLeft: 0,
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <div id="main-content-area">{children}</div>
    </main>
  );
}


