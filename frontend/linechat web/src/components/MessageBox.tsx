import { Conversation, Message } from "../types/conversationType"
import { UserDetails } from "../types/userDetailsType"
import ProfileImg from "./ProfileImg"

type Props = {
  message: Message,
  userDetails: UserDetails,
  selectedConversation: Conversation,
  position: number
}

const MessageBox = ({ message, userDetails, selectedConversation, position }: Props) => {

  const isUser = message.sender === userDetails.username
  const showAvatar = position === selectedConversation.messages.length - 1 ? true : message.sender !== selectedConversation.messages[position + 1].sender
  const avatarURL = message.sender === userDetails.username ? userDetails.AvatarUrl : selectedConversation.avatarUrl
  const fullName = message.sender === userDetails.username ? userDetails.fullName : selectedConversation.fullName

  return (
    <div
      className={`flex items-center ${isUser ? 'justify-end' : 'justify-start'} mt-2 mb-2`}
    >
      <div
        className={`flex justify-stretch gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row '}`}
      >
        <div
          className="flex justify-center items-end"
        >
          {
            showAvatar ? <ProfileImg name={fullName} avatar={avatarURL} />
              :
              <div
                className="w-8 h-8 ml-2"
              />
          }
        </div>
        <div
          className="flex justify-center items-center"
        >
          <p
            className={`rounded-md text-sm p-2 px-3 ${isUser ? 'bg-quaternary-blue text-white ml-12 dark:bg-sidebar-dark-primary' : 'bg-gray-200 text-black mr-12 dark:bg-quaternary-dark-blue dark:text-light-gray'}`}
          >
            {message.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageBox