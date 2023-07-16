import { motion } from "framer-motion"
import ProfileImg from "../components/ProfileImg"
import { useUserStore } from "../stores/userStore"

const Profile = () => {
  const userDetails = useUserStore((state) => state.UserDetails)
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="pt-5 px-6"
    >
      <h4
        className="text-[calc(1.25625rem+.075vw)] font-semibold mb-5 capitalize dark:text-dark-blue text-txt-dark"
      >
        My Profile
      </h4>
      <div
        className="flex items-center justify-start w-full"
      >
        <ProfileImg name={userDetails?.fullName ?? "?"} avatar={userDetails?.AvatarUrl} size="lg" />
        <div
          className="ml-5"
        >
          <h5
            className="text-[calc(1.25625rem+.075vw)] font-semibold capitalize dark:text-dark-blue text-txt-dark"
          >
            {userDetails?.fullName}
          </h5>
          <p
            className="text-txt-gray-2 dark:text-dark-blue text-sm"
          >
            {userDetails?.username}
          </p>
        </div>
      </div>
      <div
        className="mt-14"
      >

      </div>
    </motion.div>
  )
}

export default Profile