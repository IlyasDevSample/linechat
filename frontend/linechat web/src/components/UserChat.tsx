import { AnimatePresence, motion } from "framer-motion"
import { useLayoutStore } from "../stores/layoutStore"
import UserInfoBar from "./UserInfoBar"
import { useEffect, useRef, useState } from "react"
import Message from "./Message"
import SimpleBar from "simplebar-react"
import { RiLock2Line, RiSendPlane2Fill } from 'react-icons/ri'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useUserSettingStore } from "../stores/userSettingStore"
import { BsEmojiSmile } from 'react-icons/bs'
import { IoIosAttach } from 'react-icons/io'
import { useWindowSize } from 'usehooks-ts'
import { useConversationStore } from "../stores/conversationStore"
import { useUserStore } from "../stores/userStore"
import brandLogo from '../assets/linechat_logo.png'


const UserChat = () => {
  const { width } = useWindowSize()
  const isChatOpen = useLayoutStore(state => state.isChatOpen)
  const setIsChatOpen = useLayoutStore(state => state.setIsChatOpen)
  const darkMode = useUserSettingStore(state => state.darkMode)
  const [messageText, setMessageText] = useState('')
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const [isCLickOutside, setIsClickOutside] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMobile, setIsMobile] = useState(true)
  const scrollToBottomRef = useRef<HTMLDivElement>(null)
  const selectedConversation = useConversationStore((state) => state.selectedConversation)
  const userDetails = useUserStore((state) => state.UserDetails)

  useEffect(() => {
    const handleResize = () => {
      if (width > 992) {
        setIsChatOpen(true)
        setIsMobile(false)
      } else {
        setIsChatOpen(false)
        setIsMobile(true)
      }
    }
    if (width > 992) {
      handleResize()
      window.addEventListener('resize', handleResize)
    } else {
      handleResize()
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [setIsChatOpen, isMobile, width])

  useEffect(() => {
    handleScrollTopBottom()
  }, [selectedConversation, isChatOpen])

  const handleClickOutsideEmoji = () => {
    if (isEmojiOpen && isCLickOutside) {
      setIsEmojiOpen(false)
    } else {
      setIsClickOutside(true)
    }
  }

  const handleScrollTopBottom = () => {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: 'instant', block: 'end' })
    }
  }

  if (selectedConversation === null || !userDetails) {
    if (isMobile) return null
    return (
      <div
        className={"flex flex-col justify-center items-center text-txt-dark dark:text-light-gray bg-white dark:bg-chat-dark-primary h-screen max-h-screen w-full overflow-hidden lg:shadow-primary-web fixed left-0 top-0 lg:visible lg:translate-x-0 lg:static transition-all duration-300 z-50"}
      >
        <div
          className="flex flex-col justify-center items-center flex-grow"
        >
          <img
            className="w-20 h-20 mb-4"
            src={brandLogo} alt="LineChat" />
          <h5
            className="text-xl font-semibold text-gray-600 dark:text-light-gray"
          >
            LineChat for Web
          </h5>
          <p
            className="text-gray-400 dark:text-dark-blue text-center mt-2 max-w-lg"
          >
            Start chatting with your friends and family on LineChat, send and receive messages, photos, videos, documents, and more!
          </p>
        </div>
        <div
          className="capitalize text-txt-light dark:text-dark-blue text-center mb-4 font-semibold text-gray-400 flex items-center justify-center"
        >
          <RiLock2Line className="mr-1 text-xl" />
          <h6>
          Secure and private messaging
          </h6>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isChatOpen &&
        <motion.div
          {...isMobile && {
            initial: { ...{ x: '100%' } },
            animate: { ...{ x: 0 } },
            exit: { ...{ x: '2000%' } },
            transition: { ...{ duration: 0.1 } }
          }}
          className={"text-txt-dark dark:text-light-gray bg-white dark:bg-chat-dark-primary h-screen max-h-screen w-full overflow-hidden lg:shadow-primary-web fixed left-0 top-0 lg:visible lg:translate-x-0 lg:static transition-all duration-300 z-50"}
        >
          <UserInfoBar conversation={selectedConversation} />
          <SimpleBar
            className={"w-full flex flex-col h-[calc(100vh-4rem)] overflow-y-auto pt-[74px] px-4"}
          >
            {selectedConversation.messages.map((message, i) => (
              <Message
                key={message.createdAt}
                fullName={message.sender === userDetails.username ? userDetails.fullName : selectedConversation.fullName}
                message={message.message}
                isUser={message.sender === userDetails.username}
                // check after message is sent by the same user if true don't show avatar
                showAvatar={i === selectedConversation.messages.length - 1 ? true : message.sender !== selectedConversation.messages[i + 1].sender}
                avatarURL={message.sender === userDetails.username ? userDetails.AvatarUrl : selectedConversation.avatarUrl}
              />
            ))}
            <div ref={scrollToBottomRef}></div>
          </SimpleBar>
          <div
            className="border-t border-gray-200 dark:border-sidebar-dark-primary w-full h-16 flex items-center justify-stretch py-2 px-2 md:px-4 absolute bottom-[0rem] left-0 right-0 bg-white dark:bg-chat-dark-primary"
          >
            <form
              autoComplete="off"
              noValidate
              className='flex justify-center items-center bg-tertiary dark:bg-sidebar-dark-primary dark:text-dark-blue rounded-md w-full'
            >
              <input type="search"
                ref={inputRef}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                name="message-text"
                className="text-txt-dark dark:text-light-gray bg-transparent outline-none w-full py-2 px-4 -ml-[1px] text-[.875rem] font-normal  dark:text-txt-dark-primary dark:placeholder:text-dark-blue placeholder:text-sm placeholder:text-txt-gray-2 placeholder:leading-5 h-[40px] placeholder:capitalize"
                placeholder="Type a message"
              />
              <button
                type="submit"
                className={"outline-none flex items-center justify-center text-gray-500 dark:text-dark-blue  rounded-lg mr-2 w-9 h-8 text-xl transition-all duration-300 hover:bg-quaternary-blue dark:hover:bg-quaternary-dark-blue hover:text-white dark:hover:text-white" + (messageText.length > 0 ? ' bg-quaternary-blue dark:bg-quaternary-dark-blue text-white dark:text-white' : '')}
              >
                <RiSendPlane2Fill />
              </button>
            </form>

            <div
              className="relative ml-1"
            >
              <div
                className="flex items-center justify-center text-gray-500 dark:text-dark-blue  rounded-lg w-[42px] h-10 text-xl transition-all duration-300 hover:bg-primary dark:hover:bg-sidebar-dark-primary dark:hover:text-white cursor-pointer"
                onClick={() => {
                  setIsEmojiOpen((prev) => !prev)
                  setIsClickOutside(false)
                }}
                tabIndex={0}
              >
                <BsEmojiSmile
                  className="text-xl"
                />
              </div>
              <AnimatePresence>
                {isEmojiOpen &&
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.1 }}
                    tabIndex={0}
                    className={`absolute ${!isMobile ? 'right-0 bottom-[247px]' : 'right-[-45px] bottom-[247px]'} h-full flex items-center justify-center`}
                  >
                    <Picker
                      onClickOutside={handleClickOutsideEmoji}
                      onEmojiSelect={(emoji: any) => { setMessageText(messageText + emoji.native) }} data={data}
                      theme={darkMode ? 'dark' : 'light'}
                      autoFocus={inputRef.current?.focus()}
                    />
                  </motion.div>
                }
              </AnimatePresence>
            </div>

            <div
              className="relative flex items-center justify-center text-gray-500 dark:text-dark-blue  rounded-lg w-12 h-10 text-xl transition-all duration-300 hover:bg-primary dark:hover:bg-sidebar-dark-primary dark:hover:text-white cursor-pointer"
            >
              <IoIosAttach
                className="text-xl w-[42px]"
              />
            </div>
          </div>
        </motion.div>}
    </AnimatePresence>
  )
}

export default UserChat