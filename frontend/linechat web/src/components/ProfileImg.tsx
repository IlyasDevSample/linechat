type Props = {
  name: string
  avatar?: string
}
const ProfileImg = ({ name, avatar }: Props) => {
  if (avatar) {
    return (
      <img src={avatar} alt={name+' avatar'}
        className='h-10 w-10 rounded-full select-none cursor-pointer border-2 border-gray-300 dark:border-quaternary-blue'
      />
    )
  }
  return (
    <span className="w-10 h-10 capitalize cursor-pointer select-none bg-quaternary-light-blue rounded-full flex items-center justify-center text-quaternary-blue text-xl font-semibold">
      {name[0]}
    </span>
  )
}

export default ProfileImg