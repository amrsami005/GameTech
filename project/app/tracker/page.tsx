"use client";

import { useState } from 'react';
import { Star, Clock, CheckCircle, Target } from 'lucide-react';
import GameCard from '@/components/GameCard';
import { gamesLibrary } from '@/lib/gamesData';

export default function GameTracker() {
  const [activeTab, setActiveTab] = useState('playing');
  const [games] = useState(gamesLibrary.slice(0, 12));

  const tabs = [
    { id: 'playing', label: 'Currently Playing', icon: <Clock size={20} /> },
    { id: 'completed', label: 'Completed', icon: <CheckCircle size={20} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Star size={20} /> },
    { id: 'backlog', label: 'Backlog', icon: <Target size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#1c1c1c] py-12 px-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-white slide-in">
          Game Tracker
          <span className="block w-20 h-1 bg-red-600 mt-4 rounded"></span>
        </h1>
        <p className="text-gray-400 mb-8 text-lg">Track your gaming journey and organize your collection</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg hover:shadow-red-600/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-red-600" size={24} />
              <h3 className="text-white font-bold">Playing</h3>
            </div>
            <p className="text-4xl font-bold text-white">12</p>
          </div>

          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg hover:shadow-red-600/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="text-green-600" size={24} />
              <h3 className="text-white font-bold">Completed</h3>
            </div>
            <p className="text-4xl font-bold text-white">48</p>
          </div>

          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg hover:shadow-red-600/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Star className="text-yellow-600" size={24} />
              <h3 className="text-white font-bold">Wishlist</h3>
            </div>
            <p className="text-4xl font-bold text-white">23</p>
          </div>

          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg hover:shadow-red-600/20 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-blue-600" size={24} />
              <h3 className="text-white font-bold">Backlog</h3>
            </div>
            <p className="text-4xl font-bold text-white">35</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333] hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {games.map((game) => (
            <div key={game.id} className="fade-in">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
