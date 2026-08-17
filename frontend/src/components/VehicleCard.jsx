import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Flame, Gauge, Calendar, Fuel, MapPin, Heart, ArrowRight, Layers } from 'lucide-react';

export default function VehicleCard({
  vehicle,
  isFavorite = false,
  onToggleFavorite,
  onOpenEnquire,
  isCompared = false,
  onToggleCompare
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
      className="group bg-[#141418] rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff5500]/50 transition-[border-color,box-shadow] duration-300 shadow-xl flex flex-col h-full relative transform-gpu will-change-transform"
    >
      {/* Card Header Media Container */}
      <div className="relative h-56 overflow-hidden bg-black transform-gpu">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] opacity-90 group-hover:opacity-100 transform-gpu will-change-transform"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
          {vehicle.verified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/90 text-white text-[11px] font-extrabold shadow-md backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
            </span>
          )}
          {vehicle.isHotDeal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ff5500] text-white text-[11px] font-extrabold shadow-md animate-pulse">
              <Flame className="w-3.5 h-3.5" /> HOT DEAL
            </span>
          )}
          <span className="px-2.5 py-1 rounded-md bg-black/70 text-gray-300 text-[11px] font-semibold border border-white/15 backdrop-blur-md">
            {vehicle.condition}
          </span>
        </div>

        {/* Top Right Wishlist & Compare Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(vehicle)}
              className={`p-2 rounded-lg backdrop-blur-md transition-all duration-200 active:scale-95 transform-gpu ${
                isCompared
                  ? 'bg-[#ff5500] text-white shadow-lg shadow-[#ff5500]/50'
                  : 'bg-black/60 text-gray-300 hover:text-white hover:border-white/40 border border-white/20'
              }`}
              title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
            >
              <Layers className="w-4 h-4" />
            </button>
          )}

          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(vehicle)}
              className={`p-2 rounded-lg backdrop-blur-md transition-all duration-200 active:scale-95 transform-gpu ${
                isFavorite
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                  : 'bg-black/60 text-gray-300 hover:text-red-500 hover:border-white/40 border border-white/20'
              }`}
              title="Add to Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          )}
        </div>

        {/* Bottom Left Type Badge */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/15 text-gray-200 backdrop-blur-sm border border-white/10">
            {vehicle.type === 'bike' ? vehicle.subCategory || 'BIKE' : vehicle.subCategory || 'CAR'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Name */}
          <div className="text-xs font-bold uppercase tracking-wider text-[#ff5500] mb-1">
            {vehicle.brand}
          </div>
          <Link
            to={`/vehicle/${vehicle.type}/${vehicle.id}`}
            className="font-extrabold text-lg text-white hover:text-[#ff5500] transition-colors line-clamp-1 font-['Outfit']"
          >
            {vehicle.name}
          </Link>

          {/* Specs Pills Grid */}
          <div className="grid grid-cols-2 gap-2 my-4 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 bg-[#1c1c24] p-2 rounded-lg border border-white/5">
              <Calendar className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>{vehicle.modelYear} Model</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1c1c24] p-2 rounded-lg border border-white/5">
              <Gauge className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>{vehicle.kmDriven.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1c1c24] p-2 rounded-lg border border-white/5">
              <Fuel className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>{vehicle.engineCC || vehicle.fuelType || vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1c1c24] p-2 rounded-lg border border-white/5">
              <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
              <span className="truncate">{vehicle.location.split(',')[0]}</span>
            </div>
          </div>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">FIXED PRICE</span>
            <span className="text-xl font-extrabold text-white font-['Outfit'] text-gradient-orange">
              {vehicle.formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenEnquire && (
              <button
                onClick={() => onOpenEnquire(vehicle)}
                className="px-3 py-2 rounded-lg bg-[#1c1c24] hover:bg-[#262632] hover:text-white active:scale-95 text-xs font-bold text-gray-200 border border-white/10 transition-all duration-200 transform-gpu"
              >
                Enquire
              </button>
            )}

            <Link
              to={`/vehicle/${vehicle.type}/${vehicle.id}`}
              className="p-2.5 rounded-lg bg-[#ff5500] hover:bg-[#e04b00] active:scale-95 text-white transition-all duration-200 shadow-md shadow-[#ff5500]/30 transform-gpu flex items-center justify-center"
              title="View Details"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
