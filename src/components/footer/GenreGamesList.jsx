import React, { useEffect } from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaComment } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";

const GenreGamesList = ({ games }) => {
  return (
    <>
      <h2 className='mt-5 font-bold text-3xl Bungee hidden md:block'>Popular Games</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2'>
        {
          games.map((game, index) => (
            <div key={index} className='flex flex-col rounded-lg bg-gray-800
            hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'>
              <div className='relative'>
                <img src={game.background_image} className='w-full h-[15rem] rounded-t-md md:object-cover' alt={game.name} />
              </div>
              <div className='p-4'>
                <h2 className='dark:text-white Bungee text-xl md:text-lg lg:text-xl mb-2'>
                  {game.name} <span className='text-xs bg-emerald-800 p-1 rounded-lg'>{game.metacritic}</span>
                </h2>
                <div className='flex gap-2 justify-start items-center mb-2'>
                  <div className='flex items-center'>
                    <TiStarFullOutline className='text-amber-400 text-2xl' />
                    <p className='dark:text-white RockSalt ms-1 text-gray-300'>{game.rating}</p>
                  </div>
                  <div className='flex items-center mx-1'>
                    <FaComment className='text-gray-400 dark:text-white text-2xl' />
                    <p className='dark:text-white RockSalt ms-1 text-gray-300'>{game.reviews_count}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaFire className='text-orange-500 text-2xl' />
                    <p className='dark:text-white RockSalt ms-1 text-gray-300'>{game.suggestions_count}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>

  )
}

export default GenreGamesList
