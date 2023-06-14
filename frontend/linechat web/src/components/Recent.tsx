import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const Recent = () => {
  

  return (
    <div>
      <h5
        className='px-4 mb-4 font-semibold'
      >
        Recent
      </h5>
      <SimpleBar
        className={`w-full overflow-y-auto lg:h-[calc(100vh-267px)] h-[calc(100vh-calc(59px+267px))]`}
      >
        <div
          className='px-5 py-[15px]'
        >

        </div>
      </SimpleBar>
    </div>
  )
}

export default Recent