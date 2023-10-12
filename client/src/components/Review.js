import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/auth'

import axiosAuth from '../utils/axios'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from './Form'



export default function CreateReview({ user, token }) {

  const navigate = useNavigate()


  useEffect(() => {
    !user && navigate('/login')
  }, [user, navigate])

  const fields = [
    {
      text: 'text',
    }
  ]

  function createReview(formData) {
    return axios.post('/api/reviews/', formData)
  }

  return (
    <>
      <h1>Review PAGE</h1>
      <Form title='Create Review' request={createReview} fields={fields} />
    </>
  )
}