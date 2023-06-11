import { useEffect } from 'react'
import { useAuthorize } from '../hooks/useAuthorize'
import { useSignOut } from '../hooks/useSignOut'
import useTitle from '../hooks/useTitle'
import { useAuthStore } from '../stores/authStore'

const Dashboard = () => {
  useTitle('Dashboard')
  useAuthorize()
  const signOut = useSignOut()
  const bearerToken = useAuthStore((state) => state.bearerToken)
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }, [])
  if (!bearerToken) {
    return null
  }

  
  const handleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
  }
  

  return (
    <div className='bg-primary dark:bg-contact-dark-primary h-screen max-h-screen w-full overflow-hidden flex'>
      <div className='fixed bottom-0 lg:static lg:bottom-none bg-white dark:bg-sidebar-dark-primary border-t border-gray-200 lg:border-0 z-10 lg:shadow-primary-web h-[60px] w-full lg:max-w-[75px] lg:min-w-[75px] lg:min-h-[570px] lg:h-screen'>
        <header></header>
        <nav></nav>
        <div></div>
      </div>
      <main>
        <button onClick={handleDarkMode} >dark mode</button>
      </main>
    </div>
  )
}

export default Dashboard