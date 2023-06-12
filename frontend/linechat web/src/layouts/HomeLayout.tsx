import { useEffect, useState } from 'react'
import { useAuthorize } from '../hooks/useAuthorize'
import useTitle from '../hooks/useTitle'
import { useAuthStore } from '../stores/authStore'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  useTitle()
  useAuthorize()

  const bearerToken = useAuthStore((state) => state.bearerToken)
  if (!bearerToken) {
    return null
  }
  
  return (
    <div className='bg-primary dark:bg-contact-dark-primary h-screen max-h-screen w-full overflow-hidden flex'>
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout