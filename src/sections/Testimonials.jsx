import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { HiStar } from 'react-icons/hi2';
import { testimonials } from '../data/portfolioData';

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar
          key={i}
          size={15}
          style={{ color: i < rating ? '#f59e0b' : 'var(--border)' }}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div
      className="card"
      style={{
        padding: '28px 26px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--card)',
      }}
    >
      {/* Quote mark */}
      <div style={{
        fontSize: 56,
        fontWeight: 900,
        lineHeight: 0.8,
        color: 'var(--primary)',
        opacity: 0.35,
        fontFamily: 'Sora',
        marginBottom: 18,
        userSelect: 'none',
      }}>
        "
      </div>

      <p style={{
        fontSize: 14, lineHeight: 1.8,
        color: 'var(--muted)',
        fontStyle: 'italic',
        flex: 1,
        marginBottom: 24,
      }}>
        {testimonial.text}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Avatar */}
        <div style={{
          width: 46, height: 46, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0,
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
        }}>
          {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 700, fontSize: 14,
            fontFamily: 'Sora', color: 'var(--text)',
            marginBottom: 3, lineHeight: 1.3,
          }}>
            {testimonial.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>
            {testimonial.role}
          </div>
        </div>

        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="testimonials"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: '-10%', left: '50%',
        transform: 'translateX(-50%)',
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
        filter: 'blur(100px)', opacity: 0.05, pointerEvents: 'none',
      }} />

      {/* Header */}
      <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}>
          <span className="section-badge">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
            Testimonials
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-title"
          style={{ marginBottom: '1rem' }}
        >
          What Clients Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="section-subtitle"
        >
          Real feedback from clients I've had the pleasure of working with
        </motion.p>
      </div>

      {/* Swiper */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          style={{ paddingBottom: 52 }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} style={{ height: 'auto' }}>
              <TestimonialCard testimonial={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 40,
          flexWrap: 'wrap', marginTop: 8,
        }}
      >
        {[
          { value: '5.0', label: 'Average Rating', extra: <div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '4px 0 2px' }}>{Array.from({ length: 5 }).map((_, i) => <HiStar key={i} size={13} style={{ color: '#f59e0b' }} />)}</div> },
          { value: '30+', label: 'Happy Clients', extra: null },
          { value: '100%', label: 'Satisfaction Rate', extra: null },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800,
              fontFamily: 'Sora', color: 'var(--text)',
              lineHeight: 1.1,
            }}>
              {stat.value}
            </div>
            {stat.extra}
            <div style={{
              fontSize: 12, color: 'var(--muted)',
              marginTop: stat.extra ? 0 : 6, lineHeight: 1.4,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}


