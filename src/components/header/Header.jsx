import React, { useContext, useState } from 'react'
import logo from '../../assets/logo.png'
import { HiOutlineMagnifyingGlass, HiMoon } from "react-icons/hi2";
import { HiSun } from "react-icons/hi";
import { themeContext } from '../../contexts/ThemeContext';


function Header() {
  const { theme, setTheme } = useContext(themeContext);
  return (
    <div className='flex items-center p-2'>
      <img src={logo} alt="logo" style={{ height: "5rem", width: "7rem" }} />
      <div className={`flex ${theme ==='light' ? 'bg-slate-200': 'bg-white'} p-2 w-full items-center me-1 rounded-full`}>
        <HiOutlineMagnifyingGlass className='me-1' />
        <input type="text" placeholder='Search For Games' className='w-full bg-transparent outline-none px-2' />
      </div>
      <div>
      {theme === 'light' ? (
          <HiMoon onClick={() => {setTheme('dark');localStorage.setItem('theme','dark')}} className='text-4xl bg-slate-200 text-black rounded-full p-1 cursor-pointer' /> 
        ) : (
          <HiSun onClick={() => {setTheme('light');localStorage.setItem("theme","light")}} className='text-4xl bg-[#11291f] text-white rounded-full p-1 cursor-pointer' />
        )}
      </div>
    </div>
  )
}

export default Header
