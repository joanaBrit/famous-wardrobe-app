import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import { removeToken } from '../utils/auth'


export default function Nav({ user }) {

  const [show, setShow] = useState(false)

  // * Variables
  // const navigate = useNavigate()

  function logOut() {
    removeToken()
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
        fullscreen={true}
        onHide={() => setShow(false)}
        style={{ display: 'flex', alignItems: 'flex-start' }}
      >
        <Modal.Header className='text'>
          <nav onClick={() => setShow(false)}>
            <Link className='modal-text' to='/'>Home</Link>
            <Link className='modal-text' to='/celebrities'>Celebrities</Link>
            {user ?
              <>
                <Link className='modal-text' to='/'>Create Review</Link>
                <Link className='modal-text' onClick={logOut} to='/login'>Log Out</Link>
              </>
              :
              <>
                <Link className='modal-text' to='/register'>Register</Link>
                <Link className='modal-text' to='/login'>Login</Link>
              </>
            }
          </nav>
        </Modal.Header>
      </Modal>
    </>
  )
}