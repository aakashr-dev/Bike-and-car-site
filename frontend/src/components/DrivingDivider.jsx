import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Car, Flame } from 'lucide-react';

export default function DrivingDivider({ type = 'bike', label = '' }) {
  return (
    <div className="relative py-8 w-full overflow-hidden flex items-center justify-center my-4 select-none">
      {/* Background Track Line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#ff5500]/40 to-transparent" />

      {/* Moving Vehicle Silhouette along the line (Hardware Accelerated) */}
      <motion.div
        initial={{ x: '-150%' }}
        animate={{ x: '150%' }}
        transition={{ duration: 7, ease: "linear", repeat: Infinity }}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10 text-[#ff5500] transform-gpu will-change-transform"
      >
        <div className="flex items-center gap-1">
          {type === 'bike' ? (
            <Bike className="w-6 h-6 text-[#ff5500] drop-shadow-[0_0_8px_#ff5500]" />
          ) : (
            <Car className="w-6 h-6 text-[#ff5500] drop-shadow-[0_0_8px_#ff5500]" />
          )}
          {/* Speed trail dust line */}
          <div className="w-10 h-[2px] bg-gradient-to-l from-[#ff5500] to-transparent opacity-80" />
        </div>
      </motion.div>

      {/* Center Badge if label provided */}
      {label && (
        <span className="relative z-20 px-4 py-1.5 rounded-full bg-[#121215] border border-[#ff5500]/40 text-white font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg backdrop-blur-md">
          <Flame className="w-3.5 h-3.5 text-[#ff5500]" />
          {label}
        </span>
      )}
    </div>
  );
}

