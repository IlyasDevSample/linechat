import ProfileImg from "./ProfileImg"

type Props = {
  isUser?: boolean
  fullName: string
  message: string
  showAvatar?: boolean
}
const Message = ({ isUser = false, fullName, message, showAvatar }: Props) => {
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
            showAvatar ? <ProfileImg name={fullName} />
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
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Message