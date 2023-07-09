import { motion } from "framer-motion"
import Search from "../components/Search"
import SimpleBar from "simplebar-react"
import UserSelect from "../components/UserSelect"
import { people } from "../types/peopleUser"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuthStore } from "../stores/authStore"
import ChatSelectSkeleton from "../components/ChatSelectSkeleton"

const People = () => {
  const [Peoples, setPeoples] = useState<people[]>([])
  const [ isLoading, setIsLoading ] = useState(true)
  const bearerToken = useAuthStore((state) => state.bearerToken)
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/people/all",{
      headers: {
        Authorization: bearerToken,
      },
    })
    .then((res) => {
      setPeoples(res.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }, [bearerToken])
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="w-full text-txt-dark dark:text-light-gray"
    >
      <Search title="People" placeholder="search for other users" />
      <SimpleBar
        className={`w-full overflow-y-auto lg:h-[calc(100vh-116px)] h-[calc(100vh-calc(59px+116px))] py-2`}
      >
        {isLoading && Array(10).fill(0).map((_, i) => (<ChatSelectSkeleton />))}
        {Peoples.map((people, i) => (
          <UserSelect 
            key={i}
            {...people}
          />
        ))}
      </SimpleBar>
    </motion.div>
  )
}

export default People