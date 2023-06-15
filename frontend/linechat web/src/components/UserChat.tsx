import { AnimatePresence, motion } from "framer-motion"
import { useLayoutStore } from "../stores/layoutStore"
import UserInfoBar from "./UserInfoBar"
import { useEffect } from "react"
import Message from "./Message"
import SimpleBar from "simplebar-react"
import { RiSendPlane2Fill } from 'react-icons/ri'

const UserChat = () => {
  const isChatOpen = useLayoutStore(state => state.isChatOpen)
  const setIsChatOpen = useLayoutStore(state => state.setIsChatOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsChatOpen(true)
      } else {
        setIsChatOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsChatOpen])

  return (
    <AnimatePresence>
      {isChatOpen &&
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '2000%' }}
          transition={{ duration: 0.1 }}
          className={"text-txt-dark dark:text-light-gray bg-white dark:bg-chat-dark-primary h-screen max-h-screen w-full overflow-hidden lg:shadow-primary-web fixed left-0 top-0 lg:visible lg:translate-x-0 lg:static transition-all duration-300 z-50"}
        >
          <UserInfoBar />
          <SimpleBar
            className={"w-full flex flex-col justify-end items-center h-[calc(100vh-4rem)] overflow-y-auto pt-[74px]"}
          >
            first
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            last
          </SimpleBar>
          <div
            className="border-t border-gray-200 dark:border-sidebar-dark-primary w-full h-16 flex items-center justify-stretch py-2 px-4"
          >
            <form
              noValidate
              className='flex justify-center items-center bg-tertiary dark:bg-sidebar-dark-primary dark:text-dark-blue rounded-md w-full'
            >
              <input type="text"
                className="text-txt-dark dark:text-light-gray bg-transparent outline-none w-full py-2 px-4 -ml-[1px] text-[.875rem] font-normal  dark:text-txt-dark-primary dark:placeholder:text-dark-blue placeholder:text-sm placeholder:text-txt-gray-2 placeholder:leading-5 h-[40px] placeholder:capitalize"
                placeholder="Type a message"
              />
              <button
                type="submit"
                className="outline-none flex items-center justify-center text-gray-500 dark:text-dark-blue  rounded-lg mr-2 w-9 h-8 text-xl transition-all duration-300 hover:bg-quaternary-blue dark:hover:bg-quaternary-dark-blue hover:text-white dark:hover:text-white"
              >
                <RiSendPlane2Fill />
              </button>
            </form>
          </div>

        </motion.div>}
    </AnimatePresence>
  )
}

export default UserChat