import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiCodeBracket,
  HiPaintBrush,
  HiServerStack,
  HiSparkles,
  HiChevronDown,
  HiCheck,
  HiDevicePhoneMobile,
} from "react-icons/hi2";
import { services } from "../data/portfolioData";

const iconMap = {
  HiDeviceMobile: HiDevicePhoneMobile,
  HiCode: HiCodeBracket,
  HiPaintBrush,
  HiServer: HiServerStack,
  HiSparkles,
};

function ServiceAccordion({ service, isOpen, onClick, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const Icon = iconMap[service.icon] || HiSparkles;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card"
      style={{
        background: isOpen
          ? "rgba(124,58,237,0.07)"
          : service.highlight
          ? "rgba(34,197,94,0.03)"
          : undefined,
        border: isOpen
          ? "1px solid rgba(124,58,237,0.28)"
          : service.highlight
          ? "1px solid rgba(34,197,94,0.25)"
          : undefined,
        transition:
          "background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        overflow: "visible",
        position: "relative",
      }}
    >
      {/* Header */}
      <button
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "20px 22px",
          textAlign: "left",
          cursor: "pointer",
          background: "none",
          border: "none",
          color: "inherit",
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
            background: isOpen
              ? "linear-gradient(135deg, var(--primary), var(--secondary))"
              : service.highlight
              ? "rgba(34,197,94,0.14)"
              : "rgba(124,58,237,0.12)",
          }}
        >
          <Icon
            size={22}
            style={{
              color: isOpen
                ? "#fff"
                : service.highlight
                ? "#22c55e"
                : "var(--primary)",
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "Sora",
                color: "var(--text)",
                lineHeight: 1.3,
                whiteSpace: "normal",
                wordBreak: "break-word",
                margin: 0,
              }}
            >
              {service.title}
            </h3>
            {service.badge && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 999,
                  background: "rgba(34,197,94,0.15)",
                  color: "#22c55e",
                  border: "1px solid rgba(34,197,94,0.3)",
                  fontFamily: "Sora",
                }}
              >
                {service.badge}
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--muted)",
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              margin: 0,
            }}
          >
            {service.shortDesc}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            flexShrink: 0,
            color: isOpen ? "var(--primary)" : "var(--muted)",
          }}
        >
          <HiChevronDown size={20} />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 22px 22px" }}>
              <div
                style={{
                  height: 1,
                  marginBottom: 20,
                  background: "rgba(124,58,237,0.2)",
                }}
              />
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  marginBottom: 20,
                }}
              >
                {service.description}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px 12px",
                  marginBottom: 20,
                }}
              >
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: "rgba(34,197,94,0.18)",
                      }}
                    >
                      <HiCheck size={10} style={{ color: "#22c55e" }} />
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        lineHeight: 1.4,
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "var(--primary)",
                    fontFamily: "Sora",
                  }}
                >
                  {service.price}
                </span>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    padding: "9px 20px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, var(--primary), var(--secondary))",
                    color: "#fff",
                    textDecoration: "none",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(124,58,237,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  const [openService, setOpenService] = useState(0);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="services"
      style={{
        padding: "var(--section-py) var(--section-px)",
        position: "relative",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 1023px) {
          #services-grid { grid-template-columns: 1fr !important; }
          #services-sticky { position: static !important; }
        }
        @media (max-width: 767px) {
          #services-features { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: "45%",
          right: "-5%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          filter: "blur(90px)",
          opacity: 0.05,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div ref={headerRef} style={{ marginBottom: "3.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="section-badge">
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--primary)",
                display: "inline-block",
              }}
            />
            Services
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
          style={{ marginBottom: "1rem" }}
        >
          What We Offer
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="section-subtitle"
        >
          End-to-end agency services to help you design, engineer, and launch transformative digital products
        </motion.p>
      </div>

      <div
        id="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
          alignItems: "start",
        }}
      >
        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {services.map((service, i) => (
            <ServiceAccordion
              key={service.id}
              service={service}
              index={i}
              isOpen={openService === i}
              onClick={() => setOpenService(openService === i ? -1 : i)}
            />
          ))}
        </div>

        {/* Pricing highlight card */}
        <motion.div
          id="services-sticky"
          initial={{ opacity: 0, x: 50 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ position: "sticky", top: 32 }}
        >
          <div
            className="card"
            style={{
              padding: "clamp(24px, 4vw, 36px)",
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
              border: "none",
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                top: -32,
                right: -32,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -32,
                left: -32,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  marginBottom: 16,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "Sora",
                }}
              >
                Most Popular
              </div>
              <h3
                style={{
                  fontSize: "clamp(20px, 3vw, 26px)",
                  fontWeight: 800,
                  color: "#fff",
                  fontFamily: "Sora",
                  marginBottom: 6,
                  lineHeight: 1.2,
                }}
              >
                Full Stack Package
              </h3>
              <div
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 900,
                  color: "#fff",
                  fontFamily: "Sora",
                  marginBottom: 10,
                  lineHeight: 1.1,
                }}
              >
                $4,000+
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: 28,
                  lineHeight: 1.6,
                }}
              >
                Complete end-to-end solution from design to deployment
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                {[
                  "Custom Design System",
                  "React / Next.js Frontend",
                  "Node.js Backend & API",
                  "Database Architecture",
                  "3 Months Support",
                ].map((feat) => (
                  <div
                    key={feat}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: "rgba(255,255,255,0.2)",
                      }}
                    >
                      <HiCheck size={12} color="#fff" />
                    </div>
                    <span
                      style={{ fontSize: 14, color: "rgba(255,255,255,0.9)" }}
                    >
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px 24px",
                  borderRadius: 16,
                  fontSize: 14,
                  fontWeight: 700,
                  background: "#fff",
                  color: "var(--primary)",
                  textDecoration: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  fontFamily: "Sora",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Get Started Today
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


