import React, { useEffect } from 'react'

const TrendingGames = ({ games }) => {

    return (
        <>
            <div className='mt-5 mb-2'>
                <h1 className='font-bold text-3xl Bungee hidden md:block'>Trending Games</h1>
            </div>
            <div className='rounded-2xl md:grid grid-cols-4 hidden md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {games.map((game, index) => index < 4 && (
                    <div key={game.id} className='cursor-pointer group hover:scale-y-110 hover:scale-x-105 transition-all duration-300 ease-in-out rounded-lg bg-gray-700'>
                        <img src={game.background_image} className='rounded-t-lg h-[20rem] rounded-lg object-cover' />
                        <h2 className='Bungee p-2'>{game.name}</h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TrendingGames
