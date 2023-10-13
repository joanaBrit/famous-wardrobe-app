import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { getToken } from '../utils/auth'

import axios from 'axios'
import axiosAuth from '../utils/axios'



import Spinner from './Spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function SingleReview({ user }) {

  const [review, setReview] = useState(null)

  const { reviewId } = useParams
  // const [reviewId, setReviewId] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function getReviewData() {
      try {
        const { data } = await axiosAuth.get(`/api/reviews/${reviewId}/`)
        setReview(data)
      } catch (error) {
        console.log(error)
      }
    }
    getReviewData()
  }, [reviewId])

  async function handleDelete() {
    try {
      await axiosAuth.delete(`/api/reviews/${reviewId}/`)
      navigate('/celebrities/')
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <section>
      <main>
        {review ?
          <Container className='single-review-container' fluid>
            <Row>

              <Col className='single-review-detail' md="6">
                {user && user === review.addedBy._id &&
                  <div className="triggers mb-4">
                    <img onClick={handleDelete} src={'https://res.cloudinary.com/dwgwkeccm/image/upload/v1697113505/Project-4/disposal_1_gsafke.png'} alt={'trash'} />
                    <Link to={`/review/${reviewId}/update`}>
                      <img className='update' src={'https://res.cloudinary.com/dwgwkeccm/image/upload/v1697113413/Project-4/pencil_qssfhn.png'} alt={'pen'} />
                    </Link>
                  </div>
                }
                <h1 className='featured'>{user.username}</h1>
                <p>{review.title}</p>
                <p>{review.text}</p>
                <p>{review.date}</p>
                <Link className="btn btn-blue" to="/celebrities/">Back</Link>
              </Col>
            </Row>
          </Container>
          :
          'Not found'
          // <Spinner />
        }
      </main>
    </section>
  )
}
