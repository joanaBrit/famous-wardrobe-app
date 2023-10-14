import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axiosAuth from '../utils/axios'

export default function Reviews() {
  const params = useParams()
  const [reviewData, setReviewData] = useState()
  const [celebrityName, setCelebrityName] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const celebrityId = params.id
    fetchReviews()

    async function fetchReviews() {
      const response = await axiosAuth.get(`/api/celebrities/${celebrityId}/`)
      console.log(response)
      if (response.status === 200) {
        setReviewData(response.data.reviews)
        setCelebrityName(response.data.celebrity)
      } else {
        setError('🤖 Oops, try again!')
      }
    }
  }, [])

  const isLoading = !reviewData

  if (isLoading) {
    return <>
      <div className='loading-banner' >
        <LoadingSpinner />
      </div>
    </>
  }

  return <>
    <div className='reviews-container'>
      {reviewData.length === 0
        ? <NoReviewsBanner />
        : reviewData.map(reviewEntry => <ReviewCard data={reviewEntry} key={reviewEntry.id} />)}
    </div>

    {error && <strong>{error}</strong>}
  </>
}

function NoReviewsBanner() {
  return <div className='jo-card no-review-banner'>
    <h4> There are no reviews! </h4>
    <button>Add the first review</button>
  </div>
}

function LoadingSpinner() {
  return <Spinner className='spinner' style={{ marginTop: '3rem', marginLeft: '3rem' }} animation="border" role="status">
  </Spinner>
}

function ReviewCard(props) {
  const { title, text, date, likes, id: reviewId, user: userId } = props.data
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length)
  const [optionMenu, setOptionMenu] = useState(false)
  const navigate = useNavigate()

  async function likedReview() {
    const response = await axiosAuth.patch(`/api/reviews/${reviewId}/like/`)
    if (response.status === 201) {
      // Like succeeded, update likes on UI to add 1
      setNumberOfLikes(numberOfLikes + 1)
    } else if (response.status === 204) {
      setNumberOfLikes(numberOfLikes - 1)
    }
  }

  function getLoggedInUserId() {
    try {
      const tokenString = localStorage.getItem('famous-access-token')
      if (!tokenString) return 0

      const [header, payload, signature] = tokenString.split('.')
      const decodedPayload = JSON.parse(atob(payload))
      return decodedPayload.user_id

    } catch (e) {
      console.error(e)
      return 0
    }
  }

  function toggleEditMenu() {
    setOptionMenu(!optionMenu)
  }

  async function handleDelete() {
    try {
      await axiosAuth.delete(`/api/reviews/${reviewId}/`)
      navigate('/celebrities/')
    } catch (error) {
      console.log(error)
    }
  }

  const isReviewMadeByLoggedInUser = getLoggedInUserId() === userId


  return <div className="jo-card review-card">
    <div className='content'>
      <div className='review-title-bar'>
        <h3>{title}</h3>
        {isReviewMadeByLoggedInUser && <a onClick={toggleEditMenu}>
          <img src='https://res.cloudinary.com/dwgwkeccm/image/upload/v1697303216/menu-dots_kj03vd.svg' />
        </a>}
      </div>
      <p>{text}</p>
    </div>

    <div className='bottom-banner'>
      <span>
        <a onClick={likedReview} style={{ cursor: 'pointer', marginRight: '5px' }}>
          {numberOfLikes === 0 ? '🤍' : '❤️'}
        </a>
        {numberOfLikes} Likes</span>
      <span>{date}</span>
    </div>
    {optionMenu && <div className='review-options'>
      <a onClick={handleDelete} href="#">
        <img src={'https://res.cloudinary.com/dwgwkeccm/image/upload/v1697113505/Project-4/disposal_1_gsafke.png'} alt={'trash'} />
      </a>
      <Link to={`/review/${reviewId}/update`}>
        <img className='update' src={'https://res.cloudinary.com/dwgwkeccm/image/upload/v1697113413/Project-4/pencil_qssfhn.png'} alt={'pen'} />
      </Link>
      <a onClick={toggleEditMenu} href="#">
        <img src="https://res.cloudinary.com/dwgwkeccm/image/upload/v1697304007/arrow-circle-right_fyjxqj.svg" />
      </a>

    </div>}
  </div>
}