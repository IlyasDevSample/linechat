import { Link } from 'react-router-dom'
import { useAuthRedirect } from '../hooks/useAuthRedirect'

const Index = () => {
  useAuthRedirect()
  return (
    <div>
      <div className='text-5xl text-blue-400 font-bold mx-auto w-fit mt-52'>
        Index page
      </div>
      <Link to='/login' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/login</Link>
      <Link to='/register' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/register</Link>
      <Link to='/home/chat' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/chat</Link>
    </div>
  )
}

export default Index