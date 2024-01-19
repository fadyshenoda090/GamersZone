import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { HiOutlineMagnifyingGlass, HiMoon } from "react-icons/hi2";
import { HiSun } from "react-icons/hi";
import { themeContext } from '../../contexts/ThemeContext';
import axiosInstance from '../../axiosConfig/axiosInstance';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useContext(themeContext);
  const [games, setGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getGamesList = async () => {
      try {
        const response = await axiosInstance.get(`/games?search=${searchQuery}`);
        setGames(response.data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    }
    getGamesList();
  }, [])

  const handelSerch = (e) => {
    const query = e.target.value.toLowerCase();
  
    setSearchQuery(query);
  
    const filteredGames = games.filter((game) => {
      return game.name.toLowerCase().startsWith(query);
    });
  
    // Check if the game is not already in the searchResults array, then push it
    filteredGames.forEach((game) => {
      if (!searchResults.some((result) => result.id === game.id)) {
        setSearchResults((prevResults) => [...prevResults, game]);
      }
    });
  
    // Remove games from searchResults that are not in the filtered games
    setSearchResults((prevResults) =>
      prevResults.filter((result) =>
        filteredGames.some((game) => game.id === result.id)
      )
    );
  };
  
  return (
    <header className='flex items-center p-2 relative h-fit'>
      <img onClick={() => navigate('/')} src={logo} alt="logo" style={{ height: "5rem", width: "7rem", cursor: "pointer" }} />
      <div className={`flex ${theme === 'light' ? 'bg-slate-200' : 'bg-white'} p-2 w-full items-center me-1 rounded-full`}>
        <HiOutlineMagnifyingGlass className='me-1' />
        <input type="search" placeholder='Search For Games' value={searchQuery} onChange={(e) => handelSerch(e)} className='w-full bg-transparent outline-none px-2' />
      </div>
      <div>
        {theme === 'light' ? (
          <HiMoon onClick={() => { setTheme('dark'); localStorage.setItem('theme', 'dark') }} className='text-4xl bg-slate-200 text-black rounded-full p-1 cursor-pointer' />
        ) : (
          <HiSun onClick={() => { setTheme('light'); localStorage.setItem("theme", "light") }} className='text-4xl bg-[#11291f] text-white rounded-full p-1 cursor-pointer' />
        )}
      </div>

      {/* Conditionally render the search results div under the input */}
      {searchResults.length > 0 && searchQuery.length !== 0 && (
        <div className="z-40 search-results absolute left-[7.5rem] right-0 top-12 bg-white rounded-lg mt-2 w-[90.88%]">
          {searchResults.map((result) => (
            <div onClick={() => { navigate(`/details/${result.id}`); setSearchQuery('') }} key={result.id} className="p-2 border-b cursor-pointer RockSalt drak:bg-white">{result.name}</div>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
