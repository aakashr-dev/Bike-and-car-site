import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import VehicleCard from '../components/VehicleCard';
import FilterBar from '../components/FilterBar';
import DrivingDivider from '../components/DrivingDivider';
import { allCars } from '../data/allVehicles';
import { ArrowRight } from 'lucide-react';

export default function CarsLanding({ onToggleFavorite, favoritesList = [], onOpenEnquire, onToggleCompare, comparedList = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [fuelFilter, setFuelFilter] = useState('ALL');
  const [priceRange, setPriceRange] = useState(4000000);
  const [sortBy, setSortBy] = useState('FEATURED');

  const brandsList = Array.from(new Set(allCars.map(c => c.brand)));

  const isFav = (id) => favoritesList.some(v => v.id === id);
  const isComp = (id) => comparedList.some(v => v.id === id);

  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'ALL' || car.brand === selectedBrand;
    const matchesFuel = fuelFilter === 'ALL' || car.fuelType === fuelFilter;
    const matchesPrice = car.price <= priceRange;
    return matchesSearch && matchesBrand && matchesFuel && matchesPrice;
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
    setFuelFilter('ALL');
    setPriceRange(4000000);
    setSortBy('FEATURED');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 100vh HERO SECTION */}
      <HeroSection
        title={
          <>
            DRIVE YOUR <span className="text-[#ff5500]">DREAM CAR</span>
          </>
        }
        subtitle="Certified pre-owned sedans, rugged 4x4 SUVs, vintage budget hatchbacks, and executive sports cars."
        badgeText="PRE-OWNED CARS VAULT"
        backgroundImage="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=80"
        heroVehicleImage="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
        vehicleType="car"
        breadcrumbs={[{ label: 'Cars Vault' }]}
        primaryCtaText="OLD MODEL CLASSICS"
        primaryCtaLink="/cars/old-models"
        secondaryCtaText="TOP & LATEST MODELS"
        secondaryCtaLink="/cars/top-models"
      />

      {/* SUB-CATEGORY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/cars/old-models"
            className="group bg-[#141418] border border-white/10 hover:border-[#ff5500]/50 rounded-3xl p-6 flex items-center justify-between transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 shadow-xl transform-gpu"
          >
            <div className="space-y-2">
              <span className="text-xs font-black text-[#ff5500] uppercase tracking-widest block">
                SUB-CATEGORY 1
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit']">
                Old Model & Budget Cars
              </h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Budget friendly under 4 Lakhs: Swift VXi (2013), Honda City (2012), i10 (2011), Alto (2014).
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#ff5500] text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out shrink-0 transform-gpu">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>

          <Link
            to="/cars/top-models"
            className="group bg-[#141418] border border-white/10 hover:border-emerald-500/50 rounded-3xl p-6 flex items-center justify-between transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 shadow-xl transform-gpu"
          >
            <div className="space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block">
                SUB-CATEGORY 2
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit']">
                Top & Latest Model Cars
              </h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Premium recent models (2020-2025): Thar 4x4, BMW 330i M Sport, Safari Dark, Creta DCT.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out shrink-0 transform-gpu">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-200" />
            </div>
          </Link>
        </div>
      </section>

      <DrivingDivider type="car" label="ALL CARS INVENTORY" />

      {/* FILTER & INVENTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-white uppercase font-['Outfit']">
            ALL CARS INVENTORY ({filteredCars.length})
          </h2>
          <p className="text-xs text-gray-400">Filter by petrol, diesel, transmission, or budget</p>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          brandsList={brandsList}
          fuelFilter={fuelFilter}
          setFuelFilter={setFuelFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={4000000}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleReset}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <VehicleCard
              key={car.id}
              vehicle={car}
              isFavorite={isFav(car.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenEnquire={onOpenEnquire}
              isCompared={isComp(car.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
