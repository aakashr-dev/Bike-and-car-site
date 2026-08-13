import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ChevronDown, Sparkles, Flame, Bike, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection({
  title,
  subtitle,
  badgeText = "PREMIUM PRE-OWNED AUTOMOTIVE",
  backgroundImage,
  heroVehicleImage,
  vehicleType = "bike", // 'bike' or 'car'
  brightBg = false, // If true, renders background image crystal clear without dark tint overlays
  alignBottom = false, // Position title & buttons towards lower bottom of hero section
  breadcrumbs = [],
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  children
}) {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const vehicleX = useTransform(scrollY, [0, 800], [0, -150]);

  const verticalAlignClass = (alignBottom || brightBg) ? 'items-end pb-16 sm:pb-20' : 'items-center pt-16';

  return (
    <section className={`relative w-full h-screen min-h-[680px] flex ${verticalAlignClass} justify-center overflow-hidden bg-black`}>
      
      {/* 100% Crystal Clear & Bright Full Screen Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 brightness-105 contrast-105 opacity-100"
        style={{ backgroundImage: `url(${backgroundImage})`, y: bgY }}
        initial={{ scale: 1.1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* Overlays: ONLY apply dark vignette if NOT brightBg */}
      {!brightBg && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/70 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#0a0a0c]" />
          <div className="absolute inset-0 grid-bg-pattern opacity-30" />

          {/* Speed Lines Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <motion.div
              animate={{ x: [-1000, 1000] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-[200%] h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(255,85,0,0.4)_50px,rgba(255,85,0,0.4)_52px)]"
            />
          </div>
        </>
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
              transition={{ delay: 0.1, duration: 0.5 }}
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
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5500]/30 border border-[#ff5500] text-[#ff5500] text-xs font-black tracking-widest uppercase mb-4 shadow-2xl backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
              {badgeText}
            </motion.div>
          )}

          {/* Staggered Animated Title with Heavy Shadow & Glow */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-['Outfit'] leading-[1.08] drop-shadow-[0_10px_35px_rgba(0,0,0,1)]"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-4 text-base sm:text-lg text-gray-100 font-extrabold leading-relaxed max-w-2xl drop-shadow-[0_4px_20px_rgba(0,0,0,1)] bg-black/70 px-5 py-2.5 rounded-2xl border border-white/20 backdrop-blur-md"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTAs */}
          {(primaryCtaText || secondaryCtaText) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              {primaryCtaText && (
                <Link
                  to={primaryCtaLink || '#'}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,85,0,0.6)] border border-[#ff5500] flex items-center gap-2"
                >
                  <Flame className="w-4 h-4" /> {primaryCtaText}
                </Link>
              )}
              {secondaryCtaText && (
                <Link
                  to={secondaryCtaLink || '#'}
                  className="px-8 py-4 rounded-xl bg-black/90 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-black transition-all border border-white/40 hover:border-white/80 backdrop-blur-md shadow-2xl"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </motion.div>
          )}

          {children}
        </div>

        {/* Optional Right Column Vehicle Graphic (if provided) */}
        {heroVehicleImage && (
          <motion.div
            style={{ x: vehicleX }}
            className="hidden lg:flex lg:col-span-5 relative items-center justify-center"
          >
            <motion.div
              initial={{ x: 400, opacity: 0, scale: 0.7 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative z-10"
            >
              <motion.img
                src={heroVehicleImage}
                alt="Featured Vehicle"
                className="w-full max-w-lg object-contain drop-shadow-[0_20px_50px_rgba(255,85,0,0.35)] rounded-3xl border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}

      </div>

      {/* Bouncing Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 text-gray-200 hover:text-[#ff5500] transition-colors cursor-pointer bg-black/80 px-3 py-1 rounded-full border border-white/30 backdrop-blur-md shadow-2xl"
        onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#ff5500]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
