import { useAuthorize } from '../hooks/useAuthorize'
import { useSignOut } from '../hooks/useSignOut'
import useTitle from '../hooks/useTitle'
import { useAuthStore } from '../stores/authStore'

const Dashboard = () => {
  useTitle('Dashboard')
  useAuthorize()
  const signOut = useSignOut()
  const bearerToken = useAuthStore((state) => state.bearerToken)
  if (!bearerToken) {
    return null
  }
  
  return (
    <div className='bg-primary h-screen max-h-screen w-full overflow-hidden flex'>
      <div className='fixed bottom-0 lg:static lg:bottom-none bg-white border-t border-gray-200 lg:border-0 z-10 lg:shadow-primary-web h-[60px] w-full lg:max-w-[75px] lg:min-w-[75px] lg:min-h-[570px] lg:h-screen'>
        <header></header>
        <nav></nav>
      </div>
      <main>
      </main>
    </div>
  )
}

export default Dashboard