import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, ChevronDown } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  brandsList = [],
  priceRange,
  setPriceRange,
  maxPrice = 4000000,
  fuelFilter,
  setFuelFilter,
  sortBy,
  setSortBy,
  onReset
}) {
  return (
    <div className="bg-[#141418] border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 shadow-xl">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by vehicle name, brand (e.g. Royal Enfield, Thar, BMW, Duke)..."
            className="w-full pl-11 pr-4 py-3 bg-[#0a0a0c] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5500] transition-colors"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Brand Selector */}
          {brandsList.length > 0 && (
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="appearance-none bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 pr-9 text-xs font-semibold text-gray-200 focus:outline-none focus:border-[#ff5500] cursor-pointer"
              >
                <option value="ALL">All Brands</option>
                {brandsList.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}

          {/* Sort By Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 pr-9 text-xs font-semibold text-gray-200 focus:outline-none focus:border-[#ff5500] cursor-pointer"
            >
              <option value="FEATURED">Featured First</option>
              <option value="PRICE_LOW_HIGH">Price: Low to High</option>
              <option value="PRICE_HIGH_LOW">Price: High to Low</option>
              <option value="YEAR_NEW">Year: Newest</option>
              <option value="KM_LOW">KM: Lowest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Fuel Filter Pills */}
          {fuelFilter !== undefined && (
            <div className="flex items-center gap-1 bg-[#0a0a0c] p-1 rounded-xl border border-white/10 text-xs">
              {['ALL', 'Petrol', 'Diesel', 'Electric'].map((fuel) => (
                <button
                  key={fuel}
                  onClick={() => setFuelFilter(fuel)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    fuelFilter === fuel
                      ? 'bg-[#ff5500] text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {fuel}
                </button>
              ))}
            </div>
          )}

          {/* Reset Filter Button */}
          {onReset && (
            <button
              onClick={onReset}
              className="px-3.5 py-3 rounded-xl bg-[#1c1c24] hover:bg-[#262632] text-xs font-bold text-gray-300 border border-white/10 flex items-center gap-1.5 transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Price Range Slider Bar */}
      {priceRange !== undefined && (
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#ff5500]" />
            <span className="font-semibold">Max Price Budget:</span>
            <span className="font-bold text-white text-sm font-['Outfit']">
              ₹{(priceRange / 100000).toFixed(2)} Lakhs
            </span>
          </div>
          <input
            type="range"
            min={50000}
            max={maxPrice}
            step={50000}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full sm:w-64 accent-[#ff5500] cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
