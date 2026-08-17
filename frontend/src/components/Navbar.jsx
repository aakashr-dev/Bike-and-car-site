import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, PhoneCall, Heart, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar({ wishlistCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 20;
          setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Bikes Vault', path: '/bikes' },
    { name: 'Cars Vault', path: '/cars' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 select-none">
      
      {/* Top Edge Power-On LED Accent Strip */}
      <div className="relative h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff5500] to-transparent shadow-[0_0_12px_#ff5500] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse" />
      </div>

      {/* Main Full-Width Edge-to-Edge Navbar Container */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#08080a]/95 border-b border-white/10 backdrop-blur-xl py-3 shadow-[0_10px_35px_rgba(0,0,0,0.9)]'
            : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-4.5 border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* Logo (Far Left) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-md bg-gradient-to-br from-[#ff5500] to-[#cc3d00] flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(255,85,0,0.4)] group-hover:shadow-[0_0_25px_rgba(255,85,0,0.7)] transition-all duration-300 border border-[#ff5500]/60">
                <Flame className="w-6 h-6 text-black fill-black group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                {/* Flame glow effect */}
                <div className="absolute inset-0 rounded-md bg-[#ff5500] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white flex items-center gap-1 font-['Outfit'] uppercase">
                  RPM <span className="text-[#ff5500] group-hover:text-white transition-colors duration-300">VAULT</span>
                </span>
                <span className="text-[9px] tracking-[0.28em] uppercase text-gray-400 font-extrabold -mt-1 group-hover:text-gray-200 transition-colors">
                  MOTORS & GARAGE
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav Links (Center / Spread - Plain text with animated slide underline) */}
          <nav className="hidden md:flex items-center gap-9" onMouseLeave={() => setHoveredIndex(null)}>
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path || 
                (link.path !== '/' && location.pathname.startsWith(link.path));
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.07, ease: "easeOut" }}
                  className="relative py-2"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <Link
                    to={link.path}
                    className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors duration-200 ${
                      isActive
                        ? 'text-white font-black'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Active Link Underline (Solid Orange 3px line) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff5500] rounded-t-sm shadow-[0_0_10px_#ff5500]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover Line Animation for Non-Active Links */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="hoverNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff5500]/80 rounded-t-sm shadow-[0_0_8px_#ff5500]"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Action Buttons (Far Right) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            className="hidden md:flex items-center gap-3.5"
          >
            {/* Wishlist Square Icon Button (Sharp/Minimal Corners) */}
            <Link
              to="/bikes"
              className="p-2.5 rounded-md bg-[#121215] text-gray-300 hover:text-white border border-white/10 hover:border-[#ff5500]/80 hover:bg-[#18181d] transition-all duration-300 relative group shadow-md hover:shadow-[0_0_15px_rgba(255,85,0,0.25)]"
              title="Wishlist / Vault"
            >
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 group-hover:text-red-500" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff5500] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_8px_#ff5500]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Rugged Industrial CTA Button (Sharp 6-8px corners, pulse icon animation) */}
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-md bg-gradient-to-r from-[#ff5500] via-[#e04b00] to-[#ff5500] bg-[length:200%_auto] hover:bg-right text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(255,85,0,0.3)] hover:shadow-[0_0_25px_rgba(255,85,0,0.6)] border border-[#ff5500]/70 flex items-center gap-2 group"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneCall className="w-3.5 h-3.5 text-white" />
              </motion.div>
              <span>Sell / Enquire</span>
            </Link>
          </motion.div>

          {/* Mobile Hamburger Button (Sharp rounded-md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-md bg-[#121215] text-white border border-white/10 hover:border-[#ff5500] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff5500]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slim 1px Gradient Divider Line at Navbar Bottom */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#ff5500]/30 to-transparent" />

      {/* Mobile Full-Width Slide Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden w-full bg-[#08080a]/98 backdrop-blur-2xl border-b border-[#ff5500]/30 px-6 py-6 transition-all shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path || 
                  (link.path !== '/' && location.pathname.startsWith(link.path));

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-md font-extrabold text-xs uppercase tracking-widest flex items-center justify-between border transition-all ${
                        isActive
                          ? 'bg-[#ff5500] text-white border-[#ff5500] shadow-[0_0_15px_rgba(255,85,0,0.4)]'
                          : 'text-gray-300 hover:bg-[#141418] hover:text-white border-white/5 hover:border-[#ff5500]/40'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3 mt-2">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-md bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,85,0,0.4)] flex items-center justify-center gap-2 border border-[#ff5500]/60"
                >
                  <PhoneCall className="w-4 h-4 animate-pulse" /> Sell / Enquire Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

