import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import UserChatSelect from './UserChatSelect';
import { format } from 'date-fns';
import { useUserStore } from '../stores/userStore';
import ChatSelectSkeleton from './ChatSelectSkeleton';
import { useAuthStore } from '../stores/authStore';
import { useEffect } from 'react';
import { useConversationData } from '../api/conversation';
import { Link } from 'react-router-dom';
import { useConversationStore } from '../stores/conversationStore';

const Recent = () => {
  const userDetails = useUserStore((state) => state.UserDetails)
  const bearerToken = useAuthStore((state) => state.bearerToken)
  const { data, isLoading, error, refetch } = useConversationData(bearerToken as string, false)
  const conversations = useConversationStore((state) => state.conversations)
  const setConversations = useConversationStore((state) => state.setConversations)

  useEffect(() => {
    if (!bearerToken) return
    refetch()
  }, [refetch, bearerToken])

  useEffect(() => {
    if (!data) return
    // sort by last message time
    data.sort((a, b) => {
      if (a.lastMessageTime > b.lastMessageTime) return -1
      if (a.lastMessageTime < b.lastMessageTime) return 1
      return 0
    })
    setConversations(data)
  }, [data, setConversations])

  if (error) {
    return (
      <div>
        <h5
          className='px-4 mb-4 font-semibold'
        >
          Recent
        </h5>
        <div
          className='flex flex-col items-center justify-center w-full h-full text-center'
        >
          Something went wrong
          <p>
            {(error as any)?.response?.data?.message}
          </p>
          <a
            className='text-blue-500 hover:underline cursor-pointer'
            onClick={() => refetch()}
          >
            Retry?
          </a>
        </div>
      </div>
    )
  }

  if (conversations?.length === 0) {
    return (
      <div>
        <h5
          className='px-4 mb-4 font-semibold'
        >
          Recent
        </h5>
        <div
          className='flex flex-col items-center justify-center w-full h-full text-center'
        >
          No recent chats yet {':('}
          <Link
            to='/home/people'
            className='text-blue-500 hover:underline cursor-pointer'
          >
            Find friends to chat with now!
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h5
        className='px-4 mb-4 font-semibold'
      >
        Recent
      </h5>
      <SimpleBar
        className={`w-full overflow-y-auto lg:h-[calc(100vh-267px)] h-[calc(100vh-calc(59px+267px))]`}
      >
        {isLoading || !userDetails ? (
          <>
            {Array(7).fill(0).map((_, i) => (
              <ChatSelectSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {conversations?.map((conversation, _) => (
              <UserChatSelect
                key={conversation.idConversation}
                id={conversation.idConversation}
                message={conversation.lastMessage}
                name={conversation.fullName}
                avatar={conversation.avatarUrl}
                status={conversation.status === 'ONLINE' ? 'online' : 'offline'}
                time={format(new Date(conversation.lastMessageTime), 'hh:mm a')}
              />
            ))}
          </>
        )
        }
      </SimpleBar>
    </div>
  )
}

export default Recent