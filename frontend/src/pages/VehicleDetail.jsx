import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import EmiCalculator from '../components/EmiCalculator';
import DrivingDivider from '../components/DrivingDivider';
import { allVehicles } from '../data/allVehicles';
import { ShieldCheck, Heart, Layers, Star, CheckCircle, ArrowLeft } from 'lucide-react';

export default function VehicleDetail({ onToggleFavorite, favoritesList = [], onOpenEnquire, onToggleCompare, comparedList = [] }) {
  const { type, id } = useParams();

  const vehicle = allVehicles.find(v => v.id === id) || allVehicles[0];
  const [activeImage, setActiveImage] = useState(vehicle.image);

  const isFav = favoritesList.some(v => v.id === vehicle.id);
  const isComp = comparedList.some(v => v.id === vehicle.id);
  const galleryList = vehicle.gallery || [vehicle.image];

  return (
    <div className="space-y-16 pb-20">
      {/* 100vh HERO BANNER FOR INDIVIDUAL VEHICLE WITH DRIVE-IN VEHICLE */}
      <HeroSection
        title={vehicle.name}
        subtitle={`${vehicle.brand} • ${vehicle.modelYear} Model • ${vehicle.kmDriven.toLocaleString()} KM • ${vehicle.location}`}
        badgeText={`CERTIFIED ${vehicle.type.toUpperCase()}`}
        backgroundImage={vehicle.image}
        heroVehicleImage={vehicle.image}
        vehicleType={vehicle.type}
        breadcrumbs={[
          { label: `${vehicle.type.toUpperCase()}S VAULT`, link: `/${vehicle.type}s` },
          { label: vehicle.name }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to={`/${vehicle.type}s`}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#ff5500] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {vehicle.type === 'bike' ? 'Bikes' : 'Cars'} Vault
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column (2 Cols): Gallery & Specs */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery Viewer */}
            <div className="space-y-4">
              <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                <img
                  src={activeImage}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-extrabold text-xs shadow-md">
                    VERIFIED VEHICLE
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-black/70 text-gray-200 font-semibold text-xs border border-white/20">
                    {vehicle.condition}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {galleryList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {galleryList.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === imgUrl ? 'border-[#ff5500] scale-105 shadow-md' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-extrabold text-white font-['Outfit']">Overview & Seller Comments</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{vehicle.description}</p>

              {/* Key Highlight Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                <div className="bg-[#0a0a0c] p-3 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-400 block uppercase">Ownership</span>
                  <span className="text-sm font-bold text-white">{vehicle.ownership}</span>
                </div>
                <div className="bg-[#0a0a0c] p-3 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-400 block uppercase">Fuel Type</span>
                  <span className="text-sm font-bold text-white">{vehicle.fuelType}</span>
                </div>
                <div className="bg-[#0a0a0c] p-3 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-400 block uppercase">Color</span>
                  <span className="text-sm font-bold text-white">{vehicle.color}</span>
                </div>
                <div className="bg-[#0a0a0c] p-3 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-400 block uppercase">Location</span>
                  <span className="text-sm font-bold text-white truncate block">{vehicle.location.split(',')[0]}</span>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-extrabold text-white font-['Outfit']">Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {Object.entries(vehicle.specs || {}).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-2.5 px-4 rounded-xl bg-[#0a0a0c] border border-white/5">
                    <span className="text-gray-400 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-white font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-extrabold text-white font-['Outfit']">Key Features & Upgrades</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
                  {vehicle.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#ff5500]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Seller Box */}
          <div className="space-y-6">
            <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl sticky top-24">
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block">FIXED FAIR MARKET PRICE</span>
                <div className="text-4xl font-black text-white font-['Outfit'] text-gradient-orange mt-1">
                  {vehicle.formattedPrice}
                </div>
              </div>

              {/* Inspection Rating Box */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0a0a0c] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ff5500] text-white font-black flex items-center justify-center text-sm">
                    {vehicle.inspectionScore}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-xs">INSPECTION RATING</h5>
                    <span className="text-[10px] text-gray-400">Passed 200+ Quality Checks</span>
                  </div>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => onOpenEnquire(vehicle)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e04b00] text-white font-extrabold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#ff5500]/30"
                >
                  Contact Seller / Enquire
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onToggleFavorite(vehicle)}
                    className={`py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                      isFav ? 'bg-red-600 text-white border-red-600' : 'bg-[#0a0a0c] text-gray-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} /> {isFav ? 'Saved' : 'Save'}
                  </button>

                  <button
                    onClick={() => onToggleCompare(vehicle)}
                    className={`py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                      isComp ? 'bg-[#ff5500] text-white border-[#ff5500]' : 'bg-[#0a0a0c] text-gray-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <Layers className="w-4 h-4" /> {isComp ? 'Compared' : 'Compare'}
                  </button>
                </div>
              </div>

              {/* Seller Details */}
              {vehicle.seller && (
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">SELLER DETAILS</span>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-white text-sm font-['Outfit']">{vehicle.seller.name}</h4>
                      <span className="text-xs text-gray-400">{vehicle.seller.type} • Member since {vehicle.seller.memberSince}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#f59e0b] font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-[#f59e0b]" /> {vehicle.seller.rating}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DrivingDivider type={vehicle.type} label="CALCULATE YOUR ESTIMATED EMI" />

        <div className="mt-8">
          <EmiCalculator defaultAmount={vehicle.price} />
        </div>
      </div>
    </div>
  );
}
