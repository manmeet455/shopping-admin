import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


const CardOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">

      <FontAwesomeIcon color='#3c4fe0' icon={faCartShopping}  />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            14
          </h4>
          <span className="text-sm font-medium text-black">Total orders</span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          <NavLink to='#' className='text-[#3c50e0]'>View All</NavLink>
        </span>
      </div>
    </div>
  );
};

export default CardOne;
