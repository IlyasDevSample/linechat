import { useEffect, useState } from 'react'
import { useAuthorize } from '../hooks/useAuthorize'
import { useSignOut } from '../hooks/useSignOut'
import useTitle from '../hooks/useTitle'
import { useAuthStore } from '../stores/authStore'
import { Link, NavLink } from 'react-router-dom'
import brandLogo from '../assets/linechat_logo.png'
import avatar from '../assets/avatar.png'
import { RiGroupLine, RiUserLine, RiMessage3Line, RiSettingsLine, RiSunLine, RiMoonLine, RiTeamLine } from 'react-icons/ri'

const Dashboard = () => {
  useTitle('Dashboard')
  useAuthorize()
  const signOut = useSignOut()
  const bearerToken = useAuthStore((state) => state.bearerToken)
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])
  if (!bearerToken) {
    return null
  }


  const handleDarkMode = () => {
    setDarkMode((prev) => !prev)
    document.documentElement.classList.toggle('dark')
  }


  return (
    <div className='bg-primary dark:bg-contact-dark-primary h-screen max-h-screen w-full overflow-hidden flex'>
      <div className='fixed bottom-0 lg:static lg:bottom-none bg-white dark:bg-sidebar-dark-primary border-t border-gray-200 dark:border-0 lg:border-0 z-10 lg:shadow-primary-web h-[60px] w-full lg:max-w-[75px] lg:min-w-[75px] lg:min-h-[570px] lg:h-screen'>
        <header
          className='hidden lg:flex justify-center items-center h-[75px] w-[75px] mb-1'
        >
          <Link to='/dashboard'>
            <img src={brandLogo} alt="brand logo"
              className='h-[30px] w-[30px] mx-auto select-none'
            />
          </Link>
        </header>
        <nav
          className='flex flex-row lg:flex-col justify-evenly lg:justify-between items-center h-full lg:h-[calc(100%-75px)]'
        >
          <ul className='flex w-full lg:flex-col items-center justify-evenly lg:justify-center'>
            <li
              className='lg:mt-2 group cursor-pointer'
            >
              <NavLink
                to='/dashboard'
                className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
              >
                <RiMessage3Line className='text-xl lg:text-2xl ' />
              </NavLink>
            </li>

            <li
              className='lg:mt-2 group cursor-pointer'
            >
              <NavLink
                to='/users'
                className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
              >
                <RiGroupLine className='text-xl lg:text-2xl ' />
              </NavLink>
            </li>

            <li
              className='lg:mt-2 group cursor-pointer'
            >
              <NavLink
                to='/groups'
                className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
              >
                <RiTeamLine className='text-xl lg:text-2xl ' />
              </NavLink>
            </li>

            <li
              className='lg:mt-2 group cursor-pointer'
            >
              <NavLink
                to='/profile'
                className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
              >
                <RiUserLine className='text-xl lg:text-2xl ' />
              </NavLink>
            </li>

            <li
              className='lg:mt-2 group cursor-pointer'
            >
              <NavLink
                to='/settings'
                className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
              >
                <RiSettingsLine className='text-xl lg:text-2xl ' />
              </NavLink>
            </li>
          </ul>
          <ul
            className='hidden lg:block lg:mb-4'
          >
            <li
              className='lg:mt-2 group cursor-pointer'
            >
              <span

                className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
                onClick={handleDarkMode}
              >
                {darkMode ? <RiSunLine className='text-xl lg:text-2xl ' /> : <RiMoonLine className='text-xl lg:text-2xl ' />}
              </span>
            </li>

            <li
              className='lg:mt-2'
            >
              <span
                className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center"
              >
                <img src={avatar} alt="user avatar" 
                  className='h-10 w-10 rounded-full select-none cursor-pointer border-2 border-gray-300 dark:border-quaternary-blue'
                />
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <main>
      </main>
    </div>
  )
}

export default Dashboard