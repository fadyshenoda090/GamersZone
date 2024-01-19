import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/axiosInstance';

const Details = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);

  useEffect(() => {
    const getSimilarGames = async () => {
      try {
        const response = await axiosInstance.get(`/games/${id}/game-series`);
        setSimilarGames(response.data.results);
        // console.log('similar games', response.data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    }
    getSimilarGames();
  }, [])

  useEffect(() => {
    async function getGameDetails() {
      try {
        let res = await axiosInstance.get(`/games/${id}`);
        setGame(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getGameDetails();
    // console.log('game', game);
  }, [id]);

  return (
    <>
      {game ? (
        <section className='grid grid-cols-4 dark:text-white p-5'>
          <div className='flex justify-center items-center col-span-3  -black p-3'>
            <div>
              <div className='relative'>
                <h2 className='absolute bottom-0 Bungee text-3xl bg-gradient-to-tl from-white via-orange-500 to-white game-name'>
                  {game.name}
                </h2>
                <img src={game.background_image} className='h-[25rem] w-[50rem] rounded-lg' />
              </div>
              <h3 className='Bungee text-lg my-2'>Game Series :  {game.game_series_count}</h3>
              <div className='Bungee'>
                Developers : {game.developers?.map((dev, index) =>
                  <span key={index} className='text-normal ms-5 flex gap-3'>
                    <span>
                      <img className='w-[2rem] h-[2rem] rounded-lg hover:w-[7rem] hover:h-[7rem]' src={dev.image_background} />
                    </span>{dev.name},
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className='col-span-1 flex-col  -black'>
            <img src={game.background_image_additional} className='object-cover my-5 p-2' />
            <p className='text-xl RockSalt'>Release Date : {game.released}</p>
            {/* <div>
              <h3 className='RockSalt text-xl my-2'>Platforms : </h3>
              <div>
                {game.platforms.map((plat,index)=>{
                  return(
                    <div className='px-2 text-lg' key={index}>
                      <p className='py-1 mx-2 RockSalt'>{plat.platform.name}</p>
                    </div>
                  )})}
              </div>
            </div> */}
            <div className='flex flex-wrap mt-3'>
              <span className='text-lg RockSalt'>Genres : </span>{game.genres?.map((genre, index) =>
                <p className='dark:text-black me-2 mb-1 rounded-md w-fit h-fit bg-gradient-to-br from-orange-300 via-orange-600 to-orange-300 p-1 RockSalt' key={index}>{genre.name}</p>
              )}
            </div>
            <p className='RockSalt mt-3 text-lg'>Rating :  {game.rating}</p>
          </div>
          <div className='mt-10 Bungee p-5 w-[97vw]'>
            <h3 className='text-2xl mb-3'>Similar Games</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {similarGames.map((game, index) =>
              <div key={index} className='flex flex-col rounded-lg bg-gray-800
              hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'>
                <img src={game.background_image} className="w-full h-[15rem] rounded-t-md md:object-cover" />
                <p className='p-1' key={index}>{game.name}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Details
