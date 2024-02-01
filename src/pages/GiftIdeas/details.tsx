import { Button, Table } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import type { TableProps } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
// import { SearchOutlined } from '@ant-design/icons';

import CardWithButtons from "../../customComponents/cardWithButtons";
import { useGetGiftIdeasProductsByIdQuery, useGetGiftIdeasByIdQuery } from "../../queries/giftIdea";

interface DataType {
  key: string;
  name: string;
  image: any;
  brand: string;
  description: string;
  price: string;
  productUrl: string;
}

const details = () => {

  //handle BackButton function Start
  function handleBackbutton() {
    navigate("/gift-ideas")
  }
  //handle BackButton function End

  const { id } = useParams();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "ProductURL",
      key: "productUrl",
      dataIndex: "productUrl",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];


  const { data, isLoading, error } = useGetGiftIdeasByIdQuery(
    id
  );
  const {
    data: detailsProduct, isLoading: loadingProduct, error: errorProduct} = useGetGiftIdeasProductsByIdQuery(id);

  // const {
  //   data: detailsProduct,
  //   isLoading: loadingProduct,
  //   error: errorProduct,
  // } = useGetGiftIdeasProductsByIdQuery("65a61ea9322cef379d3bc092");
  

  const tableData: DataType[] = detailsProduct?.data?.products?.map((el: any, i: any) => ({
    key: i,
    image: <img src={el?.images[0]?.url} className="w-8" />,
    name: el?.name,
    brand: el?.brand,
    description: el?.description,
    price: <>${el?.price}</>,
    productUrl: el?.productUrl,
  }));

  const navigate = useNavigate();

  function handleEdit() {
    navigate(`/editDetails/${id}`);
  }

  const button = [<Button className="bg-blue-800 text-white" onClick={handleEdit}>Edit</Button>]

  return (
    <>

      {/* Details Header Start */}
      <div>
        <div className="mb-5">
          <Button className='bg-blue-800 text-white w-11 h-11 rounded-full' onClick={handleBackbutton}><FontAwesomeIcon icon={faArrowLeftLong} /></Button>
        </div>
        <div className="mb-4">
          <h2 className="text-black text-3xl font-semibold ">Gift Idea Details</h2>
        </div>
      </div>
      {/* Details Header End */}


      {/* Details Card Start */}
      <div>
        <CardWithButtons
          data={data?.data}
          isLoading={isLoading}
          error={error}
          actions={button} 
          showDetails = {false}
        />
      </div>
      {/* Details Card End */}


      {/* Details Table Start */}
      <div className='rounded-lg border border-stroke bg-white mt-10'>
        <Table scroll={{ x: 1300 }} columns={columns} dataSource={tableData} />
      </div>
      {/* Details Table End */}

    </>
  );
};

export default details;
