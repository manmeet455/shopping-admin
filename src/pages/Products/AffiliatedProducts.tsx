import { Button, Table } from "antd";
import type { TableProps } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash, faArrowLeftLong, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useDeleteProductMutation, useGetProductsQuery } from "../../queries/product";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomModal } from "../../customComponents/modal";

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
    const location = useLocation();

    const isAffiliate = location?.pathname?.includes("affiliated-products");


    //Call ProductApi's
    const { data, isLoading, error, refetch } = useGetProductsQuery({ page: 1, limit: 50, isAffiliate });
    useEffect(() => {
        refetch();
    }, []);
    const [deleteProduct] = useDeleteProductMutation();


    // Handle Button Functions Start
    function handleBackButton() {
        navigate("/products");
    }

    function handleViewButton(id: any) {
        { isAffiliate ? navigate(`/view-affiliated-products/${id}`) : navigate(`/view-suscel-products/${id}`) };
    }

    function handleEditButton(id: any) {
        { isAffiliate ? navigate(`/edit-affiliated-products/${id}`) : navigate(`/edit-suscel-products/${id}`) };
    }
    // Handle Button Functions End


    //Handle AddProduct Button Start
    function handleAddProductButton() {
        navigate(`/edit-affiliated-products/new`);
    }


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
    ];
    // Table Content End

    //useState for Modal Start
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currData, setCurrData] = useState<any>();
    //useState for Modal End


    //Functions for Handle Modal Start
    function showModalHandler(el: any) {
        setCurrData(el)
        setIsModalOpen(true);
    }
    const handleOk = (id: any) => {
        deleteProduct(id).then(() => refetch());
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //Functions for Handle Modal End


    // TableData Fetching Start
    const tableData: DataType[] = data?.data?.products?.map((el: any, i: any) => ({
        key: i,
        image: <img src={el?.images[0]?.url} className="w-8" />,
        name: <div >{el?.name}</div>,
        brand: <div >{el?.brand}</div>,
        price: <div >{el?.price}</div>,
        description: <div >{el?.description}</div>,
        action: <div className="flex gap-3 cursor-pointer"><FontAwesomeIcon icon={faEye} size="xs" onClick={() => handleViewButton(el?._id)} />
            <FontAwesomeIcon icon={faPen} size="xs" onClick={(e) => {
                e.stopPropagation();
                handleEditButton(el?._id)
            }} />
            <FontAwesomeIcon icon={faTrash} size="xs" color="red" onClick={(e) => {
                e.stopPropagation();
                showModalHandler(el);
            }} />
        </div>
    }));
    // TableData Fetching End


    if (isLoading) {
        return <>Loading...</>
    }
    if (error) {
        return <>Something went wrong...</>
    }


    return (
        <>

            <div>
                {/* Header Section Start */}
                <div className="mb-6">
                    <Button className='bg-blue-800 text-white w-11 h-11 rounded-full' onClick={handleBackButton}><FontAwesomeIcon icon={faArrowLeftLong} /></Button>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-black text-3xl font-semibold ">{isAffiliate ? "Affiliated Products" : "Suscel Products"}</h2>
                    <Button className='bg-blue-800 text-white h-10' onClick={handleAddProductButton}><FontAwesomeIcon icon={faPlus} className='mr-1' /> ADD PRODUCT</Button>
                </div>
                {/* Header Section End */}


                {/* Table Start */}
                <div className="border border-stroke rounded-lg cursor-pointer">
                    <Table
                        onRow={(record, i: any) => {
                            return {
                                onClick: () => handleViewButton(data?.data?.products?.[i]?._id)
                            }
                        }}

                        scroll={{ x: 1300 }} pagination={{ defaultPageSize: 10 }} columns={columns} dataSource={tableData} />
                        <div onClick={(e) => { e.stopPropagation(); }}>
                <CustomModal
                    title={'Confirm Delete'}
                    open={isModalOpen}
                    onOk={() => handleOk(currData?._id)}
                    onCancel={handleCancel}
                    cancelText={'no'}
                    okText={'yes'}
                    okButtonProps={{ className: 'bg-red-700' }}
                    message={<p>Are you sure you want to delete this product?</p>}
                />
            </div>
                </div>
                {/* Table End */}
            </div>

        </>
    );
}

export default AffiliatedProducts;

