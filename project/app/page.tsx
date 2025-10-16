"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import GameCard from '@/components/GameCard';
import { gamesLibrary } from '@/lib/gamesData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trendingGames, setTrendingGames] = useState(gamesLibrary.slice(0, 8));
  const [recommendedGames, setRecommendedGames] = useState(gamesLibrary.slice(8, 16));
  const [mostDownloadedGames, setMostDownloadedGames] = useState(gamesLibrary.slice(16, 24));

  const heroImages = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80',
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1920&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const loadMore = (section: string) => {
    if (section === 'trending') {
      setTrendingGames(prev => [...prev, ...gamesLibrary.slice(prev.length, prev.length + 6)]);
    } else if (section === 'recommended') {
      setRecommendedGames(prev => [...prev, ...gamesLibrary.slice(8 + prev.length - 8, 8 + prev.length - 8 + 6)]);
    } else if (section === 'downloaded') {
      setMostDownloadedGames(prev => [...prev, ...gamesLibrary.slice(16 + prev.length - 8, 16 + prev.length - 8 + 6)]);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c]">
      <section className="relative h-[350px] md:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-red-600 w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 max-w-[1400px] mx-auto">
        <h3 className="text-3xl font-bold mb-6 relative inline-block slide-in text-white">
          Trending Now
          <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded"></span>
        </h3>
        <div className="overflow-x-auto pb-4 scrollbar-custom">
          <div className="flex gap-6 min-w-min">
            {trendingGames.map((game) => (
              <div key={game.id} className="flex-shrink-0 w-[220px] fade-in">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => loadMore('trending')}
            className="bg-[#ff2d20] hover:bg-[#ff1a1a] text-white px-6 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:-translate-y-1 pulse"
          >
            Load More
          </button>
        </div>
      </section>

      <section className="py-8 px-4 max-w-[1400px] mx-auto">
        <h3 className="text-3xl font-bold mb-6 relative inline-block slide-in text-white">
          Recommended For You
          <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded"></span>
        </h3>
        <div className="overflow-x-auto pb-4 scrollbar-custom">
          <div className="flex gap-6 min-w-min">
            {recommendedGames.map((game) => (
              <div key={game.id} className="flex-shrink-0 w-[220px] fade-in">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => loadMore('recommended')}
            className="bg-[#ff2d20] hover:bg-[#ff1a1a] text-white px-6 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:-translate-y-1 pulse"
          >
            Load More
          </button>
        </div>
      </section>

      <section className="py-8 px-4 max-w-[1400px] mx-auto">
        <h3 className="text-3xl font-bold mb-6 relative inline-block slide-in text-white">
          Most Downloaded Games
          <span className="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded"></span>
        </h3>
        <div className="overflow-x-auto pb-4 scrollbar-custom">
          <div className="flex gap-6 min-w-min">
            {mostDownloadedGames.map((game) => (
              <div key={game.id} className="flex-shrink-0 w-[220px] fade-in">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => loadMore('downloaded')}
            className="bg-[#ff2d20] hover:bg-[#ff1a1a] text-white px-6 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:-translate-y-1 pulse"
          >
            Load More
          </button>
        </div>
      </section>

      <div className="flex justify-center gap-3 my-8">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={`w-10 h-10 rounded-full font-bold transition-all ${
              page === 1
                ? 'bg-red-600 text-white scale-110'
                : 'bg-[#333] text-white hover:bg-red-600 hover:-translate-y-1'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <section
        className="py-24 px-4 text-center my-12 fade-in"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-white">Explore our catalogue</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            There are thousands of games waiting for you to explore. Browse by genre, features, price, and more to find your next favorite game.
          </p>
          <Link
            href="/games"
            className="inline-block bg-[#ff2d20] hover:bg-[#ff1a1a] text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1"
          >
            See all games
          </Link>
        </div>
      </section>
    </div>
  );
}
