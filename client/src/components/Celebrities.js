import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'



export default function Celebrities() {
  const [celebrities, setcelebrities] = useState([])
  useEffect(() => {

    async function getCelebritiesData() {
      try {
        const { data } = await axios('/api/celebrities')
        data.forEach(item=>item.coverImage = item.cover_image)
        setcelebrities(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCelebritiesData()
  }, [])

  return (
    <section>
      <main>
        <section className='wrap-carousel'>
          <h1>Famous Wardrobe App</h1>
          <Carousel
          // interval={1000}
          // nextIcon={<span aria-hidden="true" className="carousel-control-next-icon change" />}
          // prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon change" />}
          >
            {celebrities.map(({ id, name, year, coverImage }, i) =>
              <Carousel.Item key={i}>
                <div className='display-celebrities' >
                  <>{JSON.stringify({ id, name, year, coverImage })}</>
                  <Carousel.Caption>
                    <div className='text-carousel'>
                      <h3>{name}</h3>
                      <p>{year}</p>
                    </div>
                  </Carousel.Caption>
                  <Link to={`/celebrities/${id}`}>
                    <img alt={name} src={coverImage} />
                  </Link>
                </div>
              </Carousel.Item>
            )}
          </Carousel>
        </section>
      </main>
    </section>
  )
}
