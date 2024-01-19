import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig/axiosInstance';

const Details = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilarGames = async () => {
      try {
        const response = await axiosInstance.get(`/games/${id}/game-series`);
        setSimilarGames(response.data.results);
      } catch (error) {
        console.error('Error fetching similar games:', error);
      }
    }
    fetchSimilarGames();
  }, [id]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameDetailsResponse = await axiosInstance.get(`/games/${id}`);
        setGame(gameDetailsResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGameDetails();
  }, [id]);

  return (
    <>
    {loading ? (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='flex justify-center items-center'>
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
        </div>
      </div>
    ) : (
      <main className='lg:grid md:flex-col grid-cols-5 dark:text-white p-5'>
        <section className='flex justify-center col-span-3 p-3'>
          <article>
            <div className='relative'>
              <h2 className='absolute bottom-0 Bungee text-3xl bg-gradient-to-tl from-white via-orange-500 to-white game-name'>
                {game.name}
              </h2>
              <img src={game.background_image} className='lg:h-[25rem] h-[15rem] w-[50rem] rounded-lg' alt={game.name} />
            </div>
            <h3 className='Bungee text-lg mt-5 mb-3'>Game Series Count :  {game.game_series_count}</h3>
            <div className='Bungee'>
              Developers : {game.developers?.map((dev, index) => (
                <span key={index} className='text-normal my-2 flex gap-3'>
                  <span>
                    <img className='w-[2rem] h-[2rem] rounded-lg hover:w-[7rem] hover:h-[7rem]' src={dev.image_background} alt={dev.name} />
                  </span>{dev.name},
                </span>
              ))}
            </div>
          </article>
        </section>
        <section className='col-span-2 flex-col justify-center items-center Bungee'>
          <img src={game.background_image_additional} className='object-fit h-[15rem] w-full m-1 p-2' alt={`${game.name} additional background`} />
          <p className='text-xl'>Release Date : {game.released}</p>
          <div className='flex flex-wrap mt-3'>
            <span className='text-lg'>Genres :&nbsp; </span>{game.genres?.map((genre, index) => (
              <p className='dark:text-black me-2 mb-1 RockSalt rounded-md w-fit h-fit bg-gradient-to-br from-orange-300 via-orange-600 to-orange-300 p-1' key={index}>{genre.name}</p>
            ))}
          </div>
          <p className='mt-3 text-lg'>Rating :  <span className='dark:text-black me-2 mb-1 RockSalt rounded-md w-fit h-fit bg-gradient-to-br from-orange-300 via-orange-600 to-orange-300 p-1'>
            {game.rating}
          </span>
          </p>
        </section>
        <section className='mt-10 Bungee p-5 w-[97vw]'>
          <h3 className='text-2xl mb-3'>Same Series  Games</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {similarGames.map((game, index) => (
              <article onClick={() => { navigate(`/details/${game.id}`) }} key={index} className='flex flex-col justify-between rounded-lg bg-gray-800
              hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer'>
                <img src={game.background_image} className="w-full h-[15rem] rounded-t-md md:object-fit" alt={game.name} />
                <p className='p-1 mt-5 text-center' key={index}>{game.name}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    )}
  </>
  
  )
}

export default Details
