import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompareDrawer({ comparedVehicles = [], onRemoveCompare, onClearCompare }) {
  const [showModal, setShowModal] = useState(false);

  if (comparedVehicles.length === 0) return null;

  return (
    <>
      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#141418]/95 border border-[#ff5500]/50 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-4 max-w-2xl w-[92%] sm:w-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#ff5500] flex items-center justify-center text-white font-black text-xs">
            {comparedVehicles.length}
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-white block">Compare Selected</span>
            <span className="text-[10px] text-gray-400">Max 3 vehicles</span>
          </div>
        </div>

        {/* Selected Thumbnail List */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-xs py-1">
          {comparedVehicles.map((v) => (
            <div key={v.id} className="relative group shrink-0">
              <img
                src={v.image}
                alt={v.name}
                className="w-10 h-10 object-cover rounded-lg border border-white/20"
              />
              <button
                onClick={() => onRemoveCompare(v.id)}
                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl bg-[#ff5500] hover:bg-[#e04b00] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#ff5500]/30"
          >
            Compare Now
          </button>
          <button
            onClick={onClearCompare}
            className="p-2 text-gray-400 hover:text-white text-xs font-bold"
            title="Clear all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full Comparison Overlay Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl p-4 sm:p-8 overflow-y-auto flex items-center justify-center">
          <div className="max-w-5xl w-full bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#1c1c24] text-gray-400 hover:text-white border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-black text-white font-['Outfit'] mb-6 flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#ff5500]" /> Side-by-Side Comparison
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedVehicles.map((v) => (
                <div key={v.id} className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-4 space-y-4">
                  <img src={v.image} alt={v.name} className="w-full h-40 object-cover rounded-xl" />
                  <div className="text-xs font-bold uppercase text-[#ff5500]">{v.brand}</div>
                  <h3 className="font-extrabold text-white text-lg font-['Outfit'] line-clamp-1">{v.name}</h3>
                  <div className="text-xl font-black text-white font-['Outfit'] text-gradient-orange">{v.formattedPrice}</div>

                  <div className="space-y-2 text-xs border-t border-white/10 pt-4 text-gray-300">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500">Year:</span>
                      <span className="font-bold text-white">{v.modelYear}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500">KM Driven:</span>
                      <span className="font-bold text-white">{v.kmDriven.toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500">Fuel / Engine:</span>
                      <span className="font-bold text-white">{v.engineCC || v.fuelType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500">Condition:</span>
                      <span className="font-bold text-emerald-400">{v.condition}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-gray-500">Score:</span>
                      <span className="font-bold text-[#ff5500]">{v.inspectionScore} / 10</span>
                    </div>
                  </div>

                  <Link
                    to={`/vehicle/${v.type}/${v.id}`}
                    onClick={() => setShowModal(false)}
                    className="w-full py-2.5 rounded-xl bg-[#1c1c24] hover:bg-[#ff5500] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/10"
                  >
                    Full Specs <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
