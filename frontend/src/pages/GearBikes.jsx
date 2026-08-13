import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import VehicleCard from '../components/VehicleCard';
import FilterBar from '../components/FilterBar';
import DrivingDivider from '../components/DrivingDivider';

import smallCcBikes from '../data/smallCcBikes.json';
import midCcBikes from '../data/midCcBikes.json';
import highCcBikes from '../data/highCcBikes.json';

export default function GearBikes({ onToggleFavorite, favoritesList = [], onOpenEnquire, onToggleCompare, comparedList = [] }) {
  const allGearBikes = [...smallCcBikes, ...midCcBikes, ...highCcBikes];

  const [ccTab, setCcTab] = useState('ALL'); // 'ALL', 'small-cc', 'mid-cc', 'high-cc'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [priceRange, setPriceRange] = useState(400000);
  const [sortBy, setSortBy] = useState('FEATURED');

  const activeDataset = ccTab === 'ALL'
    ? allGearBikes
    : ccTab === 'small-cc'
    ? smallCcBikes
    : ccTab === 'mid-cc'
    ? midCcBikes
    : highCcBikes;

  const brandsList = Array.from(new Set(activeDataset.map(b => b.brand)));

  const isFav = (id) => favoritesList.some(v => v.id === id);
  const isComp = (id) => comparedList.some(v => v.id === id);

  const filteredBikes = activeDataset.filter(bike => {
    const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bike.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'ALL' || bike.brand === selectedBrand;
    const matchesPrice = bike.price <= priceRange;
    return matchesSearch && matchesBrand && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'PRICE_LOW_HIGH') return a.price - b.price;
    if (sortBy === 'PRICE_HIGH_LOW') return b.price - a.price;
    if (sortBy === 'YEAR_NEW') return b.modelYear - a.modelYear;
    if (sortBy === 'KM_LOW') return a.kmDriven - b.kmDriven;
    return 0;
  });

  const handleReset = () => {
    setCcTab('ALL');
    setSearchQuery('');
    setSelectedBrand('ALL');
    setPriceRange(400000);
    setSortBy('FEATURED');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 100vh HERO SECTION */}
      <HeroSection
        title={
          <>
            GEAR BIKES <span className="text-[#ff5500]">BY ENGINE CC</span>
          </>
        }
        subtitle="Unmatched torque & adrenaline. Filter by engine displacement: Small CC commuter, Mid CC sports, or High CC Superbikes."
        badgeText="SUB-CATEGORY: GEAR BIKES"
        backgroundImage="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920&q=80"
        heroVehicleImage="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80"
        vehicleType="bike"
        breadcrumbs={[
          { label: 'Bikes Vault', link: '/bikes' },
          { label: 'Gear Bikes' }
        ]}
      />

      {/* CC DISPLACEMENT FILTER TABS WITH ANIMATED GARAGE REVEAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141418] border border-white/10 p-3 sm:p-4 rounded-3xl mb-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setCcTab('ALL')}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
              ccTab === 'ALL'
                ? 'bg-[#ff5500] text-white shadow-lg shadow-[#ff5500]/40'
                : 'bg-[#0a0a0c] text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            All Engine CCs ({allGearBikes.length})
          </button>

          <button
            onClick={() => setCcTab('small-cc')}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
              ccTab === 'small-cc'
                ? 'bg-[#ff5500] text-white shadow-lg shadow-[#ff5500]/40'
                : 'bg-[#0a0a0c] text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            Small CC (100cc - 150cc) [{smallCcBikes.length}]
          </button>

          <button
            onClick={() => setCcTab('mid-cc')}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
              ccTab === 'mid-cc'
                ? 'bg-[#ff5500] text-white shadow-lg shadow-[#ff5500]/40'
                : 'bg-[#0a0a0c] text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            Mid CC (150cc - 300cc) [{midCcBikes.length}]
          </button>

          <button
            onClick={() => setCcTab('high-cc')}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
              ccTab === 'high-cc'
                ? 'bg-[#ff5500] text-white shadow-lg shadow-[#ff5500]/40'
                : 'bg-[#0a0a0c] text-gray-300 hover:text-white border border-white/10'
            }`}
          >
            High CC (300cc+) [{highCcBikes.length}]
          </button>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          brandsList={brandsList}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={400000}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleReset}
        />

        <DrivingDivider type="bike" label="ACCURATE CC CATEGORY INVENTORY" />

        {/* Animated Grid on Tab Switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ccTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBikes.map(bike => (
              <VehicleCard
                key={bike.id}
                vehicle={bike}
                isFavorite={isFav(bike.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenEnquire={onOpenEnquire}
                isCompared={isComp(bike.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
