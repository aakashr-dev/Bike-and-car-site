import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, PhoneCall, Heart, Menu, X, ChevronRight, Bike, Car } from 'lucide-react';

export default function Navbar({ wishlistCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      
      {/* Top Edge Power-On LED Accent Strip */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff5500] to-transparent shadow-[0_0_10px_#ff5500]" />

      {/* Main Full-Width Navbar Container */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0c]/95 border-b border-white/10 backdrop-blur-xl py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* Logo (Far Left) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff5500] to-[#e04b00] flex items-center justify-center text-black font-black shadow-lg shadow-[#ff5500]/30 group-hover:scale-105 group-hover:shadow-[#ff5500]/60 transition-all border border-[#ff5500]/50">
                <Flame className="w-6 h-6 text-black fill-black group-hover:rotate-12 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white flex items-center gap-1 font-['Outfit'] uppercase">
                  RPM <span className="text-[#ff5500]">VAULT</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-gray-400 font-bold -mt-1">
                  MOTORS & GARAGE
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav Links (Center/Full spread - Plain text with animated underline, NO pill container) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path || 
                (link.path !== '/' && location.pathname.startsWith(link.path));

              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                  className="relative py-2"
                >
                  <Link
                    to={link.path}
                    className={`text-sm font-extrabold uppercase tracking-wider transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Active / Hover Animated Underline (3px Solid Orange Line) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff5500] rounded-t-sm shadow-[0_0_8px_#ff5500]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Action Buttons (Far Right) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden md:flex items-center gap-3"
          >
            {/* Wishlist Square Icon Button */}
            <Link
              to="/bikes"
              className="p-2.5 rounded-lg bg-[#141418] text-gray-300 hover:text-white border border-white/10 hover:border-[#ff5500]/60 transition-all relative group shadow-md"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform group-hover:text-red-500" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff5500] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Rugged Industrial CTA Button with Gently Pulsing Phone Icon */}
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[#ff5500]/30 border border-[#ff5500]/60 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-white animate-pulse" />
              Sell / Enquire
            </Link>
          </motion.div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg bg-[#141418] text-white border border-white/10 hover:border-[#ff5500]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Bottom 1px Subtle Gradient Border Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Mobile Full-Width Slide Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-[65px] bg-[#0a0a0c]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all shadow-2xl z-50"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-extrabold text-sm uppercase tracking-wider flex items-center justify-between border ${
                      location.pathname === link.path
                        ? 'bg-[#ff5500] text-white border-[#ff5500]'
                        : 'text-gray-300 hover:bg-[#141418] border-transparent'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3.5 rounded-lg bg-[#ff5500] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
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
