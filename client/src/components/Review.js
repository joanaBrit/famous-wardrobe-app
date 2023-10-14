import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
      <h1>Reviews</h1>
      <div className='loading-banner' >
        <LoadingSpinner />
      </div>
    </>
  }

  return <>
    <h1>Reviews</h1>
    <div className='reviews-container'>
      {reviewData.length === 0
        ? <NoReviewsBanner />
        : reviewData.map(reviewEntry => <ReviewCard data={reviewEntry} key={reviewEntry.id} />)}
    </div>
    <button onClick={() => setReviewData(null)}></button>

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
  const { title, text, date, likes, id: reviewId } = props.data
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length)

  async function likedReview() {
    const response = await axiosAuth.patch(`/api/reviews/${reviewId}/like/`)
    if (response.status === 201) {
      // Like succeeded, update likes on UI to add 1
      setNumberOfLikes(numberOfLikes + 1)
    } else if (response.status === 204) {
      setNumberOfLikes(numberOfLikes - 1)
    }
  }


  return <div className="jo-card review-card">
    <div className='content'>
      <h3>{title}</h3>
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
  </div>
}