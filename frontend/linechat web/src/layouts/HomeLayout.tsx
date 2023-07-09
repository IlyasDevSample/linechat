import { useAuthorize } from '../hooks/useAuthorize'
import useTitle from '../hooks/useTitle'
import { useAuthStore } from '../stores/authStore'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import UserChat from '../components/UserChat'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios'
import { useUserStore } from '../stores/userStore'
import { UserDetails } from '../types/userDetailsType'
import { useClientStore } from '../stores/clientStore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConversationStore } from '../stores/conversationStore'
import { Message } from '../types/conversationType'
import { useSignOut } from '../hooks/useSignOut'

const HomeLayout = () => {
  useTitle()
  useAuthorize()
  const bearerToken = useAuthStore((state) => state.bearerToken)
  const [isConnected, setIsConnected] = useState(false)
  const client = useClientStore((state) => state.client)
  const setClient = useClientStore((state) => state.setClient)
  const setUserDetails = useUserStore((state) => state.setUserDetails)
  const userDetails = useUserStore((state) => state.UserDetails)
  const isOnline = useUserStore((state) => state.isOnline)
  const setIsOnline = useUserStore((state) => state.setIsOnline)
  const conversations = useConversationStore((state) => state.conversations)
  const selectedConversation = useConversationStore((state) => state.selectedConversation)
  const setConversations = useConversationStore((state) => state.setConversations)
  const setSelectedConversation = useConversationStore((state) => state.setSelectedConversation)
  const [messageReceived, setMessageReceived] = useState<Message | null>(null)
  const [ refreshView, setRefreshView ] = useState(false)
  const signOut = useSignOut()

  useEffect(() => {
    if (!messageReceived) return;
    conversations?.forEach((conversation) => {
      if (conversation.idConversation === messageReceived.idConversation) {
        conversation.messages.push(messageReceived)
        conversation.lastMessageTime = messageReceived.createdAt
        conversation.lastMessage = messageReceived.message
      }
    })
    if (!conversations) return;
    setConversations([...conversations.sort((a, b) => {
      if (a.lastMessageTime > b.lastMessageTime) return -1
      if (a.lastMessageTime < b.lastMessageTime) return 1
      return 0
    })])
    if (selectedConversation?.idConversation === messageReceived.idConversation) {
      setSelectedConversation(conversations.find((conversation) => conversation.idConversation === messageReceived.idConversation) ?? selectedConversation)
    }
    setMessageReceived(null)
    setRefreshView(!refreshView)
  }, [messageReceived])

  useEffect(() => {
    if (!bearerToken) return;
    axios.get<UserDetails>(import.meta.env.VITE_API_URL + "/profile/details",
      {
        headers: {
          Authorization: bearerToken
        }
      }).then((response) => {
        setUserDetails(response.data);
      }).catch((error) => {
        console.log(error);
        // check 401 and redirect to login
        if (error?.response?.status === 401) {
          signOut();
        }
      })

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    const ws = SockJS(import.meta.env.VITE_SERVER_URL + "/ws?token=" + bearerToken);
    const client = over(ws);

    setClient(client);

    client.connect({}, onConnect, onDisconnect);

    return () => {
      if (client.connected) {
        client.disconnect(onDisconnect);
      } else {
        ws.close()
      }
    }
  }, [bearerToken, setUserDetails, setClient])

  useEffect(() => {
    if (!userDetails || !client?.connected) return;
    if (Object.keys(client?.subscriptions).length > 0) return

    client.subscribe("/user/" + userDetails?.username + "/queue/private", (message) => {
      const receivedMessage: Message = JSON.parse(message.body, (key, value) => {
        if (key === 'createdAt') {
          return new Date(value).toISOString();
        }
        return value;
      });
      setMessageReceived(receivedMessage);
    })

    client.subscribe("/user/" + userDetails?.username + "/queue/errors", (message) => {
      toast.error(message.body, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    });

    return () => {
      client.unsubscribe("/user/" + userDetails?.username + "/queue/private")
      client.unsubscribe("/user/" + userDetails?.username + "/queue/errors")
      setIsOnline(false);
    }
  }, [client, userDetails, isConnected, setIsOnline])

  // set isOnline when client is connected and subscribed
  useEffect(() => {
    if (!client || !userDetails || !client.connected) return;
    if (Object.keys(client?.subscriptions).length > 0) {
      setIsOnline(true);
    } else {
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
      >
        <div
          className='w-full lg:min-w-[380px] lg:max-w-[380px] h-screen overflow-hidden lg:mr-1'
        >
          <AnimatePresence>
            <Outlet />
          </AnimatePresence>
        </div>
        <UserChat refreshView={refreshView} />
      </main>
      <ToastContainer />
    </div>
  )
}

export default HomeLayout