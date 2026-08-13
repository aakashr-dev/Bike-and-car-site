import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, MapPin, Phone, Mail, Clock, ShieldCheck, Share2, Globe, MessageSquare, Send, Bike, Car } from 'lucide-react';

export default function Footer() {
  // Continuous Driving Marquee Items
  const marqueeItems = [
    { type: 'bike', label: 'GT 650' },
    { type: 'car', label: 'Thar 4x4' },
    { type: 'bike', label: 'R15 V4' },
    { type: 'car', label: 'BMW 330i' },
    { type: 'bike', label: 'Duke 390' },
    { type: 'car', label: 'Safari Dark' },
    { type: 'bike', label: 'Ather 450X' },
    { type: 'car', label: 'Swift VXi' },
    { type: 'bike', label: 'Activa 6G' },
    { type: 'car', label: 'Creta Turbo' },
  ];

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-gray-400 pt-0 pb-8 relative overflow-hidden">
      
      {/* Top Animated Horizontal Driving Marquee Strip */}
      <div className="bg-[#0e0e12] border-b border-white/10 py-3 overflow-hidden relative">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-wider">
              {item.type === 'bike' ? (
                <Bike className="w-4 h-4 text-[#ff5500] animate-bounce" />
              ) : (
                <Car className="w-4 h-4 text-emerald-400 animate-bounce" />
              )}
              <span>{item.label}</span>
              <span className="text-[#ff5500]">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Accent Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5500] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#f59e0b] flex items-center justify-center text-black font-black">
                <Flame className="w-6 h-6 text-black fill-black" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-['Outfit']">
                RPM <span className="text-[#ff5500]">VAULT</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              South India's premier destination for 100% verified pre-owned bikes, super sports motorcycles, scooters, classic old-models, and luxury modern cars. 200+ point quality inspection guaranteed.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-lg bg-[#141418] hover:bg-[#ff5500] hover:text-white transition-colors border border-white/10" title="Social">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-[#141418] hover:bg-[#ff5500] hover:text-white transition-colors border border-white/10" title="Website">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-[#141418] hover:bg-[#ff5500] hover:text-white transition-colors border border-white/10" title="Community">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-[#141418] hover:bg-[#ff5500] hover:text-white transition-colors border border-white/10" title="Newsletter">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-l-2 border-[#ff5500] pl-2 font-['Outfit']">
              Bikes Vault
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/bikes" className="hover:text-[#ff5500] transition-colors">All Pre-Owned Bikes</Link></li>
              <li><Link to="/bikes/scooters" className="hover:text-[#ff5500] transition-colors">Scooters & EV Mopeds</Link></li>
              <li><Link to="/bikes/gear-bikes" className="hover:text-[#ff5500] transition-colors">Small CC (100cc - 150cc)</Link></li>
              <li><Link to="/bikes/gear-bikes" className="hover:text-[#ff5500] transition-colors">Mid CC Performance</Link></li>
              <li><Link to="/bikes/gear-bikes" className="hover:text-[#ff5500] transition-colors">Superbikes (300cc+)</Link></li>
            </ul>
          </div>

          {/* Cars Vault */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-l-2 border-[#ff5500] pl-2 font-['Outfit']">
              Cars Vault
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/cars" className="hover:text-[#ff5500] transition-colors">All Used Cars</Link></li>
              <li><Link to="/cars/old-models" className="hover:text-[#ff5500] transition-colors">Budget Old Models</Link></li>
              <li><Link to="/cars/top-models" className="hover:text-[#ff5500] transition-colors">Top & Latest Models</Link></li>
              <li><Link to="/cars/top-models" className="hover:text-[#ff5500] transition-colors">Luxury SUVs & 4x4 Thar</Link></li>
              <li><Link to="/contact" className="hover:text-[#ff5500] transition-colors">Sell Your Car / Valuation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4 border-l-2 border-[#ff5500] pl-2 font-['Outfit']">
              Showroom Hub
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#ff5500] shrink-0 mt-0.5" />
                <span>#42, Mount-Poonamallee High Rd, Guindy, Chennai, Tamil Nadu 600032</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span className="text-white font-semibold">+91 98840 99000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>support@rpmvault.com</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-400 pt-1">
                <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                <span>Mon - Sun: 9:30 AM - 8:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} RPM Vault Pre-Owned Motors. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" /> 100% Inspected & Certified
            </span>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
