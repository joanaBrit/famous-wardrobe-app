import { useState, Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { stateValues, fieldValues } from '../utils/Common'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default function Form({ title, request, fields, redirect, onLoad }) {

  const navigate = useNavigate()
  const [formData, setFormData] = useState((stateValues(fields)))


  // * Component render

  useEffect(() => {
    async function fillUpForm() {
      try {
        const { data } = await onLoad()
        setFormData(data)
      } catch (error) {
        console.log(error)
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
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await request(formData)

    // If redirect
    if (redirect && !result.doNotNavigate) {
      console.log('form is navigating', redirect, !result.doNotNavigate, redirect && !result.doNotNavigate)
      navigate(redirect)
    }
  }


  return (
    <section>
      <Container>
        <Row>
          {fields.length > 0 ?
            <Col as="form" xs={{ span: 8 }} md={{ span: 6 }} onSubmit={handleSubmit} autoComplete='off' className='jo-card'>
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
              <button type="submit" className='m-auto mt-3'>{title}</button>
            </Col>
            :
            'Form Error'
          }
        </Row>
      </Container>
    </section>
  )
}
