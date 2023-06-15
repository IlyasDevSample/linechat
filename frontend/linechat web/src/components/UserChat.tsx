import ProfileImg from "./ProfileImg"
import UserStatus from "./UserStatus"

const UserChat = () => {
  return (
    <div
      className="bg-white dark:bg-chat-dark-primary h-screen max-h-screen w-full overflow-hidden lg:shadow-primary-web fixed left-0 top-0 translate-x-[100%] invisible lg:visible lg:translate-x-0 lg:static transition-all duration-300 z-50"
    >
      <div
        className="flex items-center p-4 border-b border-gray-200 dark:border-chat-dark-secondary"
      >
        <div
          className="relative w-fit"
        >
          <ProfileImg name="darth vader" />
          <UserStatus status="online" />
        </div>

        <div
          className="ml-4"
        >
          <h4>darth vader</h4>
          <small>online</small>
        </div>
      </div>
      
    </div>
  )
}

export default UserChat