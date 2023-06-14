import { motion } from "framer-motion"
import Recent from "../components/Recent"
import Search from "../components/Search"
import Online from "../components/Online"

const Chat = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="w-full text-txt-dark dark:text-light-gray"
    >
      <Search title="chats" placeholder="search recent conversations" />
      <Online />
      <Recent />
    </motion.div>
  )
}

export default Chat