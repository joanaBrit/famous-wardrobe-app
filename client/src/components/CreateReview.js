import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { tokenIsValid } from '../utils/auth'
import axiosAuth from '../utils/axios'

import Form from './Form'

export default function CreateReview() {
  const [formResponse, setFormResponse] = useState(null)
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
      <div className='formContainer'>
        <Form title='Create Review' request={createReview} fields={fields} />
      </div>
    </>
  )
}