import React, { useEffect } from 'react';

function Banner({ game }) {

  return <div className='relative'>
    <div className='absolute bottom-0 p-5 bg-gradient-to-t from-slate-900 to to-transparent w-full'>
    
      <h2 className='game-name text-3xl bg-gradient-to-t from-orange-100 via-red-600 to-yellow-00 RockSalt'>
        {game.name}
      </h2>
      <button className='bg-gradient-to-t from-orange-400 via-orange-600 to-orange-700 hover:bg-gradient-to-tl px-10 py-1 text-xl rounded-lg  Rubik  font-bold '>
        Get Now
        </button>
    </div>

    <img src={game.background_image} alt="Game image" className='w-full h-[20rem] rounded-lg' />
  </div>;
}

export default Banner;
