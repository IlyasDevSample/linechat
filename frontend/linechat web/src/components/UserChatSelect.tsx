import { useLayoutStore } from '../stores/layoutStore';
import ProfileImg from './ProfileImg';
import UserStatus from './UserStatus';

type Props = {
  name: string
  status: 'online' | 'offline' | 'away'
  message: string
  avatar?: string
  time: string
}

const UserChatSelect = ({ name, status, message, time, avatar }: Props) => {
  const setIsChatOpen = useLayoutStore(state => state.setIsChatOpen)
  
  return (
    <div
      onClick={() => setIsChatOpen(true)}
      className='px-5 py-[15px] border-t-primary border-t hover:bg-tertiary dark:hover:bg-sidebar-dark-primary lg:rounded-md cursor-pointer transition-all flex items-stretch justify-center dark:border-t-contact-dark-primary dark:hover:bg-sidebar-dark-tertiary dark:text-dark-gray'
    >
      <div
        className='flex items-center justify-center mr-4'
      >
        <div className='relative w-fit'>
          <ProfileImg name={name} avatar={avatar}/>
          <UserStatus status={status} />
        </div>
      </div>
      <div
        className='flex-grow'
      >
        <h5 className='font-semibold text-txt-dark dark:text-light-gray text-[15px] mb-[2px] capitalize'>
          {name}
        </h5>
        <p className='dark:text-gray-2 dark:text-dark-gray text-[13px] dark:font-medium'>
          {message}
        </p>
      </div>
      <div
        className='flex flex-col items-center justify-between ml-2 text-txt-light dark:text-dark-gray'
      >
        <small
          className='text-xs mb-[2px] text-gray-1 dark:font-medium dark:text-dark-blue'
        >
          {time}
        </small>
      </div>
    </div>
  )
}

export default UserChatSelect