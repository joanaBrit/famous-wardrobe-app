import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Card from 'react-bootstrap/Card'



export default function Garment() {
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


  return (
    <section>
      <main>
        <section className='garments'>
          <h1>Famous Wardrobe App</h1>

          {garments.map(({ id, title, brand, price, image }, i) =>

            < div key={id} className='display-garments' >
              <Card className="bg-dark text-white" ></Card>
              <div>
                <Card.Img src={image} alt="Garment image" />
              </div>
              <Card.ImgOverlay>
                <div className='garment-text'>
                  <h2>{title}</h2>
                  <p>{brand}</p>
                  <p>{price}</p>
                </div>
              </Card.ImgOverlay>
              {/* <Link to={`/garments/${id}`}>
                <img alt={name} src={IMAGE} />
              </Link> */}
            </div>

          )}

        </section>
      </main >
    </section >
  )
}