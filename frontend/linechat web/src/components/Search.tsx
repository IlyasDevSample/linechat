import { RiSearch2Line } from "react-icons/ri"

type Props = {
  placeholder: string
  title: string
}
const Search = ({ placeholder, title }: Props) => {
  return (
    <div
      className="pt-5 px-6"
    >
      <h4
        className="text-[calc(1.25625rem+.075vw)] font-semibold mb-5 capitalize"
      >
        {title}
      </h4>
      <div
        className='flex bg-tertiary dark:bg-sidebar-dark-primary dark:text-dark-blue rounded-md'
      >
        <span
          className="flex items-center justify-center text-xl w-14 text-gray-500 dark:text-dark-blue"
        >
          <RiSearch2Line />
        </span>
        <input type="text"
          className="bg-transparent outline-none w-full py-2 px-4 -ml-[1px] text-[.875rem] font-normal text-txt-dark dark:text-txt-dark-primary dark:placeholder:text-dark-blue placeholder:text-sm placeholder:text-txt-gray-2 placeholder:leading-5 h-[45px] dark:text-dark-blue placeholder:capitalize"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default Search