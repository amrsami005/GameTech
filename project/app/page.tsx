"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GameCard from '@/components/GameCard';
import { gamesLibrary, getTopRatedGames, getLatestGames, getFreeGames } from '@/lib/gamesData';

export default function Home() {
  const [trendingGames, setTrendingGames] = useState(gamesLibrary.slice(0, 6));
  const [recommendedGames, setRecommendedGames] = useState(gamesLibrary.slice(6, 12));
  const [mostDownloadedGames, setMostDownloadedGames] = useState(gamesLibrary.slice(12, 18));

  const heroImages = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80',
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1920&q=80',
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMore = (section: string) => {
    if (section === 'trending') {
      setTrendingGames(prev => [...prev, ...gamesLibrary.slice(prev.length, prev.length + 6)]);
    } else if (section === 'recommended') {
      setRecommendedGames(prev => [...prev, ...gamesLibrary.slice(6 + prev.length, 6 + prev.length + 6)]);
    } else if (section === 'downloaded') {
      setMostDownloadedGames(prev => [...prev, ...gamesLibrary.slice(12 + prev.length, 12 + prev.length + 6)]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${heroImages[currentHero]})`,
          }}
        >
          <div className="max-w-7xl mx-auto h-full flex items-center px-6">
            <div className="text-left">
              <h1 className="text-6xl font-bold mb-4 animate-fade-in">GameTech</h1>
              <p className="text-2xl text-blue-400 mb-6 animate-slide-in">
                Discover, collect, analyze your games
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-red-600"></span>
                    <span className="text-sm">Played</span>
                  </div>
                  <strong className="text-xl">35.7M</strong>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-green-600"></span>
                    <span className="text-sm">Games</span>
                  </div>
                  <strong className="text-xl">228K</strong>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                    <span className="text-sm">Ratings</span>
                  </div>
                  <strong className="text-xl">20.9M</strong>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
                    <span className="text-sm">Reviews</span>
                  </div>
                  <strong className="text-xl">2.51M</strong>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-red-600"></span>
                    <span className="text-sm">Lists</span>
                  </div>
                  <strong className="text-xl">441K</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 relative inline-block">
          Trending Now
          <span className="absolute bottom-0 left-0 w-20 h-1 bg-red-600"></span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {trendingGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {trendingGames.length < gamesLibrary.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => loadMore('trending')}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Recommended For You */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 relative inline-block">
          Recommended For You
          <span className="absolute bottom-0 left-0 w-20 h-1 bg-red-600"></span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {recommendedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {recommendedGames.length < gamesLibrary.length - 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => loadMore('recommended')}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Most Downloaded Games */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 relative inline-block">
          Most Downloaded Games
          <span className="absolute bottom-0 left-0 w-20 h-1 bg-red-600"></span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {mostDownloadedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {mostDownloadedGames.length < gamesLibrary.length - 12 && (
          <div className="text-center mt-8">
            <button
              onClick={() => loadMore('downloaded')}
              className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:-translate-y-1"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-black/70 to-black/70 bg-cover bg-center my-12"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80')`
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Explore our catalogue</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            There are thousands of games waiting for you to explore. Browse by genre, features, price, and more to find your next favorite game.
          </p>
          <Link href="/games" className="inline-block bg-red-600 hover:bg-red-700 px-10 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
            See all games
          </Link>
        </div>
      </section>
    </div>
  );
}
