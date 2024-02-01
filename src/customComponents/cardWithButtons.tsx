// import { Button } from "antd";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faEye, faEdit} from '@fortawesome/free-solid-svg-icons';

interface IProps {
  data: any,
  isLoading: boolean,
  error: any,
  actions: any[],
  showDetails?: boolean,
}

const CardWithButtons = (props: IProps) => {
  const { error, data, isLoading, actions, showDetails = true } = props;

  if (isLoading) {
    return <>Loading</>
  }

  if (error) {
    return <>Error</>
  }

  return (
    <div className="flex items-center bg-white  gap-4 cursor-pointer border border-stroke rounded-lg">
      <div className="w-20 h-20 ml-3 ">
        <img src={data?.image} alt="image" />
      </div>
      <div className="mt-4 mb-4">
        <h4 className="font-bold text-black ">{data?.name}</h4>
        <p><b className="mr-1">Description:</b> {data?.description}</p>
        <div>
          {showDetails && (<p>
            <b className="mr-1">Items:</b>
            {data?.products?.length}
            {data?.price && <b className="mr-1">Price:</b>}
            {data?.price && <>${data?.price}</>}
          </p>)}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 ml-auto mr-10">
        {props.actions?.map((Component) => Component)}
      </div>
    </div>
  );
}

export default CardWithButtons;


