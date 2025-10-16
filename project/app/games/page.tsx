"use client";

import { useState } from 'react';
import GameCard from '@/components/GameCard';
import { gamesLibrary } from '@/lib/gamesData';
import { Filter } from 'lucide-react';

export default function AllGamesPage() {
  const [filteredGames, setFilteredGames] = useState(gamesLibrary);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedSize, setSelectedSize] = useState('size-all');
  const [searchQuery, setSearchQuery] = useState('');

  const genres = ['all', 'action', 'adventure', 'rpg', 'shooter', 'strategy', 'sports', 'racing'];
  const sizes = [
    { id: 'size-all', label: 'All', count: gamesLibrary.length },
    { id: 'size-small', label: 'Under 5GB', count: gamesLibrary.filter(g => parseFloat(g.size) < 5).length },
    { id: 'size-medium', label: '5GB - 50GB', count: gamesLibrary.filter(g => parseFloat(g.size) >= 5 && parseFloat(g.size) < 50).length },
    { id: 'size-large', label: '50GB - 100GB', count: gamesLibrary.filter(g => parseFloat(g.size) >= 50 && parseFloat(g.size) < 100).length },
    { id: 'size-xlarge', label: 'Over 100GB', count: gamesLibrary.filter(g => parseFloat(g.size) >= 100).length },
  ];

  const applyFilters = (genre: string, size: string, query: string) => {
    let filtered = [...gamesLibrary];

    if (genre !== 'all') {
      filtered = filtered.filter(game =>
        game.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      );
    }

    if (size !== 'size-all') {
      filtered = filtered.filter(game => {
        const sizeInGB = parseFloat(game.size);
        if (size === 'size-small') return sizeInGB < 5;
        if (size === 'size-medium') return sizeInGB >= 5 && sizeInGB < 50;
        if (size === 'size-large') return sizeInGB >= 50 && sizeInGB < 100;
        if (size === 'size-xlarge') return sizeInGB >= 100;
        return true;
      });
    }

    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(lowerQuery) ||
        game.developer.toLowerCase().includes(lowerQuery) ||
        game.genre.some(g => g.toLowerCase().includes(lowerQuery))
      );
    }

    setFilteredGames(filtered);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    applyFilters(genre, selectedSize, searchQuery);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    applyFilters(selectedGenre, size, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(selectedGenre, selectedSize, query);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-black/80 to-black/80 bg-cover bg-center py-20 px-6 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80')`
        }}
      >
        <h1 className="text-5xl font-bold mb-4">Premium PC Games Collection</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover the ultimate collection of PC games. From action-packed adventures to immersive RPGs,
          find your next favorite game. All games available for direct download.
        </p>
      </div>

      <hr className="border-gray-800" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search games..."
                className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] text-white border border-gray-700 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Genre Filter */}
            <div className="bg-[#111] p-6 rounded-xl mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-gray-400" />
                <h3 className="text-sm uppercase font-bold text-gray-400">Category</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreChange(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedGenre === genre
                        ? 'bg-red-600 text-white'
                        : 'bg-[#333] text-gray-300 hover:bg-[#444]'
                    }`}
                  >
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="bg-[#111] p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-gray-400" />
                <h3 className="text-sm uppercase font-bold text-gray-400">Size</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeChange(size.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSize === size.id
                        ? 'bg-red-600 text-white'
                        : 'bg-[#333] text-gray-300 hover:bg-[#444]'
                    }`}
                  >
                    {size.label} <span className="text-xs opacity-70">({size.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 text-gray-400">
              Showing {filteredGames.length} of {gamesLibrary.length} games
            </div>

            {filteredGames.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold mb-4">No games found</h3>
                <p className="text-gray-400">Try adjusting your filters to see more games</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
