import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import VehicleCard from '../components/VehicleCard';
import FilterBar from '../components/FilterBar';
import DrivingDivider from '../components/DrivingDivider';
import oldCarsData from '../data/oldModelCars.json';

export default function OldModelCars({ onToggleFavorite, favoritesList = [], onOpenEnquire, onToggleCompare, comparedList = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [fuelFilter, setFuelFilter] = useState('ALL');
  const [priceRange, setPriceRange] = useState(500000);
  const [sortBy, setSortBy] = useState('FEATURED');

  const brandsList = Array.from(new Set(oldCarsData.map(c => c.brand)));

  const isFav = (id) => favoritesList.some(v => v.id === id);
  const isComp = (id) => comparedList.some(v => v.id === id);

  const filteredOldCars = oldCarsData.filter(car => {
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
    setPriceRange(500000);
    setSortBy('FEATURED');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 100vh HERO SECTION */}
      <HeroSection
        title={
          <>
            OLD MODEL & <span className="text-[#ff5500]">BUDGET CARS</span>
          </>
        }
        subtitle="Unbeatable value for money. Verified old model classics (2005-2015) with bulletproof engine life & low maintenance costs."
        badgeText="SUB-CATEGORY: OLD MODEL CARS"
        backgroundImage="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80"
        heroVehicleImage="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
        vehicleType="car"
        breadcrumbs={[
          { label: 'Cars Vault', link: '/cars' },
          { label: 'Old Model Cars' }
        ]}
      />

      <DrivingDivider type="car" label="CLASSIC OLD MODEL INVENTORY" />

      {/* INVENTORY LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-white uppercase font-['Outfit']">
            OLD MODEL CARS ({filteredOldCars.length})
          </h2>
          <p className="text-xs text-gray-400">Strictly old manufacturing years (2005-2015): Swift VXi, Honda City 2012, i10, Alto 800</p>
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
          maxPrice={600000}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleReset}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOldCars.map(car => (
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
