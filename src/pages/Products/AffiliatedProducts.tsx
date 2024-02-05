import { Button, Table } from "antd";
import type { TableProps } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash, faArrowLeftLong, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useGetProductsQuery } from "../../queries/product";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    //Call ProductApi's
    const { data, isLoading, error } = useGetProductsQuery(null);

    
    // Handle Button Functions Start
    function handleBackButton(){
        navigate("/products");
    }

    function handleViewButton(id:any){
        navigate(`/view-affiliated-products/${id}`);
    }
    // Handle Button Functions End



    // TableContent Start
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
    // Table Content End


    // TableData Fetching Start
    const tableData: DataType[] = data?.data?.products?.map((el: any, i: any) => ({
        key: i,
        image: <img src={el?.images[0]?.url} className="w-8" />,
        name: el?.name,
        brand: el?.brand,
        price: el?.price,
        description: el?.description,
        action: <div className="flex gap-3 cursor-pointer"><FontAwesomeIcon icon={faEye} size="xs" onClick={() => handleViewButton(el?._id)} />
            <FontAwesomeIcon icon={faPen} size="xs" />
            <FontAwesomeIcon icon={faTrash} size="xs" color="red" />
        </div>
    }));
    // TableData Fetching End


    return (
        <>

            <div>

                {/* Header Section Start */}
                <div className="mb-6">
                    <Button className='bg-blue-800 text-white w-11 h-11 rounded-full' onClick={handleBackButton}><FontAwesomeIcon icon={faArrowLeftLong} /></Button>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-black text-3xl font-semibold ">Affiliated Products</h2>
                    <Button className='bg-blue-800 text-white h-10'><FontAwesomeIcon icon={faPlus} className='mr-1' />ADD PRODUCT</Button>
                </div>
                {/* Header Section End */}


                {/* Table Start */}
                <div className="border border-stroke rounded-lg cursor-pointer">
                    <Table scroll={{ x: 1300 }} columns={columns} dataSource={tableData} />
                </div>
                {/* Table End */}

            </div>
        </>
    );
}

export default AffiliatedProducts;

