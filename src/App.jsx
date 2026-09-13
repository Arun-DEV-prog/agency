import { useState, Component, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import { ActiveSectionProvider } from "./context/ActiveSectionContext";
import { useLenis } from "./hooks/useLenis";

// Direct imports — NO React.lazy (causes issues with some packages in React 19)
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainLayout from "./layouts/MainLayout";
import AnimatedCursor from "./components/AnimatedCursor";
import BackToTop from "./components/BackToTop";
import Loader from "./components/Loader";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Portfolio from "./sections/Portfolio";
import Services from "./sections/Services";
import Team from "./sections/Team";
import Skills from "./sections/Skills";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import ProjectDetails from "./sections/ProjectDetails";

// Standard Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0A0A0A",
            color: "#fff",
            padding: "40px",
            fontFamily: "Sora, sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: "#7C3AED", marginBottom: 8 }}>
            Something went wrong
          </h2>
          <pre
            style={{
              color: "#A1A1AA",
              fontSize: 12,
              maxWidth: 600,
              whiteSpace: "pre-wrap",
            }}
          >
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 24,
              padding: "10px 24px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#7C3AED,#A855F7)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  useLenis();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo === "portfolio") {
      const target = document.getElementById("portfolio");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <AnimatedCursor />
        <Navbar />
        <Sidebar />
        <MainLayout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <Hero />
                    <About />
                    <Services />
                    <Portfolio />
                    <Team />
                    <Experience />
                    <Skills />
                    <Testimonials />
                    <Contact />
                  </motion.div>
                }
              />
              <Route
                path="/project/:id"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <ProjectDetails />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </MainLayout>
        <BackToTop />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <ActiveSectionProvider>
            <AppContent />
          </ActiveSectionProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}


