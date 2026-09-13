import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiBriefcase } from 'react-icons/hi2';
import { education, experience } from '../data/portfolioData';

function TimelineCard({ item, direction, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });
  const isEdu = item.type === 'education';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="card"
      style={{
        padding: '20px 18px',
        textAlign: direction === 'left' ? 'right' : 'left',
        transition: 'all 0.3s ease',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          fontSize: 11, fontWeight: 700,
          padding: '5px 12px', borderRadius: 999,
          marginBottom: 12,
          background: isEdu ? 'rgba(124,58,237,0.12)' : 'rgba(34,197,94,0.1)',
          color: isEdu ? 'var(--primary)' : '#4ade80',
          fontFamily: 'Sora', letterSpacing: '0.04em',
        }}
      >
        {item.period}
      </span>
      <h3 style={{
        fontSize: 14, fontWeight: 700,
        fontFamily: 'Sora', color: 'var(--text)',
        marginBottom: 4, lineHeight: 1.3,
      }}>
        {item.title}
      </h3>
      <div style={{
        fontSize: 12, fontWeight: 600, marginBottom: 10,
        color: isEdu ? 'var(--primary)' : '#4ade80',
      }}>
        {item.organization}
      </div>
      <p style={{
        fontSize: 12, lineHeight: 1.7, color: 'var(--muted)',
      }}>
        {item.description}
      </p>
    </motion.div>
  );
}

function CenterDot({ isEdu, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const Icon = isEdu ? HiAcademicCap : HiBriefcase;
  return (
    <div ref={ref} style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 10, padding: '8px 0',
    }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 400 }}
        className="timeline-dot"
        style={{
          width: 42, height: 42, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        }}
      >
        <Icon size={17} color="#fff" />
      </motion.div>
    </div>
  );
}

/* Mobile single-column timeline card */
function MobileTimelineCard({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const isEdu = item.type === 'education';
  const Icon = isEdu ? HiAcademicCap : HiBriefcase;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        display: 'flex', gap: 16, alignItems: 'flex-start',
      }}
    >
      {/* Left: dot + line */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0,
      }}>
        <div className="timeline-dot" style={{
          width: 38, height: 38, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          flexShrink: 0,
        }}>
          <Icon size={15} color="#fff" />
        </div>
        <div style={{
          width: 1, flex: 1, minHeight: 24,
          background: 'linear-gradient(to bottom, var(--primary), transparent)',
          marginTop: 8, opacity: 0.3,
        }} />
      </div>

      {/* Right: content */}
      <div className="card" style={{ padding: '18px 16px', flex: 1, marginBottom: 16 }}>
        <span style={{
          display: 'inline-block',
          fontSize: 11, fontWeight: 700,
          padding: '4px 10px', borderRadius: 999,
          marginBottom: 10,
          background: isEdu ? 'rgba(124,58,237,0.12)' : 'rgba(34,197,94,0.1)',
          color: isEdu ? 'var(--primary)' : '#4ade80',
          fontFamily: 'Sora',
        }}>
          {item.period}
        </span>
        <h3 style={{
          fontSize: 14, fontWeight: 700,
          fontFamily: 'Sora', color: 'var(--text)',
          marginBottom: 4, lineHeight: 1.3,
        }}>
          {item.title}
        </h3>
        <div style={{
          fontSize: 12, fontWeight: 600, marginBottom: 8,
          color: isEdu ? 'var(--primary)' : '#4ade80',
        }}>
          {item.organization}
        </div>
        <p style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--muted)' }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const maxLen = Math.max(education.length, experience.length);

  const allItems = [
    ...education.map(e => ({ ...e, type: 'education' })),
    ...experience.map(e => ({ ...e, type: 'experience' })),
  ].sort((a, b) => {
    const aYear = parseInt(a.period?.split('–')[1] || a.period?.split('-')[1] || a.period);
    const bYear = parseInt(b.period?.split('–')[1] || b.period?.split('-')[1] || b.period);
    return (bYear || 0) - (aYear || 0);
  });

  return (
    <section
      id="experience"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* Responsive: show/hide desktop vs mobile timeline */}
      <style>{`
        .exp-desktop { display: block; }
        .exp-mobile { display: none; }
        @media (max-width: 767px) {
          .exp-desktop { display: none !important; }
          .exp-mobile { display: block !important; }
        }
      `}</style>

      {/* Accent */}
      <div style={{
        position: 'absolute', top: '30%', left: '-8%',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        filter: 'blur(90px)', opacity: 0.04, pointerEvents: 'none',
      }} />

      {/* Header */}
      <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}>
          <span className="section-badge">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
            Education & Experience
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
          style={{ marginBottom: '1rem' }}
        >
          My Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="section-subtitle"
        >
          A timeline of academic background and professional experience
        </motion.p>
      </div>

      {/* ── DESKTOP: Two-column timeline ── */}
      <div className="exp-desktop">
        {/* Column headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 56px 1fr',
          gap: 12,
          marginBottom: 24,
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--primary)', fontFamily: 'Sora',
            }}>
              🎓 Education
            </span>
          </div>
          <div />
          <div style={{ textAlign: 'center' }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: '#4ade80', fontFamily: 'Sora',
            }}>
              💼 Experience
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0,
            left: '50%', transform: 'translateX(-50%)',
            width: 1,
            background: 'linear-gradient(to bottom, var(--primary), var(--secondary), transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {Array.from({ length: maxLen }).map((_, i) => {
              const edu = education[i];
              const exp = experience[i];
              const dotItem = edu || exp;

              return (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 56px 1fr',
                    gap: 12,
                    alignItems: 'center',
                  }}
                >
                  {edu
                    ? <TimelineCard item={edu} direction="left" index={i} />
                    : <div />
                  }
                  <CenterDot isEdu={!!edu} index={i} />
                  {exp
                    ? <TimelineCard item={exp} direction="right" index={i} />
                    : <div />
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE: Single-column timeline ── */}
      <div className="exp-mobile">
        <div style={{ position: 'relative' }}>
          {allItems.map((item, i) => (
            <MobileTimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}


