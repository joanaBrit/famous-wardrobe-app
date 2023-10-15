import Spinner from 'react-bootstrap/Spinner'

export default function LoadingSpinner() {
  return <Spinner className='spinner' style={{ marginTop: '3rem', marginLeft: '3rem' }} animation="border" role="status">
    <strong>0</strong>
  </Spinner>
}