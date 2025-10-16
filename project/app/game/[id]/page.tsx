import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getGameById, gamesLibrary } from '@/lib/gamesData';
import { Download, Play, Heart, Bell, EyeOff } from 'lucide-react';
import MediaGallery from './MediaGallery';

export function generateStaticParams() {
  return gamesLibrary.map((game) => ({
    id: game.id,
  }));
}

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const game = getGameById(resolvedParams.id);

  if (!game) {
    notFound();
  }

  const relatedGames = gamesLibrary
    .filter(g => g.id !== game.id && g.genre.some(genre => game.genre.includes(genre)))
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-black/80 to-black/80 bg-cover bg-center py-12 px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${game.image})`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="mb-8 flex flex-wrap gap-2 text-sm">
            <Link href="/games" className="text-red-400 hover:text-red-500">All Games</Link>
            <span className="text-gray-500">›</span>
            <Link href={`/category/${game.genre[0].toLowerCase()}`} className="text-red-400 hover:text-red-500">
              {game.genre[0]}
            </Link>
            <span className="text-gray-500">›</span>
            <span className="text-gray-400">{game.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <Image
                src={game.image}
                alt={game.title}
                width={300}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-2">{game.title}</h1>
              <p className="text-gray-400 mb-6">{game.developer}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {game.platforms.map((platform) => (
                  <span key={platform} className="bg-[#333] px-3 py-1 rounded text-sm">
                    {platform}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all">
                  <Download size={20} /> Download
                </button>
                <button className="bg-[#333] hover:bg-[#444] px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all">
                  <Play size={20} /> Play with GAME PASS
                </button>
              </div>

              <div className="text-gray-400 text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-yellow-500">★</span>
                  <span className="font-bold">{game.rating}</span> Rating
                </p>
                <p><strong>Size:</strong> {game.size}</p>
                <p><strong>Release Year:</strong> {game.release_year}</p>
                <p><strong>Genres:</strong> {game.genre.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-800" />

      {/* Media Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-6">{game.title}</h2>
        <MediaGallery game={game} />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 my-6">
          <button className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors">
            <Heart size={20} /> Add to Wishlist
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors">
            <Bell size={20} /> Follow
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors">
            <EyeOff size={20} /> Ignore
          </button>
        </div>

        {/* About The Game */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 relative inline-block pb-2">
            About The Game
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-red-600"></span>
          </h2>
          <p className="text-lg leading-relaxed mb-4">{game.long_description}</p>
        </section>

        {/* System Requirements */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 relative inline-block pb-2">
            System Requirements
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-red-600"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl text-red-600 mb-4">Minimum Requirements</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">OS:</strong> {game.requirements.minimum.os}
                </li>
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">Processor:</strong> {game.requirements.minimum.processor}
                </li>
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">Memory:</strong> {game.requirements.minimum.memory}
                </li>
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">Graphics:</strong> {game.requirements.minimum.graphics}
                </li>
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">Storage:</strong> {game.requirements.minimum.storage}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-red-600 mb-4">Recommended Requirements</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">OS:</strong> {game.requirements.recommended.os}
                </li>
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">Processor:</strong> {game.requirements.recommended.processor}
                </li>
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">Memory:</strong> {game.requirements.recommended.memory}
                </li>
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">Graphics:</strong> {game.requirements.recommended.graphics}
                </li>
                <li className="pb-3 border-b border-gray-800">
                  <strong className="text-red-600">Storage:</strong> {game.requirements.recommended.storage}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* More Like This */}
        {relatedGames.length > 0 && (
          <section className="my-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold relative inline-block pb-2">
                More Like This
                <span className="absolute bottom-0 left-0 w-20 h-1 bg-red-600"></span>
              </h2>
              <Link href="/games" className="text-red-400 hover:text-red-500">See All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedGames.map((relatedGame) => (
                <Link key={relatedGame.id} href={`/game/${relatedGame.id}`} className="group">
                  <div className="relative aspect-video mb-2 rounded overflow-hidden">
                    <Image
                      src={relatedGame.image}
                      alt={relatedGame.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="text-sm font-medium truncate group-hover:text-red-600 transition-colors">
                    {relatedGame.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
