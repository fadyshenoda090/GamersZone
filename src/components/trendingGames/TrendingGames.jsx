import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrendingGames = ({ games }) => {
  const navigate = useNavigate();

  return (
    <section className='mt-5 mb-2'>
      <h1 className='font-bold text-3xl Bungee hidden md:block px-1'>Trending Games</h1>
      <div className='rounded-2xl md:grid grid-cols-4 hidden md:grid-cols-2 lg:grid-cols-4 gap-4 p-1'>
        {games.map((game, index) => index < 4 && (
          <article onClick={() => { navigate(`/details/${game.id}`) }} key={game.id} className='cursor-pointer group hover:scale-y-110 hover:scale-x-105 transition-all duration-300 ease-in-out rounded-lg bg-gray-700'>
            <img src={game.background_image} className='rounded-t-lg h-[20rem] rounded-lg object-fit' alt={game.name} />
            <h2 className='Bungee p-2'>{game.name}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TrendingGames;
