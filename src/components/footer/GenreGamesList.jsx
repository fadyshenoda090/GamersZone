import React from 'react';
import { TiStarFullOutline } from 'react-icons/ti';
import { FaComment, FaFire } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GenreGamesList = ({ games, selectedGenreName }) => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className='mt-5 font-bold text-3xl Bungee hidden md:block px-1'>{selectedGenreName} Games</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 p-1'>
        {games.map((game, index) => (
          <div
            onClick={() => navigate(`/details/${game.id}`)}
            key={index}
            className='flex flex-col rounded-lg bg-gray-800 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'
          >
            <div className='relative'>
              <img src={game.background_image} className='w-full h-[15rem] rounded-t-md md:object-fit' alt={game.name} />
            </div>
            <div className='p-4'>
              <h2 className='dark:text-white Bungee text-xl md:text-lg lg:text-xl mb-2'>
                {game.name} <span className='text-xs bg-emerald-800 p-1 rounded-lg'>{game.metacritic}</span>
              </h2>
              <div className='flex gap-2 justify-start items-center mb-2'>
                <GameInfoIcon icon={<TiStarFullOutline className='text-amber-400 text-2xl' />} value={game.rating} />
                <GameInfoIcon icon={<FaComment className='text-gray-400 dark:text-white text-2xl' />} value={game.reviews_count} />
                <GameInfoIcon icon={<FaFire className='text-orange-500 text-2xl' />} value={game.suggestions_count} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const GameInfoIcon = ({ icon, value }) => (
  <div className='flex items-center'>
    {icon}
    <p className='dark:text-white RockSalt ms-1 text-gray-300'>{value}</p>
  </div>
);

export default GenreGamesList;
