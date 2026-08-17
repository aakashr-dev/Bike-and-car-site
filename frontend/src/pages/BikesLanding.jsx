import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import VehicleCard from '../components/VehicleCard';
import FilterBar from '../components/FilterBar';
import DrivingDivider from '../components/DrivingDivider';
import { allBikes } from '../data/allVehicles';
import { ArrowRight } from 'lucide-react';

export default function BikesLanding({ onToggleFavorite, favoritesList = [], onOpenEnquire, onToggleCompare, comparedList = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [priceRange, setPriceRange] = useState(400000);
  const [sortBy, setSortBy] = useState('FEATURED');

  const brandsList = Array.from(new Set(allBikes.map(b => b.brand)));

  const isFav = (id) => favoritesList.some(v => v.id === id);
  const isComp = (id) => comparedList.some(v => v.id === id);

  const filteredBikes = allBikes.filter(bike => {
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
            RIDE THE <span className="text-[#ff5500]">LEGENDS</span>
          </>
        }
        subtitle="Explore certified pre-owned 650cc twin cruisers, naked streetfighters, supersports, and high-efficiency scooters."
        badgeText="PRE-OWNED BIKES INVENTORY"
        backgroundImage="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1920&q=80"
        heroVehicleImage="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80"
        vehicleType="bike"
        breadcrumbs={[{ label: 'Bikes Vault' }]}
        primaryCtaText="EXPLORE GEAR BIKES"
        primaryCtaLink="/bikes/gear-bikes"
        secondaryCtaText="EXPLORE SCOOTERS"
        secondaryCtaLink="/bikes/scooters"
      />

      {/* SUB-CATEGORY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/bikes/scooters"
            className="group bg-[#141418] border border-white/10 hover:border-[#ff5500]/50 rounded-3xl p-6 flex items-center justify-between transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 shadow-xl transform-gpu"
          >
            <div className="space-y-2">
              <span className="text-xs font-black text-[#ff5500] uppercase tracking-widest block">
                SUB-CATEGORY 1
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit']">
                Scooters & Electric Mopeds
              </h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Activa 6G, TVS Ntorq Race XP, Ather 450X EV, Suzuki Access 125.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#ff5500] text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out shrink-0 transform-gpu">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>

          <Link
            to="/bikes/gear-bikes"
            className="group bg-[#141418] border border-white/10 hover:border-[#ff5500]/50 rounded-3xl p-6 flex items-center justify-between transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 shadow-xl transform-gpu"
          >
            <div className="space-y-2">
              <span className="text-xs font-black text-[#ff5500] uppercase tracking-widest block">
                SUB-CATEGORY 2
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit']">
                Gear Bikes (100cc - 650cc+)
              </h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Divided into Small CC (100-150cc), Mid CC (150-300cc), and High CC Superbikes (300cc+).
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#ff5500] text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out shrink-0 transform-gpu">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>
        </div>
      </section>

      <DrivingDivider type="bike" label="ALL BIKES INVENTORY" />

      {/* FILTER & INVENTORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white uppercase font-['Outfit']">
              ALL BIKES INVENTORY ({filteredBikes.length})
            </h2>
            <p className="text-xs text-gray-400">Filter by budget, brand, or engine capacity</p>
          </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>
    </div>
  );
}
