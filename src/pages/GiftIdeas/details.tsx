import { Button, Table} from "antd";
import { useParams } from "react-router-dom";
import type { TableProps } from "antd";
// import { SearchOutlined } from '@ant-design/icons';

import CardWithButtons from "../../customComponents/cardWithButtons";
import { useGetGiftIdeasProductsByIdQuery, useGetGiftIdeasByIdQuery } from "../../queries/giftIdea";
import { useNavigate } from "react-router-dom";

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

    const {id} = useParams();

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
   
    
    const { data, isLoading, error } =  useGetGiftIdeasByIdQuery(
      id
    );
    const {
      data: detailsProduct,
      isLoading: loadingProduct,
      error: errorProduct,
    } = useGetGiftIdeasProductsByIdQuery(id);

    // const {
    //   data: detailsProduct,
    //   isLoading: loadingProduct,
    //   error: errorProduct,
    // } = useGetGiftIdeasProductsByIdQuery("65a61ea9322cef379d3bc092");
   
    const tableData: DataType[] = detailsProduct?.data?.products?.map((el: any, i: any) => ({
      key: i,
      image: <img src={el?.images[0]?.url} className="h-15" />,
      name: el?.name,
      brand: el?.brand,
      description: el?.description, 
      price: <>${el?.price}</>,
      productUrl: el?.productUrl,
    }));

    const navigate = useNavigate();

    function handleEdit(){
      navigate(`/editDetails/${id}`);
    }
  
    const button = [<Button className="bg-blue-800 text-white" onClick={handleEdit}>Edit</Button>]

    return (
      <>

      <div>
         <CardWithButtons
          data={data?.data}
          isLoading={isLoading}
          error={error}
          actions={button}
        />
        </div>

        <div className="mt-10">
        <Table scroll={{ x: 1300 }} columns={columns} dataSource={tableData} />
        </div>
      </>
    );
  };

export default details;
