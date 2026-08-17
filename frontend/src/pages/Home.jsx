import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import VehicleCard from '../components/VehicleCard';
import EmiCalculator from '../components/EmiCalculator';
import DrivingDivider from '../components/DrivingDivider';
import { Bike, Car, ShieldCheck, Tag, Zap, Award, Star, ArrowRight } from 'lucide-react';

import { allVehicles, allBikes, allCars } from '../data/allVehicles';

export default function Home({ onToggleFavorite, favoritesList = [], onOpenEnquire, onToggleCompare, comparedList = [] }) {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'BIKES', 'CARS'

  const featuredListings = activeTab === 'ALL'
    ? allVehicles
    : activeTab === 'BIKES'
    ? allBikes
    : allCars;

  const isFav = (id) => favoritesList.some(v => v.id === id);
  const isComp = (id) => comparedList.some(v => v.id === id);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION (Only "UNLEASH THE ROAD" Title + "EXPLORE BIKES" & "EXPLORE CARS" Buttons) */}
      <HeroSection
        title={
          <>
            UNLEASH THE <span className="text-[#ff5500]">ROAD</span>
          </>
        }
        subtitle={null}
        badgeText={null}
        backgroundImage="/images/d288a462-f339-41fa-a1ab-d545de56e0f8.png"
        brightBg={true}
        heroVehicleImage={null}
        primaryCtaText="EXPLORE BIKES"
        primaryCtaLink="/bikes"
        secondaryCtaText="EXPLORE CARS"
        secondaryCtaLink="/cars"
      />

      {/* DRIVING DIVIDER 1 */}
      <DrivingDivider type="bike" label="POPULAR VAULT CATEGORIES" />

      {/* 2. OVERVIEW SECTION (Bikes + Cars Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#ff5500] font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30">
            CHOOSE YOUR MACHINERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-['Outfit'] tracking-tight mt-3">
            EXPLORE THE VAULT CATEGORIES
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Handpicked pre-owned vehicles tested on 200+ safety & performance parameters with warranty backup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: BIKES */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[420px] rounded-3xl overflow-hidden border border-white/15 metal-border flex flex-col justify-end p-8 transform-gpu"
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/60 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5500] text-white text-xs font-black uppercase tracking-wider shadow-md">
                <Bike className="w-4 h-4" /> PRE-OWNED BIKES
              </div>
              <h3 className="text-3xl font-black text-white font-['Outfit'] uppercase">
                Scooters & Superbikes
              </h3>
              <p className="text-gray-300 text-sm max-w-md">
                From daily city scooters (Activa, Ather EV) to 650cc Royal Enfield cruisers and KTM race beasts.
              </p>
              <Link
                to="/bikes"
                className="inline-flex items-center gap-2 text-[#ff5500] font-extrabold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300 ease-out transform-gpu"
              >
                Browse All Bikes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: CARS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-[420px] rounded-3xl overflow-hidden border border-white/15 metal-border flex flex-col justify-end p-8 transform-gpu"
          >
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/60 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-md">
                <Car className="w-4 h-4" /> PRE-OWNED CARS
              </div>
              <h3 className="text-3xl font-black text-white font-['Outfit'] uppercase">
                Old Models & Luxury SUVs
              </h3>
              <p className="text-gray-300 text-sm max-w-md">
                Find reliable budget old-model classics (Swift, City) and latest top-tier SUVs (Thar 4x4, BMW, Safari).
              </p>
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300 ease-out transform-gpu"
              >
                Browse All Cars <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED LISTINGS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#ff5500] font-extrabold text-xs uppercase tracking-widest">
              HOTTEST INVENTORY
            </span>
            <h2 className="text-3xl font-black text-white uppercase font-['Outfit'] tracking-tight mt-1">
              FEATURED VEHICLES
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 bg-[#141418] p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold uppercase transition-all duration-200 ${
                activeTab === 'ALL' ? 'bg-[#ff5500] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Vehicles ({allVehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('BIKES')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold uppercase transition-all duration-200 ${
                activeTab === 'BIKES' ? 'bg-[#ff5500] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Bikes ({allBikes.length})
            </button>
            <button
              onClick={() => setActiveTab('CARS')}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold uppercase transition-all duration-200 ${
                activeTab === 'CARS' ? 'bg-[#ff5500] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Cars ({allCars.length})
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredListings.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isFavorite={isFav(vehicle.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenEnquire={onOpenEnquire}
              isCompared={isComp(vehicle.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </motion.div>
      </section>

      {/* DRIVING DIVIDER 2 */}
      <DrivingDivider type="car" label="RPM CERTIFIED QUALITY PROMISE" />

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="bg-[#141418]/60 border-y border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-white uppercase font-['Outfit'] tracking-tight">
              WHY BUY FROM RPM VAULT?
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              We eliminate pre-owned buying anxiety with certified quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl text-center space-y-3 hover:border-[#ff5500]/40 transition-[border-color,box-shadow] duration-300 transform-gpu will-change-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-white text-lg font-['Outfit']">200+ Point Checked</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every bike and car passes engine diagnostic, chassis, and brake stress testing before listing.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl text-center space-y-3 hover:border-[#ff5500]/40 transition-[border-color,box-shadow] duration-300 transform-gpu will-change-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 flex items-center justify-center mx-auto">
                <Tag className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-white text-lg font-['Outfit']">Transparent Pricing</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zero hidden broker fees. True market value estimation backed by live vehicle health scores.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl text-center space-y-3 hover:border-[#ff5500]/40 transition-[border-color,box-shadow] duration-300 transform-gpu will-change-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-white text-lg font-['Outfit']">Instant Paperwork</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Hassle-free RTO transfer, name change documentation, and instant loan approvals within 2 hours.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl text-center space-y-3 hover:border-[#ff5500]/40 transition-[border-color,box-shadow] duration-300 transform-gpu will-change-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/30 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-white text-lg font-['Outfit']">Warranty Protection</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Includes 6-month engine warranty and free roadside assistance across all major highways.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. EMI CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmiCalculator defaultAmount={350000} />
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#ff5500] font-extrabold text-xs uppercase tracking-widest">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl font-black text-white uppercase font-['Outfit'] tracking-tight mt-1">
            WHAT RIDER & DRIVERS SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            className="bg-[#141418] border border-white/10 hover:border-[#ff5500]/30 transition-[border-color,box-shadow] duration-300 p-6 rounded-2xl space-y-4 transform-gpu"
          >
            <div className="flex items-center gap-1 text-[#f59e0b]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
              ))}
            </div>
            <p className="text-xs text-gray-300 italic leading-relaxed">
              "Bought a Royal Enfield GT 650 from RPM Vault. The bike was spotless with complete service logs. The RTO name transfer took just 3 days. Highly recommended garage!"
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ff5500] text-white font-bold flex items-center justify-center text-xs">
                KR
              </div>
              <div>
                <h5 className="font-bold text-white text-xs font-['Outfit']">Karthik Raja</h5>
                <span className="text-[10px] text-gray-400">Chennai • GT 650 Owner</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            className="bg-[#141418] border border-white/10 hover:border-emerald-500/30 transition-[border-color,box-shadow] duration-300 p-6 rounded-2xl space-y-4 transform-gpu"
          >
            <div className="flex items-center gap-1 text-[#f59e0b]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
              ))}
            </div>
            <p className="text-xs text-gray-300 italic leading-relaxed">
              "Purchased a Mahindra Thar 4x4. Their 200 point inspection scorecard gave me 100% confidence. Transparent pricing with zero hidden dealer cut."
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                VS
              </div>
              <div>
                <h5 className="font-bold text-white text-xs font-['Outfit']">Vikram Sundaram</h5>
                <span className="text-[10px] text-gray-400">Bangalore • Thar 4x4 Owner</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            className="bg-[#141418] border border-white/10 hover:border-[#f59e0b]/30 transition-[border-color,box-shadow] duration-300 p-6 rounded-2xl space-y-4 transform-gpu"
          >
            <div className="flex items-center gap-1 text-[#f59e0b]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
              ))}
            </div>
            <p className="text-xs text-gray-300 italic leading-relaxed">
              "Sold my Honda Activa within 2 hours at RPM Vault and upgraded to an Ather 450X EV. Instant payment credit into my bank account."
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f59e0b] text-black font-bold flex items-center justify-center text-xs">
                PM
              </div>
              <div>
                <h5 className="font-bold text-white text-xs font-['Outfit']">Priya Mohan</h5>
                <span className="text-[10px] text-gray-400">Coimbatore • Ather 450X Owner</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
