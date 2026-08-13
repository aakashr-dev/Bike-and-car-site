import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import VehicleCard from '../components/VehicleCard';
import FilterBar from '../components/FilterBar';
import DrivingDivider from '../components/DrivingDivider';
import topCarsData from '../data/topModelCars.json';

export default function TopModelCars({ onToggleFavorite, favoritesList = [], onOpenEnquire, onToggleCompare, comparedList = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [fuelFilter, setFuelFilter] = useState('ALL');
  const [priceRange, setPriceRange] = useState(4000000);
  const [sortBy, setSortBy] = useState('FEATURED');

  const brandsList = Array.from(new Set(topCarsData.map(c => c.brand)));

  const isFav = (id) => favoritesList.some(v => v.id === id);
  const isComp = (id) => comparedList.some(v => v.id === id);

  const filteredTopCars = topCarsData.filter(car => {
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
            TOP & LATEST <span className="text-[#ff5500]">MODEL CARS</span>
          </>
        }
        subtitle="Flagship luxury SUVs, 4x4 off-roaders, automatic turbo petrols, and high-tech connected vehicles (2020-2025)."
        badgeText="SUB-CATEGORY: TOP & LATEST MODELS"
        backgroundImage="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=80"
        heroVehicleImage="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
        vehicleType="car"
        breadcrumbs={[
          { label: 'Cars Vault', link: '/cars' },
          { label: 'Top Model Cars' }
        ]}
      />

      <DrivingDivider type="car" label="PREMIUM LATEST MODEL INVENTORY" />

      {/* INVENTORY LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-white uppercase font-['Outfit']">
            PREMIUM TOP MODEL CARS ({filteredTopCars.length})
          </h2>
          <p className="text-xs text-gray-400">Strictly recent model years (2020-2025): Thar 4x4, BMW 330i M Sport, Safari Dark Edition & Creta DCT</p>
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
          {filteredTopCars.map(car => (
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
