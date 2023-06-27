import { useUserSettingStore } from "../stores/userSettingStore"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
  name: string
  avatar?: string
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}
const ProfileImg = ({ name, avatar, size = 'md', isLoading }: Props) => {

  const darkMode = useUserSettingStore(state => state.darkMode)

  const calcSize = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8'
      case 'md':
        return 'w-10 h-10'
      case 'lg':
        return 'w-12 h-12'
      default:
        return 'w-10 h-10'
    }
  }
  if (isLoading) {

    let sizePX = 0
    switch (size) {
      case 'sm':
        sizePX = 32
        break
      case 'md':
        sizePX = 40
        break
      case 'lg':
        sizePX = 48
        break
      default:
        sizePX = 40
        break
    }
    if (darkMode) {
      return (
        <SkeletonTheme baseColor="#3E4A56" highlightColor="#36404A">
          <Skeleton circle={true} height={sizePX} width={sizePX} />
        </SkeletonTheme>
      )
    } else {
      return (
        <SkeletonTheme baseColor="#E6EBF5">
          <Skeleton circle={true} height={sizePX} width={sizePX} />
        </SkeletonTheme>
      )
    }
  }



  if (avatar) {
    return (
      <img src={avatar} alt={name + ' avatar'}
        className={`${calcSize()} rounded-full select-none cursor-pointer border-2 border-gray-300 dark:border-quaternary-blue`}
      />
    )
  }
  return (
    <span className={`${calcSize()} capitalize cursor-pointer select-none bg-quaternary-light-blue rounded-full flex items-center justify-center text-quaternary-blue text-xl font-semibold`}>
      {name[0]}
    </span>
  )
}

export default ProfileImg