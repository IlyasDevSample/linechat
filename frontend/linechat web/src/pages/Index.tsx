import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <div>
      <div className='text-5xl text-blue-400 font-bold mx-auto w-fit mt-52'>
        Index page
      </div>
      <Link to='/login' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/login</Link>
      <Link to='/register' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/register</Link>
      <Link to='/dashboard' className='text-2xl text-blue-400 font-bold mx-auto w-fit mt-5 block'>/dashboard</Link>
    </div>
  )
}

export default Index