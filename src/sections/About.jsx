import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiArrowRight } from "react-icons/hi2";
import { awards, personalInfo } from "../data/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "var(--section-py) var(--section-px)",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span
            className="section-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--accent)",
              padding: "6px 16px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.03em",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
                marginRight: 10,
              }}
            />
            About
          </span>
        </motion.div>

        <div className="about-panel">
          <div className="about-grid">
            <div className="about-column-left">
              <motion.h2
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="section-title"
                style={{
                  marginBottom: "1rem",
                  fontSize: "clamp(1.4rem, 3.4vw, 2.4rem)",
                  lineHeight: 1.15,
                  fontWeight: 800,
                  color: "var(--text)",
                }}
              >
                Engineering <span style={{ color: "var(--primary)" }}>mobile apps</span> &amp;{" "}
                <span style={{ color: "var(--secondary)" }}>web platforms</span> with precision
              </motion.h2>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{
                  fontSize: "clamp(12px, 1vw, 14px)",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  marginBottom: 16,
                  maxWidth: 680,
                }}
              >
                {personalInfo.bio}
              </motion.p>

              <div
                style={{
                  height: 1,
                  background: "var(--border)",
                  margin: "22px 0",
                }}
              />

              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {awards.map((award, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          color: "var(--text)",
                          fontFamily: "Sora",
                          marginBottom: 6,
                        }}
                      >
                        {award.title}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>
                        {award.org}
                      </div>
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "var(--text)",
                        minWidth: 56,
                        textAlign: "right",
                      }}
                    >
                      {award.year}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{ marginTop: 18 }}
              >
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--primary)",
                    textDecoration: "none",
                  }}
                >
                  Explore Our Work <HiArrowRight size={16} />
                </a>
              </motion.div>
            </div>
          </div>

          <div className="about-column-right">
            <div className="about-card-grid">
              <div className="about-card">
                <div className="about-card-icon">
                  <HiArrowRight size={16} color="#fff" />
                </div>
                <div className="about-card-title">Clean Code</div>
                <div className="about-card-desc">
                  Scalable, maintainable systems
                </div>
              </div>

              <div className="about-card">
                <div className="about-card-icon">
                  <HiArrowRight size={16} color="#fff" />
                </div>
                <div className="about-card-title">Modern Stack</div>
                <div className="about-card-desc">
                  React Native, Next.js, Node, Cloud
                </div>
              </div>
            </div>

            <div className="about-card-grid">
              <div className="about-card">
                <div className="about-card-icon">
                  <HiArrowRight size={16} color="#fff" />
                </div>
                <div className="about-card-title">Full Cycle</div>
                <div className="about-card-desc">Design to cloud deployment</div>
              </div>

              <div className="about-card">
                <div className="about-card-icon">
                  <HiArrowRight size={16} color="#fff" />
                </div>
                <div className="about-card-title">Recognition</div>
                <div className="about-card-desc">Award-winning engineering</div>
              </div>
            </div>

            <div className="about-status-card">
              <strong>Available for Client Projects</strong>
              <span>Partnering with startups and enterprises worldwide</span>
            </div>

            <div className="about-stat-grid">
              <div className="about-stat-card">
                <div className="about-stat-value">6+</div>
                <div className="about-stat-label">Years exp.</div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-value">80+</div>
                <div className="about-stat-label">Projects</div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-value">100%</div>
                <div className="about-stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
