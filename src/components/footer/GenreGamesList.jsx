import React, { useEffect } from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaComment } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";

const GenreGamesList = ({ games }) => {
  useEffect(() => {
    console.log('games', games);
  }, [])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5'>
  {
    games.map((game, index) => (
      <div key={index} className='flex flex-col rounded-lg overflow-hidden'>
        <div className='relative'>
          <img src={game.background_image} className='w-full h-[15rem] rounded-t-md object-cover' alt={game.name} />
        </div>
        <div className='p-4'>
          <h2 className='dark:text-white RockSalt text-xl md:text-2xl lg:text-3xl mb-2'>
            {game.name} <span>{game.metacritic}</span>
          </h2>
          <div className='flex gap-2 justify-start items-center mb-2'>
            <div className='flex items-center'>
              <TiStarFullOutline className='text-amber-400 text-2xl' />
              <p className='dark:text-white RockSalt ms-1'>{game.rating}</p>
            </div>
            <div className='flex items-center mx-1'>
              <FaComment className='text-gray-400 dark:text-white text-2xl' />
              <p className='dark:text-white RockSalt ms-1'>{game.reviews_count}</p>
            </div>
            <div className='flex items-center gap-2'>
              <FaFire className='text-orange-500 text-2xl' />
              <p className='dark:text-white RockSalt ms-1'>{game.suggestions_count}</p>
            </div>
          </div>
        </div>
      </div>
    ))
  }
</div>

  )
}

export default GenreGamesList
