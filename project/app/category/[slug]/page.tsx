import GameCard from '@/components/GameCard';
import { gamesLibrary } from '@/lib/gamesData';

export function generateStaticParams() {
  return [
    { slug: 'action' },
    { slug: 'adventure' },
    { slug: 'rpg' },
    { slug: 'shooter' },
    { slug: 'strategy' },
    { slug: 'sports' },
  ];
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = params.slug;
  const games = gamesLibrary.slice(0, 24);

  const categoryTitles: { [key: string]: string } = {
    action: 'Action Games',
    adventure: 'Adventure Games',
    rpg: 'RPG Games',
    shooter: 'Shooter Games',
    strategy: 'Strategy Games',
    sports: 'Sports Games',
  };

  const title = categoryTitles[category] || 'Games';

  return (
    <div className="min-h-screen bg-[#1c1c1c] py-12 px-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-white slide-in capitalize">
          {title}
          <span className="block w-20 h-1 bg-red-600 mt-4 rounded"></span>
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
          Browse our collection of {category} games
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
