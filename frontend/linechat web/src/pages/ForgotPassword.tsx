import useTitle from '../hooks/useTitle'
import logo from '../assets/linechat_logo.png'
import { Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
}

const ForgotPassword = () => {
  useTitle("Forgot Password")
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log("form data", data)
  }

  return (
    <div className='bg-secondary min-h-screen py-[3rem]'>
      <header className='w-14 m-auto mt-[1rem]'>
        <img src={logo} alt="Linechat logo" />
      </header>
      <main className='container m-auto'>
        <div className='w-fit m-auto mt-[1.5rem]'>
          <h4 className='w-fit m-auto font-dynamic font-semibold'>
            Forgot Password
          </h4>
          <p
            className='w-fit m-auto mt-[1rem] text-sm text-gray-500'
          >
            Reset Password With LineChat
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='max-w-[450px] m-auto mt-[1.5rem] bg-white p-[2.5rem]'
        >
          {/* info */}
          <p
            className='text-sm text-gray-500 bg-blue-100 p-4 rounded-sm border border-blue-200'
          >
            Enter your email address and we will send you a link to reset your password.
          </p>
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


          <div className='mt-[1.5rem]'>
            <button
              type='submit'
              className='w-full p-[0.5rem] bg-quaternary-blue text-white rounded-sm focus:outline-none hover:bg-quaternary-dark-blue focus:bg-quaternary-dark-blue focus:ring-primary focus:border-transparent transition-all'
            >Reset</button>
          </div>
          <div className='mt-[1.5rem]'>
            <p className='text-sm text-gray-500'>
              Remembered your password? {' '}
              <Link to="/login" className='text-quaternary-blue transition-all hover:text-quaternary-dark-blue focus:text-quaternary-dark-blue'>
                Sign in
              </Link>
            </p>

            <p className='text-sm text-gray-500 mt-2'>
              Don't have an account? {' '}
              <Link to="/register" className='text-quaternary-blue transition-all hover:text-quaternary-dark-blue focus:text-quaternary-dark-blue'>
                Register now
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
    </div>
  )
}

export default ForgotPassword