import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, PhoneCall, CheckCircle, ShieldCheck } from 'lucide-react';

export default function EnquireModal({ vehicle, isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: 'Hi, I am interested in this vehicle. Please send me inspection details and book a test drive.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const whatsappMessage = vehicle
    ? encodeURIComponent(`Hello RPM Vault! I want to enquire about ${vehicle.name} (${vehicle.formattedPrice}). Link: ${window.location.href}`)
    : '';

  return (
    <AnimatePresence>
      {isOpen && vehicle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-[#141418] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden transform-gpu"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-black/40 text-gray-400 hover:text-white hover:bg-black/80 transition-all border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white font-['Outfit']">Enquiry Received!</h3>
                <p className="text-sm text-gray-300">
                  Thank you, <span className="text-[#ff5500] font-bold">{formData.name}</span>. Our automotive advisor will call you at <span className="text-white font-bold">{formData.phone}</span> within 15 minutes with test drive booking details.
                </p>
              </div>
            ) : (
              <div>
                {/* Vehicle Preview Card */}
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#0a0a0c] border border-white/10 mb-6">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-20 h-16 object-cover rounded-xl shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold tracking-widest text-[#ff5500] uppercase block">
                      {vehicle.brand}
                    </span>
                    <h4 className="font-extrabold text-white text-sm line-clamp-1 font-['Outfit']">
                      {vehicle.name}
                    </h4>
                    <span className="text-sm font-bold text-gray-300">
                      {vehicle.formattedPrice}
                    </span>
                  </div>
                </div>

                {/* Direct Quick Contact Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <a
                    href={`https://wa.me/919884099000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" /> WhatsApp Chat
                  </a>

                  <a
                    href={`tel:${vehicle.seller?.phone || '+919884099000'}`}
                    className="px-4 py-3 rounded-xl bg-[#1c1c24] hover:bg-[#262632] text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-[#ff5500]" /> Call Seller
                  </a>
                </div>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#141418] px-3 text-gray-400 font-semibold">Or Request Callback</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 bg-[#0a0a0c] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-[#0a0a0c] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Custom Note / Questions</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0a0c] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white font-extrabold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#ff5500]/30"
                  >
                    Submit Interest & Book Test Drive
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No spam. 100% Privacy Protected. Verified Sellers Only.</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
