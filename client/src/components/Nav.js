import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { removeToken, tokenIsValid } from '../utils/auth'

import Modal from 'react-bootstrap/Modal'



export default function Nav() {

  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function logOut() {
    removeToken('famous-access-token')
    removeToken('famous-refresh-token')
    navigate('/')
  }

  function isLoggedIn() {
    return tokenIsValid('famous-access-token') || tokenIsValid('famous-refresh-token')
  }


  return (
    <div style={{ padding: '1rem' }}>
      <nav className='nav-header'>
        <a className='nav-toggle' onClick={() => setShow(true)}>
          <span></span>
          <span></span>
          <span></span>
        </a>
        <h1>{getPageTitle(location.pathname)}</h1>
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
            {isLoggedIn()
              ? <a className='modal-text' href="#" onClick={logOut} >Log Out</a>
              : <>
                <Link className='modal-text' to='/register'>Register</Link>
                <Link className='modal-text' to='/login'>Login</Link>
              </>
            }
          </nav>
        </Modal.Body>
      </Modal>
    </div>

  )
}

function getPageTitle(path) {
  const subpaths = path.split('/')
  if (subpaths[1] === 'celebrities') {
    if (subpaths[3] === 'reviews') {
      return 'Reviews'
    } else if (subpaths[3] === 'garments') {
      return 'Garment Details'
    } else if (subpaths[3] === 'create-review') {
      return 'Create new review'
    } else {
      return 'Celebrities'
    }
  } else if (subpaths[1] === 'register') {
    return 'Register'
  } else if (subpaths[1] === 'login') {
    return 'Login'
  } else {
    return 'Famous Wardrobe'
  }
}