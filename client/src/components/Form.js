import { useState, Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getToken, setToken } from '../utils/auth'
import { stateValues, fieldValues } from '../utils/Common'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Form({ title, request, fields, redirect, onLoad }) {


  // * Variable

  const navigate = useNavigate()


  // * State

  const [formData, setFormData] = useState((stateValues(fields)))
  const [errors, setErrors] = useState('')


  // * Component render

  useEffect(() => {
    async function fillUpForm() {
      try {
        const { data } = await onLoad()
        setFormData(data)
      } catch (error) {
        console.log(error)
        setErrors(error)
      }
    }
    if (onLoad) {
      console.log('On Load Checked')
      fillUpForm()
    }
  }, [onLoad])


  // * Handler Functions

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // set errors to the starting point
    setErrors('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await request(formData)

      // If redirect
      if (redirect) {
        navigate(redirect)
      }

    } catch (error) {
      const errorMessage = 'Missing fields' //error.response.data.detail || //! check HERE
      console.log(errorMessage)
      setErrors(errorMessage)
    }
  }

  return (
    <section>
      <h2 className="subtitle fs-2 mb-4">{title}</h2>
      <Container>
        <Row>
          {fields.length > 0 ?
            <Col as="form" xs={{ span: 8 }} md={{ span: 6 }} onSubmit={handleSubmit} autoComplete='off'>
              {fieldValues(fields).map(field => {
                const { type, name, variable } = field
                return (
                  <Fragment key={variable}>
                    <label hidden htmlFor={variable}>{name}</label>
                    {type === 'textarea'
                      ? <textarea
                        style={{ resize: 'none' }}
                        name={variable}
                        id={variable}
                        value={formData[variable]}
                        onChange={handleChange}
                        placeholder={name} />
                      : <input
                        type={type}
                        name={variable}
                        placeholder={name}
                        value={formData[variable]}
                        onChange={handleChange}
                        id={variable}
                      />}
                  </Fragment>
                )
              })}
              {errors && <p className='text-warning bold text mt-4'>{errors}</p>}
              <button type="submit" className='btn btn-sm col-10 d-block m-auto mt-4'>{title}</button>
            </Col>
            :
            'Form Error'
          }
        </Row>
      </Container>
    </section>
  )
}
