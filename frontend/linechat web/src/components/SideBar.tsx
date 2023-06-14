import { Link, NavLink } from 'react-router-dom'
import brandLogo from '../assets/linechat_logo.png'
import avatar from '../assets/avatar.png'
import { RiGroupLine, RiUserLine, RiMessage3Line, RiSettingsLine, RiSunLine, RiMoonLine, RiTeamLine } from 'react-icons/ri'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Menu from '../components/Menu'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import ProfileImg from './ProfileImg'
import { useUserSettingStore } from '../stores/userSettingStore'

const SideBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const darkMode = useUserSettingStore((state) => state.darkMode)
  const setDarkMode = useUserSettingStore((state) => state.setDarkMode)
  
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [setDarkMode, darkMode])


  const isNotMobile = window.innerWidth >= 992;

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className='fixed bottom-0 lg:static lg:bottom-none bg-white dark:bg-sidebar-dark-primary border-t border-gray-200 dark:border-0 lg:border-0 z-10 lg:shadow-primary-web h-[60px] w-full lg:max-w-[75px] lg:min-w-[75px] lg:min-h-[570px] lg:h-screen lg:mr-1'>
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
              to='/home/chat'
              data-tooltip-id='chats'
              data-tooltip-content='Chats'
              data-tooltip-place='right'
              className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
            >
              <RiMessage3Line className='text-xl lg:text-2xl ' />
              {isNotMobile && <Tooltip id='chats' />}
            </NavLink>
          </li>

          <li
            className='lg:mt-2 group cursor-pointer'
          >
            <NavLink
              to='/home/people'
              data-tooltip-id='people'
              data-tooltip-content='People'
              data-tooltip-place='right'
              className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
            >
              <RiGroupLine className='text-xl lg:text-2xl ' />
              {isNotMobile && <Tooltip id='people' />}
            </NavLink>
          </li>

          <li
            className='lg:mt-2 group cursor-pointer'
          >
            <NavLink
              to='/home/groups'
              data-tooltip-id='groups'
              data-tooltip-content='Groups'
              data-tooltip-place='right'
              className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
            >
              <RiTeamLine className='text-xl lg:text-2xl ' />
              {isNotMobile && <Tooltip id='groups' />}
            </NavLink>
          </li>

          <li
            className='lg:mt-2 group cursor-pointer'
          >
            <NavLink
              to='/home/profile'
              data-tooltip-id='profile'
              data-tooltip-content='Profile'
              data-tooltip-place='right'
              className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
            >
              <RiUserLine className='text-xl lg:text-2xl ' />
              {isNotMobile && <Tooltip id='profile' />}
            </NavLink>
          </li>

          <li
            className='lg:mt-2 group cursor-pointer'
          >
            <NavLink
              to='/home/settings'
              data-tooltip-id='settings'
              data-tooltip-content='Settings'
              data-tooltip-place='right'
              className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
            >
              <RiSettingsLine className='text-xl lg:text-2xl ' />
              {isNotMobile && <Tooltip id='settings' />}
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
              data-tooltip-content='Dark / Light Mode'
              data-tooltip-id='dark-mode'
              data-tooltip-place='right'
              className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center hover:bg-primary rounded-md text-txt-gray-2 dark:text-gray-300 group-hover:text-quaternary-blue group-hover:dark:bg-sidebar-dark-btn"
              onClick={handleDarkMode}
              tabIndex={0}
            >
              {darkMode ? <RiSunLine className='text-xl lg:text-2xl ' /> : <RiMoonLine className='text-xl lg:text-2xl ' />}
              {isNotMobile && <Tooltip id='dark-mode' />}
            </span>
          </li>

          <li
            className='lg:mt-2'
          >
            <span
              className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center relative"
            >
              <div
                onClick={() => setShowMenu(!showMenu)}
                onBlur={() => setShowMenu(false)}
                tabIndex={0}
              >
                <ProfileImg name='John Doe' avatar={avatar} />
              </div>
              <AnimatePresence>
                {showMenu && <Menu />}
              </AnimatePresence>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar