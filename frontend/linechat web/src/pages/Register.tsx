import useTitle from '../hooks/useTitle'
import logo from '../assets/linechat_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineCheck, AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { StatusResponseType } from '../types/statusResponseType'
import { motion } from 'framer-motion'

type FormValues = {
  fullname: string
  email: string
  password: string
  agree: boolean
}

const Register = () => {
  useTitle()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<StatusResponseType>({ status: '', message: '' })
  const [success, setSuccess] = useState({ status: false, email: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = (data: FormValues) => {
    setLoading(true)
    if (data.agree) {
      const credentials = {
        fullName: data.fullname,
        username: data.email,
        password: data.password
      }
      axios.post(import.meta.env.VITE_API_URL + "/account/register", credentials)
        .then((res) => {
          setSuccess({ status: true, email: res.data.email })
          reset()
          setError({ status: '', message: '' })
          setIsSubmitted(true)
        })
        .catch((err) => {
          if (!isSubmitted) {
            setError(err.response.data)
          }
        })
        .finally(() => {
          setLoading(false)
        })

    }
  }
  return (
    <div className='bg-secondary min-h-screen py-[3rem] relative'>
      <header className='w-14 m-auto mt-[1rem]'>
        <img src={logo} alt="Linechat logo" />
      </header>
      <main className='container m-auto'>
        <div className='w-fit m-auto mt-[1.5rem]'>
          <h4 className='w-fit m-auto font-dynamic font-semibold'>
            Create an account
          </h4>
          <p
            className='w-fit m-auto mt-[1rem] text-sm text-gray-500'
          >Get your LineChat account now.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='max-w-[450px] m-auto mt-[1.5rem] bg-white p-[2.5rem]'
        >
          {error.status.length > 0 &&
          <p
            className='text-sm text-gray-500 bg-red-100 p-4 rounded-sm border border-red-300'
          >
            { error.status.toUpperCase() + ': ' + error.message} 
          </p>}
          <div className='w-full'>
            <label htmlFor="fullname" className='block mt-[1.5rem]'>
              Full name
            </label>
            <div
              className='flex items-center'
            >
              <div className='bg-primary h-[42px] w-[47px] mt-[0.5rem] flex justify-center items-center border border-gray-300 rounded-sm border-r-0 rounded-r-none'>
                <AiOutlineUser className="text-gray-500" />
              </div>
              <input
                type="text"
                {...register('fullname', { required: true })}
                id="fullname"
                placeholder='Enter Full Name'
                className={'flex-grow p-[0.5rem] mt-[0.5rem] border border-gray-300 rounded-sm rounded-l-none placeholder:text-sm outline-none' + (errors.email ? 'outline outline-3 outline-red-300' : '')}
              />
            </div>
            {errors.fullname && <span className='text-sm text-red-400'>Full name is required</span>}
          </div>
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
                className={'flex-grow p-[0.5rem] mt-[0.5rem] border border-gray-300 rounded-sm rounded-l-none placeholder:text-sm outline-none' + (errors.email ? 'outline outline-3 outline-red-300' : '')}
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
            <label htmlFor="agree" className='flex items-center'>
              <input
                type="checkbox"
                id="agree"
                className="checkbox"
                tabIndex={-1}
                {...register('agree', { required: true })}
              />
              <span className='text-sm text-gray-500'>
                I agree to the <Link to="/" className='text-quaternary-blue transition-all hover:text-quaternary-dark-blue focus:text-quaternary-dark-blue'>Terms of Service</Link> and <Link to="/" className='text-quaternary-blue transition-all hover:text-quaternary-dark-blue focus:text-quaternary-dark-blue'>Privacy Policy</Link>
              </span>
            </label>
            {errors.agree && <span className='text-sm text-red-400'>You must agree to the terms</span>}
          </div>
          <div className='mt-[1.5rem]'>
            <button
              disabled={loading}
              type='submit'
              className={'flex justify-center items-center w-full p-[0.5rem] bg-quaternary-blue text-white rounded-sm cursor-pointer focus:outline-none hover:bg-quaternary-dark-blue focus:bg-quaternary-dark-blue focus:ring-primary focus:border-transparent transition-all' + (loading ? ' opacity-50 cursor-not-allowed' : '')}
            >
              Register Now
              {loading && <AiOutlineLoading3Quarters className='text-white animate-spin ml-[0.5rem] text-lg' />}
            </button>
          </div>
          <div className='mt-[1.5rem]'>
            <p className='text-sm text-gray-500'>Already have an account ? <Link to="/login" className='text-quaternary-blue transition-all hover:text-quaternary-dark-blue focus:text-quaternary-dark-blue'>Sign in</Link></p>
          </div>
        </form>
      </main>
      <footer>
        <div className='w-fit m-auto mt-[1.5rem]'>
          <p className='text-sm text-gray-500'>© 2023 LineChat. All rights reserved.</p>
        </div>
      </footer>
      {/* Show success modal */}
      {success.status && (
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
            <h1 className='text-center text-xl mt-[1rem]'>Registration Success</h1>
            <p className='text-center text-sm mt-[0.5rem]'>You have successfully registered your account</p>
            <p className='text-center text-sm mt-[0.5rem]'>Please check your email "<span
              className='text-quaternary-blue'
            >{success.email}</span>" to verify your account</p>
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

export default Register