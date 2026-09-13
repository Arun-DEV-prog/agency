import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills, techStack } from '../data/portfolioData';
import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaFigma,
  FaAndroid, FaApple, FaDocker,
} from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiTailwindcss } from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

const techIconMap = {
  TbBrandReactNative,
  FaAndroid,
  FaApple,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaFigma,
  FaDocker,
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
};

function SkillBar({ name, percent, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} style={{ marginBottom: 22 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 9,
      }}>
        <span style={{
          fontSize: 14, fontWeight: 600,
          color: 'var(--text)', fontFamily: 'Sora',
        }}>
          {name}
        </span>
        <span style={{
          fontSize: 13, fontWeight: 700,
          color: 'var(--primary)',
        }}>
          {percent}%
        </span>
      </div>
      <div style={{
        height: 6, borderRadius: 999, overflow: 'hidden',
        background: 'var(--border)', position: 'relative',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%', borderRadius: 999,
            background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
}

const skillCategories = [
  { key: 'mobile', label: '📱 Mobile (React Native / iOS / Android)' },
  { key: 'frontend', label: '⚡ Frontend' },
  { key: 'backend', label: '🖥️ Backend' },
  { key: 'database', label: '🗄️ Database' },
  { key: 'tools', label: '🔧 Tools' },
];

export default function Skills() {
  const [tab, setTab] = useState('mobile');
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="skills"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 1023px) {
          #skills-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          #tech-stack-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          #tech-stack-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>

      <div style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
        filter: 'blur(90px)', opacity: 0.05, pointerEvents: 'none',
      }} />

      {/* Header */}
      <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}>
          <span className="section-badge">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
            Skills
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
          style={{ marginBottom: '1rem' }}
        >
          Agency Capabilities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="section-subtitle"
        >
          Technologies and tools we leverage daily to engineer high-performance digital products
        </motion.p>
      </div>

      <div
        id="skills-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 4rem)',
        }}
      >
        {/* Left: Tech stack icons */}
        <div>
          <h3 style={{
            fontSize: 16, fontWeight: 700,
            fontFamily: 'Sora', color: 'var(--text)',
            marginBottom: 20,
          }}>
            Technology Stack
          </h3>
          <div
            id="tech-stack-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
            }}
          >
            {techStack.map((tech, i) => {
              const Icon = techIconMap[tech.icon];
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07, type: 'spring', stiffness: 300 }}
                  whileHover={{ y: -6, scale: 1.1 }}
                  className="card"
                  style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 8,
                    padding: '16px 8px',
                    cursor: 'pointer',
                    position: 'relative',
                    border: tech.highlighted ? '1px solid rgba(34, 197, 94, 0.4)' : undefined,
                    background: tech.highlighted ? 'rgba(34, 197, 94, 0.05)' : undefined,
                    boxShadow: tech.highlighted ? '0 4px 15px rgba(34, 197, 94, 0.1)' : undefined,
                  }}
                >
                  {tech.highlighted && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#22c55e',
                      }}
                    />
                  )}
                  <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Icon && <Icon size={26} color={tech.color} />}
                  </div>
                  <span style={{
                    fontSize: 10, textAlign: 'center', fontWeight: tech.highlighted ? 700 : 600,
                    color: tech.highlighted ? 'var(--text)' : 'var(--muted)', lineHeight: 1.3,
                  }}>
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Always Learning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="card"
            style={{ marginTop: 20, padding: '20px 18px' }}
          >
            <div style={{
              fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--muted)', marginBottom: 14,
              fontFamily: 'Sora',
            }}>
              Always learning
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Three.js', 'Rust', 'Web3', 'AI/ML', 'WebAssembly'].map((item) => (
                <span
                  key={item}
                  style={{
                    padding: '5px 12px', borderRadius: 999,
                    fontSize: 11, fontWeight: 600,
                    background: 'rgba(124,58,237,0.1)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(124,58,237,0.2)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Skill bars */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {skillCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setTab(cat.key)}
                style={{
                  padding: '8px 16px', borderRadius: 999,
                  fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'Sora',
                  transition: 'all 0.3s ease',
                  background: tab === cat.key
                    ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                    : 'var(--card)',
                  color: tab === cat.key ? '#fff' : 'var(--muted)',
                  border: tab === cat.key ? 'none' : '1px solid var(--border)',
                  boxShadow: tab === cat.key ? '0 4px 16px rgba(124,58,237,0.3)' : 'none',
                  transform: tab === cat.key ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skill bars */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {skills[tab]?.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} percent={skill.percent} delay={i * 0.15} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


