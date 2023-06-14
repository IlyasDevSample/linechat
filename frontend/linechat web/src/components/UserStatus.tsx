type Props = {
  status: 'online' | 'offline' | 'away'
}
const UserStatus = ({ status }: Props) => {
  return (
    <span
      className={"absolute bottom-0 right-0 w-[11px] h-[11px] rounded-full border-2 border-white dark:border-sidebar-dark-primary "+ (status === 'online' ? 'bg-green-500' : status === 'offline' ? 'bg-gray-400' : 'bg-yellow-500')}
    ></span>
  )
}

export default UserStatus