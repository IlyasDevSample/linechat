import useTitle from "../hooks/useTitle"
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters, AiOutlineLock } from "react-icons/ai"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/linechat_logo.png'
import axios from 'axios'
import { StatusResponseType } from '../types/statusResponseType'
import { motion } from "framer-motion"

type FormValues = {
  password: string,
  confirmPassword: string
}

const ResetPassword = () => {
  useTitle('Reset Password')
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>()
  const [showPassword, setShowPassword] = useState(true)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<StatusResponseType>({ status: '', message: '' })
  const location = useLocation();
  const navigate = useNavigate();
  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = (data: FormValues) => {
    setLoading(true)
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const credentials = {
      password: data.password,
      token: token
    }
    axios.post<StatusResponseType>(import.meta.env.VITE_API_URL + '/account/reset-password', credentials)
      .then((res) => {
        console.log(res.data)
        setSuccess({ status: res.data.status, message: res.data.message })
        reset()
      }
      ).catch((err) => {
        setSuccess({ status: err.response.data.status, message: err.response.data.message })
      }
      ).finally(() => {
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
          <h4 className='w-fit m-auto font-dynamic font-semibold'>
            Reset Password
          </h4>
          <p
            className='w-fit m-auto mt-[1rem] text-sm text-gray-500'
          >
            Reset your old password with a new one
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='max-w-[450px] m-auto mt-[1.5rem] bg-white p-[2.5rem]'
        >
          {success.status.toUpperCase() === "ERROR" &&
          <p
            className='text-sm text-gray-500 bg-red-100 p-4 rounded-sm border border-red-300'
          >
            {success.status.toUpperCase() + ': '}
            { success.message === 'Token expired' ? 'The link has expired.' : success.message} {' '} 
            Please request a new one. {' '}
            <Link
              to='/forgot-password'
              className='text-gray-500 underline'
            >
              Click Here
            </Link>{' '} to request a new link.
            
          </p>}

          <div>
            <div
              className='flex justify-between items-center mt-[1.5rem]'
            >
              <label htmlFor="password" className='block'>New Password</label>
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
                placeholder='Enter New Password'
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


          <div>
            <div
              className='flex justify-between items-center mt-[1.5rem]'
            >
              <label htmlFor="password" className='block'>
                Confirm Password
              </label>
            </div>
            <div className='flex items-center relative'>
              <div className='bg-primary h-[42px] w-[47px] mt-[0.5rem] flex justify-center items-center border border-gray-300 rounded-sm border-r-0 rounded-r-none'>
                <AiOutlineLock className="text-gray-500" />
              </div>
              <input
                type={showPassword ? 'password' : 'text'}
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Confirm Password is required'
                  },
                  validate: (value) => value === password.current || 'The passwords do not match'
                })}
                id="password"
                placeholder='Confirm New Password'
                className={'flex-grow p-[0.5rem] mt-[0.5rem] border border-gray-300 rounded-sm rounded-l-none placeholder:text-sm outline-none' + (errors.confirmPassword ? 'outline outline-3 outline-red-300' : '')}
              />
  
            </div>
            {errors.confirmPassword && <span className='text-sm text-red-400'>{errors.confirmPassword.message}</span>}
          </div>

          <div className='mt-[1.5rem]'>
            <button
              disabled={loading}
              type='submit'
              className={'flex justify-center items-center w-full p-[0.5rem] bg-quaternary-blue text-white rounded-sm cursor-pointer focus:outline-none hover:bg-quaternary-dark-blue focus:bg-quaternary-dark-blue focus:ring-primary focus:border-transparent transition-all' + (loading ? ' opacity-50 cursor-not-allowed' : '')}
            >
              Reset Password
              {loading && <AiOutlineLoading3Quarters className='text-white animate-spin ml-[0.5rem] text-lg' />}
            </button>
          </div>
          <div className='mt-[1.5rem]'>
            <p className='text-sm text-gray-500'>Don't want to reset password? {' '}
            <Link to="/login" className='text-quaternary-blue transition-all hover:text-quaternary-dark-blue focus:text-quaternary-dark-blue'>
              Sign in
            </Link>
            </p>
          </div>
        </form>
      </main>
      <footer>
        <div className='w-fit m-auto mt-[1.5rem]'>
          <p className='text-sm text-gray-500'>© 2023 LineChat. All rights reserved.</p>
        </div>
      </footer>
      {success.status.toUpperCase() ==='SUCCESS'  && (
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'
        >
          <div
            className='bg-white rounded-sm p-[2rem] w-full max-w-[450px] shadow-2xl'
          >
            <div className='flex justify-center p-3 items-center bg-quaternary-light-blue w-fit m-auto rounded-full'>
              <AiOutlineCheck className='text-quaternary-blue text-3xl' />
            </div>
            <h1 className='text-center text-xl mt-[1rem]'>
              Success
            </h1>
            <p className='text-center text-sm mt-[0.5rem]'>
              Your password has been reset successfully.
            </p>
          
            <div className='flex justify-center items-center mt-[1.5rem]'>
              <button
                className='flex justify-center items-center w-full p-[0.5rem] bg-quaternary-blue text-white rounded-sm cursor-pointer focus:outline-none hover:bg-quaternary-dark-blue focus:bg-quaternary-dark-blue focus:ring-primary focus:border-transparent transition-all'
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ResetPassword