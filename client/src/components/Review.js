import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { tokenIsValid } from '../utils/auth'
import axiosAuth from '../utils/axios'

import Form from './Form'
import '../styles/components/CreateReview.scss'

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

  function createReview(formData) {
    const celebrityId = params.id
    const createReviewForm = { ...formData, celebrity: celebrityId }
    // const celebrityId = ;
    return axiosAuth.post('/api/reviews/', createReviewForm)
  }

  return (
    <>
      <div className='formContainer'>
        <Form title='Create Review' request={createReview} fields={fields} />
      </div>

    </>
  )
}