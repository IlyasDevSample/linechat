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

const HomeLayout = () => {
  useTitle()
  useAuthorize()
  const bearerToken = useAuthStore((state) => state.bearerToken)

  useEffect(() => {
    const ws = SockJS("http://localhost:8080/ws");
    const client = over(ws);
    client.connect({}, function (frame) {
      console.log('Connected: ' + frame);
    });

    return () => {
      try {
        client.disconnect(() => console.log("Disconnected"));
      }catch (error) {
        console.log(error);
      }
    }
  }, [])

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