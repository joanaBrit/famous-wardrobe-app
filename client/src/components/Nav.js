import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { removeToken, tokenIsValid } from '../utils/auth'

import Modal from 'react-bootstrap/Modal'



export default function Nav() {

  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  function logOut() {
    removeToken()
    navigate('/')
  }

  function isLoggedIn(){
    return tokenIsValid('famous-access-token') || tokenIsValid('famous-refresh-token')
  }


  return (
    <>
      <nav className='nav-header'>
        <a className='nav-toggle' onClick={() => setShow(true)}>
          <span></span>
          <span></span>
          <span></span>
        </a>
      </nav>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        style={{ display: 'flex', alignItems: 'flex-start' }}
        className='nav-modal'
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='text'>
          <nav onClick={() => setShow(false)}>
            <Link className='modal-text' to='/'>Home</Link>
            <Link className='modal-text' to='/celebrities'>Celebrities</Link>
            {isLoggedIn() ?
              <>
                <Link className='modal-text' to='/celebrities/:id/create-review'>Create Review</Link>
                <Link className='modal-text' to='/celebrities/:id/garments'>Garments</Link>
                <a className='modal-text' href="#" onClick={logOut} >Log Out</a>
              </>
              :
              <>
                <Link className='modal-text' to='/register'>Register</Link>
                <Link className='modal-text' to='/login'>Login</Link>
              </>
            }
          </nav>
        </Modal.Body>
      </Modal>
    </>
  )
}