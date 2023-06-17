type Props = {
  name: string
  avatar?: string
  size?: 'sm' | 'md' | 'lg'
}
const ProfileImg = ({ name, avatar, size= 'md' }: Props) => {
  
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

  if (avatar) {
    return (
      <img src={avatar} alt={name+' avatar'}
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