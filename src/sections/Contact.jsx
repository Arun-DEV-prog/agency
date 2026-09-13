import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiPaperAirplane,
  HiCheckCircle,
} from "react-icons/hi2";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";
import emailjs from "@emailjs/browser";
import nexoraLogo from "../assets/nexora_logo.jpg";

const contactInfo = [
  {
    icon: HiEnvelope,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: HiPhone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: HiMapPin,
    label: "Location",
    value: personalInfo.location,
    href: "#",
  },
];

const socialLinks = [
  { icon: FiGithub, label: "GitHub", href: "https://github.com/Arun-DEV-prog" },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arunkumar-roy/",
  },
];

/* Input component */
function FormInput({ label, error, children }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--muted)",
          marginBottom: 8,
          fontFamily: "Sora",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: 11, color: "#ef4444", marginTop: 5 }}>
          {error.message}
        </p>
      )}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width: "100%",
  padding: "12px 16px",
  borderRadius: 12,
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  background: "var(--bg)",
  border: `1px solid ${hasError ? "#ef4444" : "var(--border)"}`,
  color: "var(--text)",
  fontFamily: "inherit",
});

export default function Contact() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSending(true);
    setError("");
    try {
      // EmailJS integration - replace with your service/template/public key
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_PUBLIC_KEY');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      reset();
    } catch (err) {
      setError("Failed to send message. Please try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "var(--section-py) var(--section-px)",
        position: "relative",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 1023px) {
          #contact-grid { grid-template-columns: 1fr !important; }
          #contact-left { order: 2; }
          #contact-right { order: 1; }
        }
        @media (max-width: 767px) {
          #contact-name-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          filter: "blur(100px)",
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
            Contact Us
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
          style={{ marginBottom: "1rem", lineHeight: 1.05 }}
        >
          Have a project or partnership in mind? Drop our team a line or schedule an intro call
        </motion.h2>
      </div>

      <style>{`
        .contact-card {
          background: var(--card);
          border-radius: 32px;
          border: 1px solid var(--border);
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          max-width: 980px;
          margin: 0 auto;
        }
        .contact-card-inner {
          padding: clamp(32px, 4vw, 48px);
          display: grid;
          gap: 24px;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .contact-form-full {
          grid-column: 1 / -1;
        }
        .contact-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text);
          font-size: 13px;
        }
        @media (max-width: 900px) {
          .contact-form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="contact-card">
        <div className="contact-card-inner">
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "grid", gap: 20 }}
          >
            <div className="contact-form-row">
              <FormInput label="Name *" error={errors.name}>
                <input
                  {...register("name", { required: "Required" })}
                  placeholder="Your Name *"
                  className="form-input"
                  style={inputStyle(errors.name)}
                />
              </FormInput>
              <FormInput label="Email *" error={errors.email}>
                <input
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  type="email"
                  placeholder="Your Email *"
                  className="form-input"
                  style={inputStyle(errors.email)}
                />
              </FormInput>
            </div>

            <div className="contact-form-row">
              <FormInput label="Address" error={errors.address}>
                <input
                  {...register("address")}
                  placeholder="Your Address"
                  className="form-input"
                  style={inputStyle(errors.address)}
                />
              </FormInput>
              <FormInput label="Phone" error={errors.phone}>
                <input
                  {...register("phone")}
                  placeholder="Your Phone"
                  className="form-input"
                  style={inputStyle(errors.phone)}
                />
              </FormInput>
            </div>

            <div className="contact-form-full">
              <FormInput label="Subject *" error={errors.subject}>
                <input
                  {...register("subject", { required: "Required" })}
                  placeholder="Subject"
                  className="form-input"
                  style={inputStyle(errors.subject)}
                />
              </FormInput>
            </div>

            <div className="contact-form-full">
              <FormInput label="Message *" error={errors.message}>
                <textarea
                  {...register("message", {
                    required: "Required",
                    minLength: { value: 10, message: "Min 10 characters" },
                  })}
                  rows={5}
                  placeholder="Your Message *"
                  className="form-input"
                  style={{ ...inputStyle(errors.message), resize: "none" }}
                />
              </FormInput>
            </div>

            <label className="contact-checkbox">
              <input
                type="checkbox"
                {...register("consent", { required: "Required" })}
              />
              I agree to the Terms and Privacy Policy
            </label>

            {error && (
              <p style={{ fontSize: 12, color: "#ef4444", marginTop: -8 }}>
                {error}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: sending ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "14px 24px",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 700,
                cursor: sending ? "not-allowed" : "pointer",
                background:
                  "linear-gradient(135deg, var(--primary), var(--secondary))",
                color: "#fff",
                border: "none",
                opacity: sending ? 0.7 : 1,
                fontFamily: "Sora",
                boxShadow: "0 8px 24px rgba(124,58,237,0.3)",
              }}
            >
              {sending ? (
                <>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                    }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <HiPaperAirplane size={16} />
                  Send Message
                </>
              )}
            </motion.button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              overflow: "hidden",
              border: "1.5px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#080c14",
              boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
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
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "Sora",
              color: "var(--text)",
            }}
          >
            Nexora Labs
          </span>
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center" }}>
          © {new Date().getFullYear()} Nexora Labs. Engineered with precision using React &amp; Tailwind CSS
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {socialLinks.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "var(--muted)",
                  transition: "color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                  e.currentTarget.style.transform = "scale(1.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
