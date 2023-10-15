import { useState, useEffect } from 'react'

import cloudinary from '../.env'



cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_URL,
})

export default function Image() {

  const [images, setImages] = useState([])

  useEffect(() => {
    // Fetching img from Cloudinary
    cloudinary.v2.api.resources({ type: 'upload' }, (error, result) => {
      if (!error) {
        setImages(result.resources)
      } else {
        console.error('Error fetching images from Cloudinary.', error)
      }
    })
  }, [])

  return (
    <div>
      {images && images.map((imageUrl) => (
        <img
          key={imageUrl}
          src={imageUrl}
          alt='Cloudinary Image'
        />
      ))
      }
    </div>
  )
}