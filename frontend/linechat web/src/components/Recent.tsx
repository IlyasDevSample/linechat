import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import UserChatSelect from './UserChatSelect';
import avatar from '../assets/avatar.png'
import { useUserStore } from '../stores/userStore';
import ChatSelectSkeleton from './ChatSelectSkeleton';

const Recent = () => {
  const userDetails = useUserStore((state) => state.UserDetails)

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
        {userDetails ? (
          <>
            <UserChatSelect name='ilyas elaissi' status='online' message='Okay i will do it' time='02:45 PM' />
            <UserChatSelect name='darth vader' status='online' message='Okay my master' time='02:45 PM' avatar={avatar} />
            <UserChatSelect name='ilyas elaissi' status='online' message='Okay i will do it' time='02:45 PM' />
            <UserChatSelect name='ilyas elaissi' status='online' message='Okay i will do it' time='02:45 PM' />
            <UserChatSelect name='ilyas elaissi' status='online' message='Okay i will do it' time='02:45 PM' />
            <UserChatSelect name='ilyas elaissi' status='online' message='Okay i will do it' time='02:45 PM' />
            <UserChatSelect name='ilyas elaissi' status='online' message='Okay i will do it' time='01:45 PM' />
          </>
        ) : (
          <>
            {Array(7).fill(0).map((_, i) => (
              <ChatSelectSkeleton key={i} />
            ))}
          </>
        )
      }
      </SimpleBar>
    </div>
  )
}

export default Recent