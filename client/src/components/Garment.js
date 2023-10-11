import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Card from 'react-bootstrap/Card'




export default function Garment({ user }) {
  const [celebrities, setCelebrities] = useState([])
  const [garments, setGarments] = useState([])
  useEffect(() => {

    async function getGarmentsData() {
      try {
        const { data } = await axios('/api/garments')
        setGarments(data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    getGarmentsData()
  }, [])
  if (!user) {
    return <>Unauthenticated</>
  }

  return (
    <section>
      <main>
        <section className='garments'>
          <h1>Famous Wardrobe App</h1>

          {celebrities.map((celebrity) => (

            <div key={celebrity.id}>
              <img alt={celebrity.name} src={celebrity.cover_image} />
            </div>
          ))}
          {garments.map((garment) =>

            < div key={garment.id} className='display-garments' >
              <Card className="bg-dark text-white" ></Card>
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