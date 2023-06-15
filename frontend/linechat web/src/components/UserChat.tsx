import { AnimatePresence, motion } from "framer-motion"
import { useLayoutStore } from "../stores/layoutStore"
import UserInfoBar from "./UserInfoBar"
import { useEffect } from "react"

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
        </motion.div>}
    </AnimatePresence>
  )
}

export default UserChat