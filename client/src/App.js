import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import axios from 'axios'

// Page components
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Celebrities from './components/Celebrities'
import Garment from './components/Garment'
import CreateReview from './components/CreateReview'
import NotFound from './components/NotFound'
import Reviews from './components/Review'
import Nav from './components/Nav'
import { tokenIsValid } from './utils/auth'


export default function App() {


  const [user, setUser] = useState(tokenIsValid('famous-access-token'))

  useEffect(() => {
    setUser(tokenIsValid('famous-access-token'))
  }, [location])


  return (
    <>

      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/celebrities' element={<Celebrities />} />
            <Route path='/celebrities/:id/garments' element={<Garment />} />
            <Route path='/celebrities/:id/create-review' element={<CreateReview />} />
            <Route path='/celebrities/:id/reviews' element={<Reviews />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
