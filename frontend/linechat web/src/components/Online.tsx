import ProfileImg from "./ProfileImg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import UserStatus from "./UserStatus";

const Online = () => {
  return (
    <div
      className="pb-5 px-6"
    >
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        className="w-full"
      >
        {[...Array(10)].map((_, i) => (
          <SwiperSlide
            key={i}
            className="w-[71px] h-[91px] flex items-end"
          >
            <div
              className="p-2 w-[71px] bg-tertiary dark:bg-sidebar-dark-primary rounded-md relative cursor-pointer"
            >
              <div
                className="absolute -top-5 left-1/2 transform -translate-x-1/2"
              >
                <ProfileImg name="Ilyas elaissi" />
                <UserStatus status="online" />
              </div>
              <h5 className="select-none w-full mt-3 text-center mb-[3px] font-semibold text-[13px] truncate capitalize">
                {"Ilyas elaissi".split(" ")[0]}
              </h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Online