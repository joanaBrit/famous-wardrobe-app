import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'



export default function Celebrities() {
  const [celebrities, setcelebrities] = useState([])
  const carouselMoves = useRef(null)

  useEffect(() => {

    async function getCelebritiesData() {
      try {
        const { data } = await axios('/api/celebrities/')
        data.forEach(item => item.coverImage = item.cover_image)
        setcelebrities(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCelebritiesData()
  }, [])

  // * Mouse effect
  useEffect(() => {
    if (carouselMoves.current) {
      const carouselElement = carouselMoves.current

      const startInterval = () => {
        carouselElement.slide('next')
      }
      const stopInterval = () => {
        carouselElement.pause()
      }
      carouselElement.addEventListener('mouseenter', startInterval)
      carouselElement.addEventListener('mouseleave', stopInterval)
      return () => {
        carouselElement.removeEventListener('mouseenter', startInterval)
        carouselElement.removeEventListener('mouseleave', stopInterval)
      }
    }
  }, [])

  // * Carousel work displaying 3 images
  const splitCelebrities = 3
  const celebritiesSplits = celebrities.reduce((resultArray, item, index) => {
    const splitIndex = Math.floor(index / splitCelebrities)

    if (!resultArray[splitIndex]) {
      resultArray[splitIndex] = []
    }

    resultArray[splitIndex].push(item)

    return resultArray
  }, [])

  return (
    <section>
      <main>
        <h1>Famous Wardrobe App</h1>
        <section className='wrap-carousel' >

          <Carousel
          // interval={1000}
          // nextIcon={<span aria-hidden="true" className="carousel-control-next-icon change" />}
          // prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon change" />}

          >
            {celebritiesSplits.map((split, splitIndex) => (

              // {Array.from({ length: Math.ceil(celebrities.length / 3)})}
              <Carousel.Item key={splitIndex}>
                <div className='split-container'>
                  {split.map(({ id, name, year, coverImage }, i) => (

                    <div key={i} className='display-celebrities' >
                      {/* <>{JSON.stringify({ id, name, year, coverImage })}</> */}
                      <Carousel.Caption>

                      </Carousel.Caption>
                      <div className='img-position'>
                        <Link to={`/celebrities/${id}/garments`} >
                          <img alt={name} src={coverImage} />
                        </Link>
                        <div className='text-carousel'>
                          <h3>{name}</h3>
                          <p>{year}</p>
                        </div>
                      </div>

                      <Link to={`/celebrities/${id}/reviews`}>
                        <button type='button' className='Review-btn btn-sm' >Review</button>
                      </Link>
                    </div>
                  ))}
                </div>


              </Carousel.Item>
            ))}
          </Carousel>
        </section>
      </main >
    </section >
  )
}

