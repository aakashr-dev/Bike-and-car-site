import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Car, Flame } from 'lucide-react';

export default function DrivingDivider({ type = 'bike', label = '' }) {
  return (
    <div className="relative py-10 w-full overflow-hidden flex items-center justify-center my-6">
      {/* Background Track Line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#ff5500]/40 to-transparent" />

      {/* Moving Vehicle Silhouette along the line */}
      <motion.div
        initial={{ x: '-100vw' }}
        whileInView={{ x: '100vw' }}
        viewport={{ once: false }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1 z-10 text-[#ff5500]"
      >
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.4 }}>
          {type === 'bike' ? (
            <Bike className="w-7 h-7 drop-shadow-[0_0_8px_rgba(255,85,0,0.8)]" />
          ) : (
            <Car className="w-7 h-7 drop-shadow-[0_0_8px_rgba(255,85,0,0.8)]" />
          )}
        </motion.div>
        {/* Speed trail dust lines */}
        <div className="w-12 h-[2px] bg-gradient-to-l from-[#ff5500] to-transparent opacity-80" />
      </motion.div>

      {/* Center Badge if label provided */}
      {label && (
        <span className="relative z-20 px-4 py-1.5 rounded-full bg-[#141418] border border-[#ff5500]/50 text-white font-extrabold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl">
          <Flame className="w-4 h-4 text-[#ff5500]" />
          {label}
        </span>
      )}
    </div>
  );
}
