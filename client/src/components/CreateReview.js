import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { tokenIsValid } from '../utils/auth'
import axiosAuth from '../utils/axios'

import Form from './Form'

export default function CreateReview() {
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    !(tokenIsValid('famous-access-token')) && navigate('/login')
  }, [])

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

  async function createReview(formData) {
    const celebrityId = params.id
    const createReviewForm = { ...formData, celebrity: celebrityId }

    const response = await axiosAuth.post('/api/reviews/', createReviewForm)
    if (response.name === 'AxiosError') throw response
  }

  return (
    <>
      <img className='full-img' src='https://res.cloudinary.com/dwgwkeccm/image/upload/v1697387895/Review_vudry8.png' />
      <div className='formContainer'>
        <Form title='Create Review' request={createReview} fields={fields} redirect={'/celebrities/'} />
      </div>
    </>
  )
}