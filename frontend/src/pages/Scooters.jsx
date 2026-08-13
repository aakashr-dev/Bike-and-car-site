import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import VehicleCard from '../components/VehicleCard';
import FilterBar from '../components/FilterBar';
import DrivingDivider from '../components/DrivingDivider';
import scootersData from '../data/scooters.json';

export default function Scooters({ onToggleFavorite, favoritesList = [], onOpenEnquire, onToggleCompare, comparedList = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [priceRange, setPriceRange] = useState(150000);
  const [sortBy, setSortBy] = useState('FEATURED');

  const brandsList = Array.from(new Set(scootersData.map(b => b.brand)));

  const isFav = (id) => favoritesList.some(v => v.id === id);
  const isComp = (id) => comparedList.some(v => v.id === id);

  const filteredScooters = scootersData.filter(bike => {
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
    setPriceRange(150000);
    setSortBy('FEATURED');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 100vh HERO SECTION */}
      <HeroSection
        title={
          <>
            SCOOTERS & <span className="text-[#ff5500]">EV MOPEDS</span>
          </>
        }
        subtitle="High mileage gearless scooters & high-tech smart electric vehicles tested for battery health and smoothness."
        badgeText="SUB-CATEGORY: SCOOTERS"
        backgroundImage="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1920&q=80"
        heroVehicleImage="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=1200&q=80"
        vehicleType="bike"
        breadcrumbs={[
          { label: 'Bikes Vault', link: '/bikes' },
          { label: 'Scooters' }
        ]}
      />

      <DrivingDivider type="bike" label="SCOOTERS INVENTORY" />

      {/* INVENTORY LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-white uppercase font-['Outfit']">
            PRE-OWNED SCOOTERS LISTINGS ({filteredScooters.length})
          </h2>
          <p className="text-xs text-gray-400">Strictly scooters: Honda Activa, TVS Ntorq, Ather 450X EV, Suzuki Access, Fascino</p>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          brandsList={brandsList}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          maxPrice={200000}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleReset}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScooters.map(scooter => (
            <VehicleCard
              key={scooter.id}
              vehicle={scooter}
              isFavorite={isFav(scooter.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenEnquire={onOpenEnquire}
              isCompared={isComp(scooter.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
