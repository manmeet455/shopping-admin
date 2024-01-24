import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

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
      "65a61ea9322cef379d3bc092"
    );
    const {
      data: detailsProduct,
      isLoading: loadingProduct,
      error: errorProduct,
    } = useGetGiftIdeasProductsByIdQuery("65a61ea9322cef379d3bc092");
   
    const tableData: DataType[] = detailsProduct?.data?.products?.map((el: any, i: any) => ({
      key: i,
      image: <img src={el?.images[0]?.url} className="h-15" />,
      name: <div className="text-ellipsis">{el?.name}</div>,
      brand: <div className="text-ellipsis">{el?.brand}</div>,
      description: <div className="text-ellipsis">{el?.description}</div>,
      price: <>${el?.price}</>,
      productUrl: el?.productUrl,
    }));
  
    const button = [<Button>Edit</Button>]
    return (
      <div>

         <CardWithButtons
          data={data?.data}
          isLoading={isLoading}
          error={error}
          actions={button}
        />

        <Table scroll={{ x: 1300 }} columns={columns} dataSource={tableData} />
      </div>
    );
  };

export default details;
