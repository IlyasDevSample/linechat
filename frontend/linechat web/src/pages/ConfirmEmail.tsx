import { Link, useLocation } from 'react-router-dom'
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import useTitle from '../hooks/useTitle'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { StatusResponseType } from '../types/statusResponseType'

const ConfirmEmail = () => {
  useTitle('Confirm Email')
  const location = useLocation();
  const [success, setSuccess] = useState<StatusResponseType>({ status: '', message: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    axios.get<StatusResponseType>(import.meta.env.VITE_API_URL + '/account/confirm-email?token=' + token)
      .then((res) => {
        console.log(res.status, res.data, res.headers)
        setSuccess({ status: res.data.status, message: res.data.message })
      }
      ).catch((err) => {
        console.log(err.response.data)
        setSuccess({ status: err.response.data.status, message: err.response.data.message })
      }
      ).finally(() => {
        setLoading(false)
      })

  }, [location.search])


  return (
    <div className='bg-secondary min-h-screen py-[3rem]'>
      <main className='container m-auto'>
        <div className='w-fit m-auto mt-[1.5rem]'>
          {loading ?
            <AiOutlineLoading3Quarters className='animate-spin text-8xl m-auto text-quaternary-blue' />
            : success.status === 'success' ?
              <AiOutlineCheckCircle className='text-8xl m-auto text-green-500' />
              : <BiErrorAlt className='text-8xl m-auto text-red-500' />}

          {loading ? (
            <h4 className='w-fit m-auto mt-[1rem] text-lg text-gray-500'>
              Confirming your email address...
            </h4>
          ) : (
            <div
              className='w-fit m-auto mt-[1rem] text-lg text-gray-500'
            >
              <h4 className='w-fit m-auto font-dynamic font-semibold'>
                <span className='text-gray-500'>
                  {success.status.toUpperCase()}:
                  Something went wrong
                </span>
              </h4>
              <p
                className={'w-fit m-auto mt-[1rem] text-lg' + (success.status.toUpperCase() === 'SUCCESS' ? ' text-green-500' : ' text-red-500')}
              >
                {success.message === 'Token already used' ? 'Your email address has already been confirmed.' : success.message}
              </p>
            </div>
          )}
        </div>
        <div className='w-fit m-auto mt-[1.5rem]'>
          <Link to='/login'>
            <button
              className='flex justify-center items-center w-full p-[0.5rem] bg-quaternary-blue text-white rounded-sm cursor-pointer focus:outline-none hover:bg-quaternary-dark-blue focus:bg-quaternary-dark-blue focus:ring-primary focus:border-transparent transition-all'
            >
              Login to your account
            </button>
          </Link>
        </div>
      </main>
      <footer>
        <div className='w-fit m-auto mt-[1.5rem]'>
          <p className='text-sm text-gray-500'>© 2023 LineChat. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default ConfirmEmail