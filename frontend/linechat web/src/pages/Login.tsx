import useTitle from '../hooks/useTitle'
import logo from '../assets/linechat_logo.png'
import { Link } from 'react-router-dom'
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'


const Login = () => {
  useTitle()
  const [showPassword, setShowPassword] = useState(true)


  return (
    <div className='bg-secondary min-h-screen py-[3rem]'>
      <header className='w-14 m-auto mt-[1rem]'>
        <img src={logo} alt="Linechat logo" />
      </header>
      <main className='container m-auto'>
        <div className='w-fit m-auto mt-[1.5rem]'>
          <h4 className='w-fit m-auto font-dynamic font-semibold'>Sign in</h4>
          <p
            className='w-fit m-auto mt-[1rem] text-sm text-gray-500'
          >Sign in to continue to LineChat</p>
        </div>
        <form
          className='max-w-[450px] m-auto mt-[1.5rem] bg-white p-[2.5rem]'
        >
          <div className='w-full'>
            <label htmlFor="email" className='block mt-[1.5rem]'>Email</label>
            <div
              className='flex items-center'
            >
              <div className='bg-primary h-[42px] w-[47px] mt-[0.5rem] flex justify-center items-center border border-gray-300 rounded-sm border-r-0 rounded-r-none'>
                <AiOutlineUser className="text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder='Enter Email'
                className='flex-grow p-[0.5rem] mt-[0.5rem] border border-gray-300 rounded-sm rounded-l-none focus:outline-none placeholder:text-sm'
              />
            </div>
          </div>
          <div>
            <div
              className='flex justify-between items-center mt-[1.5rem]'
            >
              <label htmlFor="password" className='block'>Password</label>
              <Link to="/forgot-password" className='text-sm text-quaternary-blue transition-all hover:text-quaternary-dark-blue focus:text-quaternary-dark-blue' tabIndex={-1}>Forgot password?</Link>
            </div>
            <div className='flex items-center relative'>
              <div className='bg-primary h-[42px] w-[47px] mt-[0.5rem] flex justify-center items-center border border-gray-300 rounded-sm border-r-0 rounded-r-none'>
                <AiOutlineLock className="text-gray-500" />
              </div>
              <input
                type={showPassword ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder='Enter Password'
                className='flex-grow p-[0.5rem] mt-[0.5rem] border border-gray-300 rounded-sm rounded-l-none focus:outline-none placeholder:text-sm'
              />
              <span
                className='absolute right-3 top-1/2 transform -translate-y-1/4 cursor-pointer text-xl'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye className='text-gray-500 ' /> : <AiOutlineEyeInvisible className='text-gray-500' />}
              </span>
            </div>
          </div>

          <div className='mt-[1.5rem] w-fit'>
            <label htmlFor="remember" className='flex items-center'>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="checkbox"
                tabIndex={-1}
              />
              <span className='text-sm text-gray-500'>Remember me</span>
            </label>
          </div>

          <div className='mt-[1.5rem]'>
            <button
              type='submit'
              className='w-full p-[0.5rem] bg-quaternary-blue text-white rounded-sm focus:outline-none hover:bg-quaternary-dark-blue focus:bg-quaternary-dark-blue focus:ring-primary focus:border-transparent transition-all'
            >Sign in</button>
          </div>
          <div className='mt-[1.5rem]'>
            <p className='text-sm text-gray-500'>Don't have an account? <Link to="/register" className='text-quaternary-blue transition-all hover:text-quaternary-dark-blue focus:text-quaternary-dark-blue'>Sign up</Link></p>
          </div>
        </form>
      </main>
      <footer>
        <div className='w-fit m-auto mt-[1.5rem]'>
          <p className='text-sm text-gray-500'>© 2023 LineChat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Login