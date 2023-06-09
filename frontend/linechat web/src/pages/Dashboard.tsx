import { useAuthStore } from '../stores/authStore'

const Dashboard = () => {
  const bearerToken = useAuthStore((state) => state.bearerToken)
  return (
    <div>Dashboard
      <p>{bearerToken}</p>
    </div>
  )
}

export default Dashboard