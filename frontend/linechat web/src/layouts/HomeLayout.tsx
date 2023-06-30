import { useAuthorize } from '../hooks/useAuthorize'
import useTitle from '../hooks/useTitle'
import { useAuthStore } from '../stores/authStore'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import UserChat from '../components/UserChat'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios'
import { useUserStore } from '../stores/userStore'
import { UserDetails } from '../types/userDetailsType'
import { Conversation } from '../types/conversationType'

const HomeLayout = () => {
  useTitle()
  useAuthorize()
  const bearerToken = useAuthStore((state) => state.bearerToken)
  const [isConnected, setIsConnected] = useState(false)
  const [client, setClient] = useState<Client>()
  const setUserDetails = useUserStore((state) => state.setUserDetails)
  const userDetails = useUserStore((state) => state.UserDetails)
  const isOnline = useUserStore((state) => state.isOnline)
  const setIsOnline = useUserStore((state) => state.setIsOnline)

  useEffect(() => {
    if (!bearerToken) return;
    axios.get<UserDetails>(import.meta.env.VITE_API_URL+"/profile/details",
      {
        headers: {
          Authorization: bearerToken
        }
      }).then((response) => {
        setUserDetails(response.data);
      }).catch((error) => {
        console.log(error);
      })
    
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    const ws = SockJS(import.meta.env.VITE_SERVER_URL+"/ws?token=" + bearerToken);
    const client = over(ws);

    setClient(client);

    client.connect({}, onConnect, onDisconnect);

    return () => {
      if (client.connected) {
        client.disconnect(onDisconnect);
      }else {
        ws.close()
      }
    }
  }, [bearerToken, setUserDetails])

  useEffect(() => {
    if (!userDetails || !client?.connected) return;
    if (Object.keys(client?.subscriptions).length > 0) return

    client.subscribe("/user/"+userDetails?.username+"/queue/private", (message) => {
      console.log("message received")
    })

    client.subscribe("/user/"+userDetails?.username+"/queue/errors", (message) => {
      console.log("Error: " + message.body)
    });

    return () => {
      client.unsubscribe("/user/"+userDetails?.username+"/queue/private")
      client.unsubscribe("/user/"+userDetails?.username+"/queue/errors")
      setIsOnline(false);
    }
  }, [client, userDetails, isConnected, setIsOnline])
 
  useEffect(() => {
    if (!client || !userDetails || !client.connected) return;
    if (Object.keys(client?.subscriptions).length > 0) {
      setIsOnline(true);
    }else {
      setIsOnline(false);
    }
  }, [client, userDetails, isConnected, setIsOnline])

  if (!bearerToken) {
    return null
  }

  return (
    <div className='bg-primary dark:bg-contact-dark-primary h-screen max-h-screen w-full overflow-hidden flex'>
      <SideBar fullName={userDetails?.fullName} avatarUrl={userDetails?.AvatarUrl} isLoading={!isOnline} />
      <main
        className='flex flex-row w-full overflow-hidden'
        onClick={() => {
          client?.send("/app/send", {}, JSON.stringify({
            sender: "eiliass171@gmail.com",
            receiver: "elaissiilyas@gmail.com",
            message: "Hello"
          }));
        }}
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