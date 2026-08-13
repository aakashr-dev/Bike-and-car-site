import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ChevronDown, Sparkles, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection({
  title,
  subtitle,
  badgeText = "PREMIUM PRE-OWNED AUTOMOTIVE",
  backgroundImage,
  heroVehicleImage,
  vehicleType = "bike", // 'bike' or 'car'
  brightBg = false, // If true, renders background image crystal clear
  alignBottom = false, // Position title & buttons towards lower bottom of hero section
  breadcrumbs = [],
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  children
}) {
  // Lightweight hardware-accelerated subtle parallax
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 90]);
  const vehicleX = useTransform(scrollY, [0, 700], [0, -60]);

  const verticalAlignClass = (alignBottom || brightBg) ? 'items-end pb-16 sm:pb-20' : 'items-center pt-16';

  return (
    <section className={`relative w-full h-screen min-h-[650px] flex ${verticalAlignClass} justify-center overflow-hidden bg-[#08080a] select-none`}>
      
      {/* Hardware-Accelerated 100% Crisp Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 brightness-105 contrast-105 opacity-100 transform-gpu will-change-transform"
        style={{ backgroundImage: `url(${backgroundImage})`, y: bgY }}
        initial={{ scale: 1.08, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Dark Vignette & Gradient Overlays (Optimized static GPU layers) */}
      {!brightBg && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/60 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#08080a]" />
          <div className="absolute inset-0 grid-bg-pattern opacity-20" />
        </div>
      )}

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        
        {/* Left/Center Column (Text & CTAs) */}
        <div className={`flex flex-col items-center text-center ${heroVehicleImage ? 'lg:col-span-7 lg:items-start lg:text-left' : 'lg:col-span-12 lg:items-center lg:text-center'}`}>
          
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-200 mb-4 bg-black/80 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-2xl"
            >
              <Link to="/" className="hover:text-[#ff5500] transition-colors">Home</Link>
              {breadcrumbs.map((item, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  {item.link ? (
                    <Link to={item.link} className="hover:text-[#ff5500] transition-colors">{item.label}</Link>
                  ) : (
                    <span className="text-[#ff5500]">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </motion.nav>
          )}

          {/* Badge */}
          {badgeText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/25 border border-[#ff5500]/80 text-[#ff5500] text-xs font-black tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(255,85,0,0.3)] backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
              {badgeText}
            </motion.div>
          )}

          {/* Staggered Animated Title with Smooth GPU shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-['Outfit'] leading-[1.08] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] transform-gpu"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-4 text-base sm:text-lg text-gray-100 font-extrabold leading-relaxed max-w-2xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] bg-black/75 px-5 py-2.5 rounded-xl border border-white/15 backdrop-blur-md"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTAs */}
          {(primaryCtaText || secondaryCtaText) && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              {primaryCtaText && (
                <Link
                  to={primaryCtaLink || '#'}
                  className="px-8 py-3.5 rounded-md bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all shadow-[0_8px_25px_rgba(255,85,0,0.5)] border border-[#ff5500]/80 flex items-center gap-2 group"
                >
                  <Flame className="w-4 h-4 group-hover:rotate-12 transition-transform" /> {primaryCtaText}
                </Link>
              )}
              {secondaryCtaText && (
                <Link
                  to={secondaryCtaLink || '#'}
                  className="px-8 py-3.5 rounded-md bg-black/90 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-black hover:border-white/80 active:scale-98 transition-all border border-white/30 backdrop-blur-md shadow-2xl"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </motion.div>
          )}

          {children}
        </div>

        {/* Optional Right Column Vehicle Graphic (GPU Hardware Accelerated) */}
        {heroVehicleImage && (
          <motion.div
            style={{ x: vehicleX }}
            className="hidden lg:flex lg:col-span-5 relative items-center justify-center transform-gpu will-change-transform"
          >
            <motion.div
              initial={{ x: 200, opacity: 0, scale: 0.85 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative group">
                {/* Static Glowing Backlight instead of expensive drop-shadow filter */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#ff5500]/30 to-[#e04b00]/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                <img
                  src={heroVehicleImage}
                  alt="Featured Vehicle"
                  loading="eager"
                  className="relative z-10 w-full max-w-lg object-contain rounded-2xl border border-white/15 shadow-2xl transform-gpu"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>

      {/* Bouncing Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 text-gray-200 hover:text-[#ff5500] transition-colors cursor-pointer bg-black/80 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-2xl"
        onClick={() => window.scrollTo({ top: window.innerHeight - 70, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#ff5500]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

