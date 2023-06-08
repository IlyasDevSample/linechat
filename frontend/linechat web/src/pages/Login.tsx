import useTitle from '../hooks/useTitle'
import logo from '../assets/linechat_logo.png'
import { Link } from 'react-router-dom'
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

type FormValues = {
  email: string
  password: string
  remember: boolean
}

const Login = () => {
  useTitle()
  const [showPassword, setShowPassword] = useState(true)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)

  const onSubmit = (data: FormValues) => {
    setLoading(true)
    const credentials = { username: data.email, password: data.password }
    axios.post(import.meta.env.VITE_API_URL + '/account/login', credentials)
      .then((res) => {
        console.log(res.status, res.data, res.headers)
      }).catch((err) => {
        console.log(err.response.data)
      })
      .finally(() => {
        setLoading(false)
      })

  }


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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='max-w-[450px] m-auto mt-[1.5rem] bg-white p-[2.5rem]'
        >
          <div className='w-full'>
            <label htmlFor="email" className='block mt-[1.5rem]'>Email</label>
            <div
              className='flex items-center'
            >
              <div className='bg-primary h-[42px] w-[47px] mt-[0.5rem] flex justify-center items-center border border-gray-300 rounded-sm border-r-0 rounded-r-none'>
                <AiOutlineMail className="text-gray-500" />
              </div>
              <input
                type="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required'
                  },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Invalid email address'
                  }
                })}
                id="email"
                placeholder='Enter Email'
                className={'flex-grow p-[0.5rem] mt-[0.5rem] border border-gray-300 rounded-sm rounded-l-none placeholder:text-sm outline-none' + (errors.email ? 'outline outline-3 outline-red-300' : '')}
              />
            </div>
            {errors.email && <span className='text-sm text-red-400'>{errors.email.message}</span>}
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
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required'
                  },
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                })}
                id="password"
                placeholder='Enter Password'
                className={'flex-grow p-[0.5rem] mt-[0.5rem] border border-gray-300 rounded-sm rounded-l-none placeholder:text-sm outline-none' + (errors.password ? 'outline outline-3 outline-red-300' : '')}
              />
              <span
                className='absolute right-3 top-1/2 transform -translate-y-1/4 cursor-pointer text-xl'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye className='text-gray-500 ' /> : <AiOutlineEyeInvisible className='text-gray-500' />}
              </span>
            </div>
            {errors.password && <span className='text-sm text-red-400'>{errors.password.message}</span>}
          </div>

          <div className='mt-[1.5rem] w-fit'>
            <label htmlFor="remember" className='flex items-center'>
              <input
                type="checkbox"
                {...register('remember')}
                id="remember"
                className="checkbox"
                tabIndex={-1}
              />
              <span className='text-sm text-gray-500'>Remember me</span>
            </label>
          </div>

          <div className='mt-[1.5rem]'>
            <button
              disabled={loading}
              type='submit'
              className={'flex justify-center items-center w-full p-[0.5rem] bg-quaternary-blue text-white rounded-sm cursor-pointer focus:outline-none hover:bg-quaternary-dark-blue focus:bg-quaternary-dark-blue focus:ring-primary focus:border-transparent transition-all' + (loading ? ' opacity-50 cursor-not-allowed' : '')}
            >
              Sign in
              {loading && <AiOutlineLoading3Quarters className='text-white animate-spin ml-[0.5rem] text-lg' />}
            </button>
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