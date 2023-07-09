import { people } from "../types/peopleUser";
import ProfileImg from "./ProfileImg";
import UserStatus from "./UserStatus";

const MAX_CHARACTERS = 30

const truncateText = (text: string) => {
  if (text.length > MAX_CHARACTERS) {
    return text.slice(0, MAX_CHARACTERS) + '...'
  }
  return text;
}

const UserSelect = (people : people) => {
  return (
    <div
      className="px-5 py-[15px] border-t-primary border-t hover:bg-tertiary dark:hover:bg-sidebar-dark-primary lg:rounded-md cursor-pointer transition-all flex items-stretch justify-center dark:border-t-contact-dark-primary dark:hover:bg-sidebar-dark-tertiary dark:text-dark-gray"
    >
      <div
        className='flex items-center justify-center mr-4'
      >
        <div className='relative w-fit'>
          <ProfileImg name={people.fullName} avatar={people.avatarUrl}/>
        </div>
      </div>
      <div
        className='flex-grow'
      >
        <h5 className='font-semibold text-txt-dark dark:text-light-gray text-[15px] mb-[2px] capitalize'>
          {truncateText(people.fullName)}
        </h5>
        <p className='dark:text-gray-2 dark:text-dark-gray text-[13px] dark:font-medium'>
          @{truncateText(people.username).split('@')[0]}
        </p>
      </div>
      <div
        className='flex flex-col items-center justify-between ml-2 text-txt-light dark:text-dark-gray'
      >
        <small
          className='text-xs mb-[2px] text-gray-1 dark:font-medium dark:text-dark-blue'
        >
          Add Friend
        </small>
      </div>
    </div>
  )
}

export default UserSelect