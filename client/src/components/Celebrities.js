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
  const [celebrities, setcelebrities] = useState([])

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
        <section className='wrap-carousel' >
          <Carousel>
            {celebritiesSplits.map((split, splitIndex) => (
              <Carousel.Item key={splitIndex}>
                <div className='split-container'>
                  {split.map(cardProps => <CelebrityCard data={cardProps} key={cardProps.id} />)}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>
      </main >
    </section >
  )
}

function CelebrityCard({ data }) {
  const { id: celebrityId, name, year, coverImage, likes } = data

  const navigate = useNavigate()
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length)
  const [numberShow, setNumberShow] = useState(false)

  async function addLikeToCelebrity() {
    const response = await axiosAuth.patch(`/api/celebrities/${celebrityId}/like/`)

    if (response.status === 201) {
      setNumberOfLikes(numberOfLikes + 1)
      showLikes()
    } else if (response.status === 204) {
      setNumberOfLikes(numberOfLikes - 1)
      showLikes()
    }
  }

  function showLikes() {
    setNumberShow(true)

    setTimeout(() => {
      setNumberShow(false)
    }, 2500)
  }


  return <div className='display-celebrities jo-card' >
    <div className='img-position'>

      <div className='celebrity-image-container'>
        <Link to={`/celebrities/${celebrityId}/garments`} >
          <img alt={name} src={coverImage} />
        </Link>
        <a className='likes' onClick={addLikeToCelebrity}>
          <img src="https://res.cloudinary.com/dwgwkeccm/image/upload/v1697319522/flames_laqehk.png" />
        </a>
        <div className={`likes-number ${numberShow ? 'show' : 'hide'}`} >
          {numberOfLikes}
        </div>
        <Modal
          size="sm"
          // show={numberShow}
          // onHide={() => setNumberShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >

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
        onClick={() => navigate(`/celebrities/${celebrityId}/create-review`)} >
        Create Review
      </button>
      <button
        className='Review-btn btn-sm'
        onClick={() => navigate(`/celebrities/${celebrityId}/reviews`)} >
        Show Reviews
      </button>
    </div>

  </div>
}