import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { HiSparkles, HiArrowUpRight } from "react-icons/hi2";
import { teamMembers } from "../data/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Team() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      id="team"
      style={{
        padding: "var(--section-py) var(--section-px)",
        position: "relative",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Header */}
        <div ref={headerRef} style={{ marginBottom: "3.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
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
              Our Team
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
            style={{
              marginBottom: "1rem",
              fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)",
              lineHeight: 1.1,
              fontWeight: 800,
              color: "var(--text)",
            }}
          >
            Meet the Builders Behind{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Nexora Labs
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: 1.7,
              color: "var(--muted)",
              maxWidth: 620,
            }}
          >
            Our core engineering team crafting next-generation mobile applications,
            enterprise web systems, and high-performance software.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
            maxWidth: 880,
            margin: "0 auto",
          }}
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -8 }}
              className="card"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 24,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Photo / Avatar Header with subtle gradient */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 280,
                  background: "var(--bg-secondary)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    transition: "transform 0.5s ease",
                  }}
                  onError={(e) => {
                    // graceful fallback if remote image fails
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* Dark gradient overlay for text protection */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(12,15,23,0.85) 0%, rgba(12,15,23,0.2) 60%, transparent 100%)",
                  }}
                />

                {/* Role badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 16,
                    zIndex: 2,
                    background: "rgba(12, 15, 23, 0.8)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22c55e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#ffffff",
                      fontFamily: "Sora",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      fontFamily: "Sora",
                      color: "var(--text)",
                      marginBottom: 4,
                      lineHeight: 1.2,
                    }}
                  >
                    {member.name}
                  </h3>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--primary)",
                      marginBottom: 12,
                      fontFamily: "Sora",
                    }}
                  >
                    {member.specialty}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--muted)",
                      marginBottom: 16,
                    }}
                  >
                    {member.bio}
                  </p>

                  {/* Skills tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 20,
                    }}
                  >
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: "var(--border)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links Footer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 14,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", gap: 10 }}>
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} GitHub`}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--muted)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--text)";
                          e.currentTarget.style.borderColor = "var(--primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--muted)";
                          e.currentTarget.style.borderColor = "var(--border)";
                        }}
                      >
                        <FiGithub size={14} />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--muted)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#0077b5";
                          e.currentTarget.style.borderColor = "#0077b5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--muted)";
                          e.currentTarget.style.borderColor = "var(--border)";
                        }}
                      >
                        <FiLinkedin size={14} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} Twitter`}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--muted)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#1da1f2";
                          e.currentTarget.style.borderColor = "#1da1f2";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--muted)";
                          e.currentTarget.style.borderColor = "var(--border)";
                        }}
                      >
                        <FiTwitter size={14} />
                      </a>
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#22c55e",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "Sora",
                    }}
                  >
                    Active Core <HiSparkles size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
