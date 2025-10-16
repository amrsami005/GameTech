import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/gamesData';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.id}`} className="block group">
      <div className="bg-[#2a2a2a] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-600/30 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none">
        {game.badge && (
          <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
            {game.badge}
          </span>
        )}

        <div className="relative h-32 overflow-hidden">
          <Image
            src={game.image}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-3">
          <h3 className="font-bold text-white mb-1 text-sm truncate">
            {game.title}
          </h3>
          <p className="text-gray-400 text-xs">{game.size}</p>
        </div>
      </div>
    </Link>
  );
}
