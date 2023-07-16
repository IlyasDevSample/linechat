import { Link, useNavigate } from 'react-router-dom'
import { useAuthRedirect } from '../hooks/useAuthRedirect'
import { useEffect } from 'react'

const Index = () => {
  // useAuthRedirect()
  const navigate = useNavigate()
  useEffect(() => { 
    navigate('/home/chat')
  }, [navigate])
  return null
  // return (
  //   <div>
  //     <div className='text-5xl text-blue-400 font-bold mx-auto w-fit mt-52'>
  //       Index page
  //     </div>
  //     <Link to='/login' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/login</Link>
  //     <Link to='/register' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/register</Link>
  //     <Link to='/home/chat' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/chat</Link>
  //   </div>
  // )
}

export default Index