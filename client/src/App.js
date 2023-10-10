import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

import axios from 'axios'

// Page components
import Home from './components/Home'
import Nav from './components/Nav'
import Register from './components/Register'
import Login from './components/Login'
import Celebrities from './components/Celebrities'
import Garment from './components/Garment'
import Review from './components/Review'
import NotFound from './components/NotFound'



export default function App() {
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get('/api/celebrities/')
        console.log(data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    getData()
  }, [])

  return (
    <>
      <Nav />
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/celebrities' element={<Celebrities />} />
            <Route path='/garments/:pk' element={<Garment />} />
            <Route path='/celebrity/review:pk' element={<Review />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
