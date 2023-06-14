import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ProfileImg from './ProfileImg';

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
          className='px-5 py-[15px] border-t-primary border-t hover:bg-tertiary rounded-md cursor-pointer transition-all'
        >
          <div>
            <ProfileImg name='ilyas elaissi' />
          </div>
          <div></div>
          <div></div>
        </div>
      </SimpleBar>
    </div>
  )
}

export default Recent