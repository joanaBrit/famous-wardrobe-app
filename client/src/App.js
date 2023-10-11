import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import axios from 'axios'

// Page components
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Celebrities from './components/Celebrities'
import Garment from './components/Garment'
import Review from './components/Review'
import NotFound from './components/NotFound'

// import Nav from './components/Nav'
import { tokenIsValid } from './utils/auth'

// export default function App() {
//   useEffect(() => {
//     async function getData() {
//       try {
//         const { data } = await axios.get('/api/celebrities/')
//         console.log(data)
//       } catch (error) {
//         console.log(error.response.data)
//       }
//     }
//     getData()
//   }, [])
export default function App() {


  const [ user, setUser ] = useState(tokenIsValid('famous-access-token'))

  useEffect(() => {
    console.log('app checking tpken', tokenIsValid('famous-access-token') )
    setUser(tokenIsValid('famous-access-token'))
  }, [location])


  return (
    <>
      {/* <Nav user={user} /> */}
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/celebrities' element={<Celebrities />} />
            <Route path='/celebrities/:id/garments' element={<Garment />} />
            <Route path='/celebrity/review:pk' element={<Review user={user}/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
