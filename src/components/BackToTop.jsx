import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi2';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: '#fff',
          }}
        >
          <HiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}


