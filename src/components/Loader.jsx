import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import nexoraLogo from '../assets/nexora_logo.jpg';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Simulate a smooth loading progression
    const steps = [15, 35, 55, 75, 90, 98, 100];
    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setProgress(steps[stepIdx]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 600);
        }, 250);
      }
    }, 160);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#080C14' }}
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(90deg, #7C3AED 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Radial ambient glow */}
          <div
            className="absolute w-96 h-96 rounded-full pointer-events-none opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, #7C3AED 0%, #22C55E 70%, transparent 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Nexora Labs Official Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 280 }}
              className="w-20 h-20 rounded-2xl overflow-hidden mb-6 flex items-center justify-center p-0.5"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(34,197,94,0.6))',
                boxShadow: '0 12px 40px rgba(124,58,237,0.35), 0 0 20px rgba(34,197,94,0.2)',
              }}
            >
              <img
                src={nexoraLogo}
                alt="Nexora Labs"
                className="w-full h-full object-cover rounded-[14px]"
                style={{ objectPosition: 'left center', transform: 'scale(1.2)' }}
              />
            </motion.div>

            {/* Agency Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-extrabold text-white mb-1 flex items-center gap-1.5"
              style={{ fontFamily: 'Sora', letterSpacing: '-0.02em' }}
            >
              Nexora <span style={{ color: '#22C55E' }}>Labs</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs mb-8 tracking-[0.22em] uppercase font-semibold"
              style={{ color: '#94A3B8', fontFamily: 'Sora' }}
            >
              Software Agency
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-64"
            >
              <div className="flex justify-between mb-2 items-center">
                <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: '#64748B', fontFamily: 'Sora' }}>
                  Initializing Agency Lab
                </span>
                <span className="text-[11px] font-bold" style={{ color: '#22C55E', fontFamily: 'Sora' }}>
                  {progress}%
                </span>
              </div>
              <div className="w-full h-[4px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #22C55E)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 text-[11px] tracking-widest uppercase font-medium"
            style={{ color: '#64748B', fontFamily: 'Sora' }}
          >
            Mobile Apps • Web Platforms • Cloud Systems
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


