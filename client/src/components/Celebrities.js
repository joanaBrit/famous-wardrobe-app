import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import axiosAuth from '../utils/axios'
import Carousel from 'react-bootstrap/Carousel'
import Modal from 'react-bootstrap/Modal'


//* Likes
// async function likedCelebrity() {
// const [likes, setlikes] = useState(0)
// const [isCliked, setIsClicked] = useState()
// const { id } = useParams()

//   const response = await axiosAuth.patch(`/api/celebrities/${id}/`)

//   if (isCliked) {
//     // Like succeeded, update likes on UI to add 1
//     setNumberOfLikes(likes + 1)
//   } else if (response.status === 204) {
//     setNumberOfLikes(numberOfLikes - 1)
//   }
// }

export default function Celebrities() {
  const navigate = useNavigate()
  const [celebrities, setcelebrities] = useState([])
  const [likes, setlikes] = useState({})



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

  async function likedCelebrity(props) {
    const { likes, id: celebrityId } = props.data
    const [numberOfLikes, setNumberOfLikes] = useState(likes.length)
    const [numberShow, setNumberShow] = useState(false)

    const response = await axiosAuth.patch(`/api/${celebrityId}/like/`)
    if (response.status === 201) {
      setNumberOfLikes(numberOfLikes + 1)
      setNumberShow()
    } else if (response.status === 204) {
      setNumberOfLikes(numberOfLikes - 1)
    }
  }



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
              <Carousel.Item key={splitIndex}>
                <div className='split-container'>
                  {split.map(({ id, name, year, coverImage }, i) => (

                    <div key={i} className='display-celebrities jo-card' >
                      <div className='img-position'>

                        <div className='celebrity-image-container'>
                          <Link to={`/celebrities/${id}/garments`} >
                            <img alt={name} src={coverImage} />
                          </Link>

                          <Modal
                            size="sm"
                            // show={numberShow}
                            // onHide={() => setNumberShow(false)}
                            aria-labelledby="example-modal-sizes-title-sm"
                          >
                            {/* <a className='likes' onClick={() => setNumberShow(true)}>🔥</a> */}

                          </Modal>
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

