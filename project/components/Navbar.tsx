"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Gamepad2, Home, Mail, Star, List, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-black sticky top-0 z-50 px-4 sm:px-8 py-3 flex justify-between items-center flex-wrap shadow-lg">
        <Link href="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform">
          Game<span className="text-red-600">Tech</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md lg:max-w-xl mx-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a Game..."
            className="w-full px-4 py-2 rounded-l-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-r-full hover:bg-red-700 transition-colors"
          >
            <Search size={20} />
          </button>
        </form>

        <button
          onClick={toggleSidebar}
          className="md:hidden text-white text-2xl hover:rotate-90 transition-transform"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white hover:text-red-600 transition-colors">Home</Link>
          <Link href="/contact" className="text-white hover:text-red-600 transition-colors">Contact us</Link>
          <Link href="/request" className="text-white hover:text-red-600 transition-colors">Request Games</Link>
          <Link href="/tracker" className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-bold transition-all hover:shadow-lg">Game Tracker</Link>
        </div>
      </div>

      {/* Secondary Navbar */}
      <div className="hidden md:flex bg-white sticky top-16 z-40 py-3 justify-center gap-8 shadow-md">
        <Link href="/popular" className="text-red-900/50 font-bold hover:text-red-600 transition-colors relative group">
          Popular Games
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all"></span>
        </Link>
        <Link href="/top-rated" className="text-red-900/50 font-bold hover:text-red-600 transition-colors relative group">
          Top Rated
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all"></span>
        </Link>
        <Link href="/games" className="text-red-900/50 font-bold hover:text-red-600 transition-colors relative group">
          All Games
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all"></span>
        </Link>
        <div className="relative group">
          <button className="text-red-900/50 font-bold hover:text-red-600 transition-colors">
            Categories
          </button>
          <div className="absolute top-full left-0 bg-white shadow-lg rounded-md hidden group-hover:block min-w-[150px]">
            <Link href="/category/action" className="block px-4 py-2 hover:bg-gray-100">Action</Link>
            <Link href="/category/adventure" className="block px-4 py-2 hover:bg-gray-100">Adventure</Link>
            <Link href="/category/rpg" className="block px-4 py-2 hover:bg-gray-100">RPG</Link>
            <Link href="/category/shooter" className="block px-4 py-2 hover:bg-gray-100">Shooter</Link>
            <Link href="/category/strategy" className="block px-4 py-2 hover:bg-gray-100">Strategy</Link>
            <Link href="/category/sports" className="block px-4 py-2 hover:bg-gray-100">Sports</Link>
          </div>
        </div>
        <Link href="/latest" className="text-red-900/50 font-bold hover:text-red-600 transition-colors relative group">
          Latest Releases
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all"></span>
        </Link>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-[#111] text-white z-50 transition-transform duration-300 shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-4 py-2 rounded-l-full bg-white text-gray-800 focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-red-600 rounded-r-full">
                <Search size={18} />
              </button>
            </div>
          </form>

          <nav className="space-y-2">
            <Link
              href="/"
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-red-600 transition-all border-l-2 border-transparent hover:border-red-600 hover:pl-5"
            >
              <Home size={20} /> Home
            </Link>
            <Link
              href="/contact"
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-red-600 transition-all border-l-2 border-transparent hover:border-red-600 hover:pl-5"
            >
              <Mail size={20} /> Contact us
            </Link>
            <Link
              href="/request"
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-red-600 transition-all border-l-2 border-transparent hover:border-red-600 hover:pl-5"
            >
              <Gamepad2 size={20} /> Request Games
            </Link>
            <Link
              href="/popular"
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-red-600 transition-all border-l-2 border-transparent hover:border-red-600 hover:pl-5"
            >
              <Star size={20} /> Popular
            </Link>
            <Link
              href="/top-rated"
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-red-600 transition-all border-l-2 border-transparent hover:border-red-600 hover:pl-5"
            >
              <Star size={20} /> Top Rated
            </Link>
            <Link
              href="/games"
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-red-600 transition-all border-l-2 border-transparent hover:border-red-600 hover:pl-5"
            >
              <List size={20} /> All Games
            </Link>
            <Link
              href="/latest"
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 hover:text-red-600 transition-all border-l-2 border-transparent hover:border-red-600 hover:pl-5"
            >
              <Calendar size={20} /> Latest Releases
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
        ></div>
      )}
    </>
  );
}
