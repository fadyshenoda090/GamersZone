import { useState } from 'react'
import './App.css'
import Home from './pages/home/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayOut from './appLayout/AppLayOut'
import Error from './pages/error/Error'
import NotFound from './pages/notFound/NotFound'
import { ThemeProvider, themeContext } from './contexts/ThemeContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
    children: [
      {index: true, element: <Home />, errorElement: <Error/>},
      {path: "*", element: <NotFound/>}
    ]
  }
])

function App() {

  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider value={{theme, setTheme}}>
      <div className={`${theme} ${theme=="dark" ? 'bg-[#121212]': ''} h-[100vh]`}>
        <RouterProvider router={router}/>
      </div>
    </ThemeProvider>
  )
}

export default App
