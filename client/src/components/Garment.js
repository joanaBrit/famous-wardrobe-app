import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Card from 'react-bootstrap/Card'
import { tokenIsValid } from '../utils/auth'
import axiosAuth from '../utils/axios'





export default function Garment() {
  const [user, setUser] = useState(tokenIsValid('famous-access-token'))
  const [celebrity, setCelebrity] = useState([])
  const [garments, setGarments] = useState([])
  // console.log(garments)
  useEffect(() => {

    async function getData() {
      try {

        const celebritiesResponse = await axiosAuth.get('/api/celebrities/1/')//! Cheek Here!!!!
        const garmentsResponse = await axiosAuth.get('/api/garments/')

        setCelebrity(celebritiesResponse.data)
        setGarments(garmentsResponse.data)

        // console.log(data)
        // setGarments(data)
      } catch (error) {
        console.error(error)
        // console.log(error.response.data)
      }
    }
    getData()
  }, [])

  if (!user) {
    return <>Unauthenticated</>//! Check HERE!!!!!!!1
  }

  return (
    <section>
      <main>
        <section className='garments'>
          <h1>Famous Wardrobe App</h1>

          <div key={celebrity.pk}>
            <img alt={celebrity.name} src={celebrity.cover_image} />
          </div>
          {celebrity.garments && celebrity.garments.map((garment) =>
            <div key={garment.id} className='display-garments' >
              <Card className="bg-dark text-white style=max-width: 18rem" ></Card>
              <div>
                <Card.Img src={garment.image} alt="Garment image" />
              </div>
              <Card.ImgOverlay>
                <div className='garment-text'>
                  <h2>{garment.title}</h2>
                  <p>{garment.brand}</p>
                  <p>{garment.price}</p>
                </div>
              </Card.ImgOverlay>
            </div>
          )}
        </section>
      </main >
    </section >
  )
}