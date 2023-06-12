import { RiLogoutCircleRLine, RiSettingsLine, RiUserLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useSignOut } from '../hooks/useSignOut'
import { Link } from 'react-router-dom'



const Menu = () => {
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className='w-[160px] h-fit absolute top-[-145px] right-[-105px] bg-white dark:bg-contact-dark-primary rounded-md shadow-md z-50 border dark:border-sidebar-dark-primary py-2'
    >
      <ul className='flex flex-col justify-center items-center h-full'>
        <li>
          <Link
            to='/home/profile'
            className='h-9 w-[160px] flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70] dark:hover:bg-sidebar-dark-primary dark:text-gray-300'
          >
            <span>
              Profile
            </span>
            <RiUserLine />
          </Link>
        </li>
        <li>
          <Link
            to='/home/settings'
            className='h-9 w-[160px] flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70] dark:hover:bg-sidebar-dark-primary dark:text-gray-300'
          >
            <span>
              Settings
            </span>
            <RiSettingsLine />
          </Link>
        </li>
        <li>
          <hr className='border-gray-200 dark:border-[#3A3B3C] w-[160px] my-2' />
        </li>
        <li
          className='h-9 w-full flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70] dark:hover:bg-sidebar-dark-primary dark:text-gray-300'
          onClick={handleSignOut}
        >
          <span>
            Log out
          </span>
          <RiLogoutCircleRLine />
        </li>
      </ul>
    </motion.div>
  )
}

export default Menu