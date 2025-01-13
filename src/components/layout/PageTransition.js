'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const generateRandomGlitchSlices = (numSlices = 6) => {
  const slices = [];

  for (let i = 0; i < numSlices; i++) {
    const height = Math.floor(Math.random() * (12 - 4 + 1)) + 4;
    const top = Math.floor(Math.random() * 100);
    const delay = Math.random() * 0.25;
    const opacity = Math.random() * 0.6 + 0.2;
    const width = Math.random() * 30 + 50;

    slices.push({
      height: `${height}%`,
      top: `${top}%`,
      delay,
      opacity: opacity,
      width: `${width}%`,
    });
  }

  return slices;
};

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const glitchSlices = generateRandomGlitchSlices();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="relative w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Random Glitch slices */}
        {glitchSlices.map((slice, index) => (
          <motion.div
            key={index}
            className="absolute bg-white blur-sm"
            style={{
              top: slice.top,
              height: slice.height,
              width: slice.width,
              opacity: slice.opacity,
            }}
            initial={{ x: '-100%' }}
            animate={{
              x: '0%',
              transition: { duration: 0.2, delay: slice.delay },
            }}
            exit={{
              x: '100%',
              opacity: 0,
              transition: { duration: 0.2 },
            }}
          />
        ))}

        <div className="relative z-10 w-full h-full">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;