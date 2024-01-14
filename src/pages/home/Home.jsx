import React from 'react'
import GenresList from '../../components/genresList/GenresList'

const Home = () => {
  return (
    <div className='grid grid-cols-4 px-5'>
      <div className='h-full hidden md:block'>
        <GenresList />
      </div>
      <div className='md:col-span-3 col-span-4'>List</div>
    </div>
  )
}

export default Home
