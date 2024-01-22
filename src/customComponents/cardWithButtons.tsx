interface IProps {
  data: any,
  isLoading: boolean,
  error: any,
}

const CardWithButtons = (props: IProps) => {

  const { error, data, isLoading } = props;

  if (isLoading) {
    return <></>
  }

  if (error) {
    return <></>
  }


  return (

    <div>
          <div className="flex">
            <div className="w-22 h-20 mr-7 ml-4 mt-5">
              <img src={data?.image} alt="hi" />
            </div>
            <div className="mt-5">
              <h4 className="font-bold text-black ">{data?.name}</h4>
              <p><b className="mr-1">Description:</b> {data?.description}</p>
              <div>
                <p>
                  <b className="mr-1">Items:</b>
                  {data?.products?.length}
                  {data?.price}
                </p>
              </div>
            </div>
            {/* <div>some icon</div> */}
          </div>
    </div>


  );
}

export default CardWithButtons;



{/* <div>
<div>
  <img src={data?.image} alt="hi" />
</div>
<div>
  {data?.name}
  {data?.description}
  <span>{data?.products?.length}</span>
  <span>{data?.price}</span>
</div>
<div></div>
</div> */}