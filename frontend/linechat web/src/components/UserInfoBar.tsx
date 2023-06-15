import ProfileImg from "./ProfileImg"
import UserStatus from "./UserStatus"
import avatar from '../assets/avatar.png'
import { RiMoreFill, RiPhoneLine, RiVidiconLine, RiArrowLeftSLine } from 'react-icons/ri'
import { useLayoutStore } from "../stores/layoutStore"

const UserInfoBar = () => {
  const setIsChatOpen = useLayoutStore(state => state.setIsChatOpen)

  return (
    <div
      className="flex items-center justify-between p-4 border-b border-gray-200 absolute top-0 left-0 w-full bg-white dark:bg-chat-dark-primary dark:border-sidebar-dark-primary z-50"
    >
      <div className="flex w-fit">
        <div
          className="mr-4 flex items-center justify-center w-fit lg:hidden"
        >
          <RiArrowLeftSLine className="text-xl cursor-pointer" onClick={() => setIsChatOpen(false)} />
        </div>
        <div
          className="w-fit"
        >

          <ProfileImg name="darth vader" avatar={avatar} />
        </div>

        <div
          className="ml-4 capitalize"
        >
          <h4
            className="font-semibold"
          >darth vader</h4>
          <small
            className="text-xs dark:text-light-gray flex items-center justify-start gap-1"
          >
            <UserStatus status="online" block />
            online
          </small>
        </div>
      </div>

      <div
        className="flex items-center justify-center w-fit mr-1"
      >
        <div
          className="capitalize bg-primary text-quaternary-blue flex justify-center items-center px-2 py-[6px] rounded-lg hover:bg-quaternary-blue-hover transition-all duration-300 cursor-pointer gap-1 dark:bg-quaternary-dark-blue dark:text-light-gray dark:hover:bg-chat-dark-hover dark:hover:bg-quaternary-blue hover:bg-tertiary"
        >
          <RiPhoneLine className="text-xl" />
          <p
            className="text-sm font-semibold hidden lg:block"
          >call</p>
        </div>
        <div
          className="ml-2 capitalize bg-primary text-quaternary-blue flex justify-center items-center px-2 py-[6px] rounded-lg hover:bg-quaternary-blue-hover transition-all duration-300 cursor-pointer gap-1 dark:bg-quaternary-dark-blue dark:hover:bg-quaternary-blue dark:text-light-gray dark:hover:bg-chat-dark-hover hover:bg-tertiary"
        >
          <RiVidiconLine className="text-xl" />
          <p
            className="text-sm font-semibold hidden lg:block"
          >video call
          </p>
        </div>

        <div
          className="ml-2 capitalize bg-primary text-quaternary-blue dark:hover:bg-quaternary-blue flex justify-center items-center px-2 py-[6px] rounded-lg hover:bg-quaternary-blue-hover transition-all duration-300 cursor-pointer gap-1 dark:bg-quaternary-dark-blue dark:text-light-gray dark:hover:bg-chat-dark-hover hover:bg-tertiary"
        >
          <RiMoreFill className="text-xl" />

        </div>
      </div>
    </div>
  )
}

export default UserInfoBar