import { useAuthorize } from '../hooks/useAuthorize'
import { useSignOut } from '../hooks/useSignOut'
import useTitle from '../hooks/useTitle'
import { useAuthStore } from '../stores/authStore'

const Dashboard = () => {
  useAuthorize()
  useTitle('Dashboard')
  const signOut = useSignOut()
  const bearerToken = useAuthStore((state) => state.bearerToken)
  if (!bearerToken) {
    return null
  }
  
  return (
    <div>
      Dashboard
      <p>{bearerToken}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  )
}

export default Dashboard