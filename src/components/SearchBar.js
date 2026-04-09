import React from 'react';

function SearchBar({ searchTerm, onSearchChange, categoryFilter, onCategoryChange, priceRange, onPriceRangeChange, sortBy, onSortChange, viewMode, onViewModeChange }) {
  return (
    <div className="bg-noor-dark-2 border border-noor-dark-3 rounded-lg p-4 mb-6 animate-fadeIn">
      {/* Search Input */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-noor-cream/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search sacred collections..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-noor-dark border border-noor-dark-3 rounded text-noor-cream text-sm tracking-wide placeholder-noor-cream/30 focus:outline-none focus:border-noor-gold/50"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 bg-noor-dark border border-noor-dark-3 rounded text-sm text-noor-cream focus:outline-none focus:border-noor-gold/50"
        >
          <option value="all">All Categories</option>
          <option value="Hazrat Imam Portraits & Religious Art">Hazrat Imam Portraits & Religious Art</option>
          <option value="Traditional Ismaili Wear">Traditional Ismaili Wear</option>
          <option value="Community Items">Community Items</option>
        </select>

        {/* Price Range */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-noor-cream/50">Price:</span>
          <span className="text-xs font-medium text-noor-gold">${priceRange[0]}</span>
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            className="w-24 h-1 bg-noor-dark-3 rounded-lg appearance-none cursor-pointer accent-noor-gold"
          />
          <span className="text-xs font-medium text-noor-gold">${priceRange[1]}</span>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 bg-noor-dark border border-noor-dark-3 rounded text-sm text-noor-cream focus:outline-none focus:border-noor-gold/50"
        >
          <option value="newest">Newest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

        {/* View Toggle */}
        <div className="flex items-center border border-noor-dark-3 rounded overflow-hidden ml-auto">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'bg-noor-gold text-noor-dark' : 'text-noor-cream/50 hover:bg-noor-dark-3'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 ${viewMode === 'list' ? 'bg-noor-gold text-noor-dark' : 'text-noor-cream/50 hover:bg-noor-dark-3'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
