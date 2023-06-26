import ProfileImg from "./ProfileImg"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useUserSettingStore } from "../stores/userSettingStore"

const ChatSelectSkeleton = () => {
  const darkMode = useUserSettingStore(state => state.darkMode)
  
  return (
    <div
      className='px-5 py-[15px] border-t-primary border-t hover:bg-tertiary dark:hover:bg-sidebar-dark-primary lg:rounded-md cursor-pointer transition-all flex items-stretch justify-center dark:border-t-contact-dark-primary dark:hover:bg-sidebar-dark-tertiary'
    >
      <div
        className='flex items-center justify-center mr-4'
      >
        <div className='relative w-fit'>
          <ProfileImg isLoading name="" />
        </div>
      </div>
      <div
        className='flex-grow'
      >
        <h5>
          <SkeletonTheme {...darkMode && {... {baseColor:"#3E4A56", highlightColor:"#36404A"}}}>
            <Skeleton width={100} />
          </SkeletonTheme>
        </h5>
        <p >
          <SkeletonTheme {...darkMode && {... {baseColor:"#3E4A56", highlightColor:"#36404A"}}}>
            <Skeleton />
          </SkeletonTheme>
        </p>
      </div>
      <div
        className='flex flex-col items-center justify-between ml-2'
      >
        <small
          className='mb-[2px] '
        >
          <SkeletonTheme {...darkMode && {... {baseColor:"#3E4A56", highlightColor:"#36404A"}}}>
            <Skeleton width={20} />
          </SkeletonTheme>
        </small>
      </div>
    </div>
  )
}

export default ChatSelectSkeleton