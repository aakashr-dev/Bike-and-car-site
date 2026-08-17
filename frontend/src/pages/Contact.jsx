import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import { MapPin, Phone, Clock, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', vehicleInterest: 'Bike', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', vehicleInterest: 'Bike', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 100vh HERO SECTION */}
      <HeroSection
        title={
          <>
            GET IN <span className="text-[#ff5500]">TOUCH WITH US</span>
          </>
        }
        subtitle="Visit our main garage showroom, schedule a home test drive, or request instant vehicle valuation."
        badgeText="CONTACT & LOCATIONS"
        backgroundImage="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=80"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details & Showroom Cards */}
          <div className="space-y-8">
            <div>
              <span className="text-[#ff5500] font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30">
                SHOWROOM LOCATIONS
              </span>
              <h2 className="text-3xl font-black text-white uppercase font-['Outfit'] mt-3">
                VISIT THE RPM VAULT GARAGE
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Drop by to inspect over 150+ bikes and cars under one roof with active test drive tracks.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="bg-[#141418] border border-white/10 hover:border-[#ff5500]/40 transition-[border-color,box-shadow] duration-300 p-6 rounded-2xl flex items-start gap-4 transform-gpu"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base font-['Outfit']">Main Flagship Showroom</h4>
                  <p className="text-xs text-gray-300 mt-1">#42, Mount-Poonamallee High Rd, Guindy, Chennai, Tamil Nadu 600032</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="bg-[#141418] border border-white/10 hover:border-[#ff5500]/40 transition-[border-color,box-shadow] duration-300 p-6 rounded-2xl flex items-start gap-4 transform-gpu"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base font-['Outfit']">Phone & WhatsApp Hotline</h4>
                  <p className="text-xs text-gray-300 mt-1">Sales: +91 98840 99000 • Valuation: +91 98400 11223</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="bg-[#141418] border border-white/10 hover:border-[#ff5500]/40 transition-[border-color,box-shadow] duration-300 p-6 rounded-2xl flex items-start gap-4 transform-gpu"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base font-['Outfit']">Working Hours</h4>
                  <p className="text-xs text-gray-300 mt-1">Monday - Sunday: 9:30 AM - 8:30 PM (All 7 Days Open)</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact & Valuation Form */}
          <div className="bg-[#141418] border border-white/10 p-8 rounded-3xl space-y-6 shadow-2xl relative">
            <h3 className="text-2xl font-black text-white font-['Outfit']">Send an Enquiry or Sell Your Vehicle</h3>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-white font-['Outfit']">Message Sent!</h4>
                <p className="text-xs text-gray-300">
                  Thank you! Our sales team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff5500]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Interested In</label>
                    <select
                      value={form.vehicleInterest}
                      onChange={(e) => setForm({ ...form, vehicleInterest: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-[#ff5500]"
                    >
                      <option value="Bike">Buying a Used Bike</option>
                      <option value="Car">Buying a Used Car</option>
                      <option value="Sell">Selling My Bike/Car</option>
                      <option value="Loan">Loan / EMI Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what model or budget you're looking for..."
                    className="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff5500]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white font-extrabold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#ff5500]/30"
                >
                  Send Message Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
