import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import { tokenIsValid } from '../utils/auth'
import axiosAuth from '../utils/axios'



export default function Garment() {
  const navigate = useNavigate()
  const params = useParams()
  const [celebrity, setCelebrity] = useState()
  // const [garments, setGarments] = useState([])

  useEffect(() => {
    async function getData() {
      try {
        const celebritiesResponse = await axiosAuth.get(`/api/celebrities/${params.id}/`)
        // const garmentsResponse = await axiosAuth.get('/api/garments/')

        setCelebrity(celebritiesResponse.data)
        // setGarments(garmentsResponse.data)

      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  if (!tokenIsValid('famous-access-token')) {
    navigate('/login')
  }

  return (
    <div className='garment-details-board'>
      {celebrity ?
        <>
          <div className='celebrity-photo'>
            <img alt={celebrity.name} src={celebrity.cover_image} />
          </div>
          <div className='garments'>
            {celebrity.garments && celebrity.garments.map((garment) =>
              <div key={garment.id} className='display-garments' >
                <Card className="bg-dark text-white style=max-width: 18rem" >
                  <Card.Img src={garment.image} alt="Garment image" />
                  <Card.ImgOverlay className='garment-text'>
                    <h2>{garment.title}</h2>
                    <p>{garment.brand}</p>
                    <p>{garment.price}</p>
                  </Card.ImgOverlay>
                </Card>
              </div>
            )}
          </div>
        </>
        :
        <Spinner className='spinner' style={{ marginTop: '3rem', marginLeft: '3rem' }} animation="border" role="status">
          <strong>0</strong>
        </Spinner>
      }
    </div>
  )
}