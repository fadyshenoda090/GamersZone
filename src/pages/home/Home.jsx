import React, { useEffect, useState } from 'react';
import GenresList from '../../components/genresList/GenresList';
import axiosInstance from '../../axiosConfig/axiosInstance';
import Banner from '../../components/banner/Banner';
import TrendingGames from '../../components/trendingGames/TrendingGames';
import GenreGamesList from '../../components/footer/GenreGamesList';

const Home = () => {
  const [list, setList] = useState([]);
  const [randomGames, setRandomGames] = useState([]);
  const [genreGamesList, setGenreGamesList] = useState([]); 
  const random = Math.floor(Math.random() * list.length);
  const numberOfRandomGames = 4;

  const getRandomGames = () => {
    if (list.length > 0) {
      const uniqueRandomIndexes = new Set();

      while (uniqueRandomIndexes.size < numberOfRandomGames) {
        const randomIndex = Math.floor(Math.random() * list.length);
        uniqueRandomIndexes.add(randomIndex);
      }

      const randomGamesArray = Array.from(uniqueRandomIndexes).map(
        (index) => list[index]
      );

      setRandomGames(randomGamesArray);
    }
  };

  const getGamesList = async () => {
    try {
      const response = await axiosInstance.get('/games');
      console.log('response', response.data.results);
      setList(response.data.results);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const getGamesBYGenre = async (id) => {
    try {
      const res = await axiosInstance.get(`/games?genres=${4}`);
      console.log('res', res.data.results);
      setGenreGamesList(res.data.results);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    getGamesList();
    getGamesBYGenre();
  }, []);

  useEffect(() => {
    getRandomGames();
  }, [list]);

  return (
    <div className='grid grid-cols-4 px-5'>
      <div className='h-full hidden md:block'>
        <GenresList />
      </div>
      <div className='md:col-span-3 col-span-4'>
        {list.length > 0 &&genreGamesList.length>0 ? (
          <div>
            <Banner game={list[random]} />
            <TrendingGames games={randomGames} />
            <GenreGamesList games={genreGamesList} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
