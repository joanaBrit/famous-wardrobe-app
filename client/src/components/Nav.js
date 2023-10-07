import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// import Modal from 'react-bootstrap/Model'
// import { removeToken } from


export default function Nav({ user }) {

  const [show, setShow] = useState(false)

  // * Variables
  const navigate = useNavigate()

  function logOut() {
    // removeToken()
    navigate('/login')
  }



  return (
    <>
      <nav className='nav-header'>
        <Link to='/'></Link>
        <div className='nav-toggle' onClick={() => setShow(true)}> {/* activate the toggle */}
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
      {/* <Modal */}
      show={show}
      fullscreen={true}
      onHide={() => setShow(false)}
      style={{ display: 'flex', alignItems: 'flex-start' }}
      {/* > */}
      {/* <Modal.Header className='text'> */}
      <nav onClick={() => setShow(false)}>
        <Link className='modal-text' to='/'>Home</Link>
        <Link className='modal-text' to='/celebrities'>Celebrities</Link>
        {user ?
          <>
            <Link className='modal-text' to='/'>Create Review</Link> {/* check this section */}
            <span onClick={logOut}>Log Out</span>
          </>
          :
          <>
            <Link className='modal-text' to='/register'>Register</Link>
            <Link className='modal-text' to='/login'>Login</Link>
          </>
        }
      </nav>
      {/* </Modal.Header> */}
      {/* </Modal> */}
    </>
  )
}