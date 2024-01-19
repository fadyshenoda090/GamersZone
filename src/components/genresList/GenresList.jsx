import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/axiosInstance';

const GenresList = ({ genreId, selectedGenreName }) => {
  const [genres, setGenres] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const getGenresList = async () => {
      try {
        const response = await axiosInstance.get('/genres');
        setGenres(response.data.results);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    getGenresList();
  }, []);

  const handleGenreClick = (index, id, name) => {
    setActiveIndex(index);
    genreId(id);
    selectedGenreName(name);
  };

  return (
    <>
      <h1 className='text-2xl ms-5 my-2 Bungee'>Genres</h1>
      {genres.map(({ id, name, image_background }, index) => (
        <div
          onClick={() => handleGenreClick(index, id, name)}
          key={index}
          className={`Bungee mx-1 ${activeIndex === index ? 'bg-gray-400 dark:bg-gray-400' : ''} mb-1 ms-5 flex justify-start gap-3 cursor-pointer hover:bg-gray-400 hover:dark:bg-white px-6 rounded-lg group`}
        >
          <img
            className={`my-2 rounded-lg object-fit group-hover:scale-110 transition-all ease-in-out duration-500 ${activeIndex === index ? 'scale-110' : ''}`}
            src={image_background}
            alt={`Genre ${name} logo`}
            style={{ width: '3rem', height: '3rem' }}
          />
          <h3 className={`mt-4 group-hover:text-xl transition-all ease-in-out duration-700 ${activeIndex === index ? 'text-xl' : ''}`}>
            {name}
          </h3>
        </div>
      ))}
    </>
  );
};

export default GenresList;
