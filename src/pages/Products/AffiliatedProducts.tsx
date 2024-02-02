import { Button, Table } from "antd";
import type { TableProps } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useGetProductsQuery } from "../../queries/product";

interface DataType {
    key: string;
    name: string;
    image: any;
    brand: string;
    price: string;
    description: string;
    actions: any;
}

const AffiliatedProducts = () => {

    const { data, isLoading, error } = useGetProductsQuery(null);


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
            title: "Price",
            key: "price",
            dataIndex: "price",
        },
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
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


    const tableData: DataType[] = data?.data?.products?.map((el: any, i: any) => ({
        key: i,
        image: <img src={el?.images[0]?.url} className="w-8" />,
        name: el?.name,
        brand: el?.brand,
        price: el?.price,
        description: el?.description,
        action: <div className="flex gap-3"><FontAwesomeIcon icon={faEye} size="xs" />
            <FontAwesomeIcon icon={faPen} size="xs" />
            <FontAwesomeIcon icon={faTrash} size="xs" color="red" />
        </div>
    }));


    return (
        <>

            <div>
                <div>
                    Button
                </div>
                <div>
                    <Table scroll={{ x: 1300 }} columns={columns} dataSource={tableData} />
                </div>
            </div>
        </>
    );
}

export default AffiliatedProducts;

