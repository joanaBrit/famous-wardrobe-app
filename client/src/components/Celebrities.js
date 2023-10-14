import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'



export default function Celebrities() {
  const navigate = useNavigate()
  const [celebrities, setcelebrities] = useState([])
  // const [activeIndex, setActiveIndex] = useState(0)
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

          <Carousel>
            {celebritiesSplits.map((split, splitIndex) => (
              // {Array.from({ length: Math.ceil(celebrities.length / 3)})}
              <Carousel.Item key={splitIndex}>
                <div className='split-container'>
                  {split.map(({ id, name, year, coverImage }, i) => (

                    <div key={i} className='display-celebrities jo-card' >
                      <div className='img-position'>

                        <div className='celebrity-image-container'>
                          <Link to={`/celebrities/${id}/garments`} >
                            <img alt={name} src={coverImage} />
                          </Link>
                          <a className='likes' onClick={() => console.log('a')}>🔥</a>
                        </div>

                        <div className='text-carousel'>
                          <h3>{name}</h3>
                          <p>{year}</p>
                        </div>
                      </div>
                      <div className='action-buttons'>
                        <button
                          className='Review-btn btn-sm'
                          onClick={() => navigate(`/celebrities/${id}/create-review`)} >
                          Create Review
                        </button>
                        <button
                          className='Review-btn btn-sm'
                          onClick={() => navigate(`/celebrities/${id}/reviews`)} >
                          Show Reviews
                        </button>
                      </div>

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

