import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { tokenIsValid } from '../utils/auth'

import axiosAuth from '../utils/axios'
import Form from './Form'



export default function UpdateReview() {
  const navigate = useNavigate()
  const [currentReviewData, setCurrentReviewData] = useState()
  const fields = [
    {
      type: 'text',
      name: 'Title',
    },
    {
      type: 'textarea',
      name: 'Text',
    }
  ]
  const params = useParams()
  const { celebrityId, reviewId } = params

  useEffect(() => {
    if (!(tokenIsValid('famous-access-token'))) {
      navigate('/login')
      return
    }

    async function getReviewData() {
      try {
        const { data } = await axiosAuth.get(`/api/reviews/${reviewId}/`)
        setCurrentReviewData(data)
      } catch (error) {
        console.log(error)
      }
    }

    getReviewData()
  }, [])

  async function updateReview(formData) {
    const { reviewId } = params
    const updateReviewForm = {
      ...formData,
      celebrity: celebrityId,
      likes: currentReviewData.likes,
    }

    const response = await axiosAuth.put(`/api/reviews/${reviewId}/`, updateReviewForm)
    if (response.name === 'AxiosError') throw response
  }

  const defaultValues = currentReviewData ? {
    data: {
      title: currentReviewData.title,
      text: currentReviewData.text,
    },
  } : null


  return (
    <>
      <img className='full-img' src='https://res.cloudinary.com/dwgwkeccm/image/upload/v1697387895/Review_vudry8.png' />
      <div className='formContainer'>
        <Form title='Update Review'
          request={updateReview}
          fields={fields}
          redirect={'/celebrities/'}
          onLoad={defaultValues} />
      </div>
    </>
  )
}