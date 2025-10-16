import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/gamesData';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="block group">
      <div className="bg-[#2a2a2a] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/20 relative">
        {game.badge && (
          <span className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            {game.badge}
          </span>
        )}

        <div className="relative h-36 overflow-hidden">
          <Image
            src={game.image}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-4">
          <h3 className="font-bold text-white mb-1 truncate group-hover:text-red-600 transition-colors">
            {game.title}
          </h3>
          <p className="text-gray-400 text-sm">{game.size}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500 text-sm">★ {game.rating}</span>
            <span className="text-gray-500 text-xs">• {game.release_year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
