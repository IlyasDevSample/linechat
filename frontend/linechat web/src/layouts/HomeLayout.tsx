import { useAuthorize } from '../hooks/useAuthorize'
import useTitle from '../hooks/useTitle'
import { useAuthStore } from '../stores/authStore'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import UserChat from '../components/UserChat'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useUserStore } from '../stores/userStore'
import axios from 'axios'
import { UserDetails } from '../types/userDetailsType'
import { useNavigate } from 'react-router-dom'

const HomeLayout = () => {
  useTitle()
  useAuthorize()
  const navigate = useNavigate()
  const bearerToken = useAuthStore((state) => state.bearerToken)
  const clearBearerToken = useAuthStore((state) => state.clearBearerToken)
  const setUserDetails = useUserStore((state) => state.setUserDetails)
  const UserDetails = useUserStore((state) => state.UserDetails)

  useEffect(() => {
    if (!bearerToken) return;

    axios.get<UserDetails>(import.meta.env.VITE_API_URL + "/profile/details", {
      headers: {
        Authorization: bearerToken
      }
    })
      .then((res) => {
        const userDetails: UserDetails = res.data
        setUserDetails(userDetails)
      }).catch((err) => {
        console.log("error", err);
        if (err.response?.status === 401) {
          clearBearerToken()
          navigate('/login', { replace: true })
        }
      })

  }, [bearerToken, setUserDetails, clearBearerToken, navigate])

  useEffect(() => {
    if (!bearerToken || !UserDetails) return;

    const ws = SockJS(import.meta.env.VITE_SERVER_URL + "/ws?token=" + bearerToken);
    const client = over(ws);
    if (client.connected) return;
    client.connect({}, () => {
      client.subscribe("/topic/user/" + UserDetails.username, function (message) {
        console.log(message);
      })
    });

    return () => {
      try {
        client.disconnect(() => console.log("Disconnected"));
      } catch (error) {
        console.log(error);
      }
    }
  }, [bearerToken, UserDetails])

  if (!bearerToken) {
    return null
  }

  return (
    <div className='bg-primary dark:bg-contact-dark-primary h-screen max-h-screen w-full overflow-hidden flex'>
      <SideBar />
      <main
        className='flex flex-row w-full overflow-hidden'
      >
        <div
          className='w-full lg:min-w-[380px] lg:max-w-[380px] h-screen overflow-hidden lg:mr-1'
        >
          <AnimatePresence>
            <Outlet />
          </AnimatePresence>
        </div>
        <UserChat />
      </main>
    </div>
  )
}

export default HomeLayout