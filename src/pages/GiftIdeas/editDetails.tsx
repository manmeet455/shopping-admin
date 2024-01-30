import { Button, Form, Input, Upload, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
// import { UploadOutlined } from '@ant-design/icons';

import { useGetGiftIdeasByIdQuery, useGetGiftIdeasEditProductsByIdQuery, useUpdateGiftIdeasMutation } from "../../queries/giftIdea";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


interface DataType {
    key: string;
    name: string;
    image: any;
    brand: string;
    description: string;
    price: string;
    productUrl: string;
}

const editDetails = () => {

    const { id } = useParams();
    const { data, isLoading, error } = useGetGiftIdeasByIdQuery(id);
    console.log(data, "bhandari");

    const selectedIds = data?.data?.products;
    console.log(selectedIds, "Manmeet");

    //handle Back Button function Start
    const navigate = useNavigate();

    function handleBackbutton() {
        navigate("/gift-ideas")
    }
    //handle Back Button function End

    
    // Edit GiftIdeas TableContent Start 
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Image',
            dataIndex: 'image',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            ellipsis: true,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
        },
        {
            title: 'Descrnameiption',
            dataIndex: 'description',
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'ProductUrl',
            dataIndex: 'productURL',
            ellipsis: true,
        },
        // {
        //     title: 'Actions',
        //     dataIndex: 'actions',
        // },
    ];
    //  Edit GiftIdeas TableContent End

    
    const { data: editProducts, isLoading: isLoadingEditProducts, error: errorEditProducts } = useGetGiftIdeasEditProductsByIdQuery(id);

    //useState for update api
    const [categoryData, setCategoryData] = useState({
        name: "",
        description: "",
        image: "",
        products: [""],
    });

    //Update api(Edit)
    const [updateCategory] = useUpdateGiftIdeasMutation();

    const tableData: DataType[] = editProducts?.data?.products?.map((el: any, i: any) => ({
        key: el?._id,
        image: <img src={el?.images[0]?.url} className="w-8" />,
        name: <div className="text-ellipsis">{el?.name}</div>,
        brand: <div className="text-ellipsis">{el?.brand}</div>,
        description: <div className="text-ellipsis">{el?.description}</div>,
        price: <>${el?.price}</>,
        productURL: el?.productUrl,
    }));


    //rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setCategoryData({ ...categoryData, products: selectedRows?.map((item) => item?.key) })
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const updateCategoryHandler = () => {
        const updatedCategoryData = { ...categoryData, id }
        console.log(updatedCategoryData, "check")
        updateCategory(updatedCategoryData).then((res: any) => alert(res?.data?.message));
    }

    useEffect(() => {
        if (id && data) {
            setCategoryData({
                name: data?.data?.name,
                description: data?.data?.description,
                image: data?.data?.image,
                products: data?.data?.products
            })
        }
    }, [data])

    if (isLoading) {
        return <>Loading...</>
    }
    if (error) {
        return <>Something Went Wrong...</>
    }

    if (isLoadingEditProducts) {
        return <>Loading...</>
    }
    if (errorEditProducts) {
        return <>Something Went Wrong...</>
    }

    return (
        <>

            {/* Edit GiftIdeas Header Section Start */}
            <div>
                <div className='mb-5'>
                    <Button className='bg-blue-800 text-white w-11 h-11 rounded-full ' onClick={handleBackbutton}><FontAwesomeIcon icon={faArrowLeftLong} /></Button>
                </div>
                <div className='mb-4'>
                    <h2 className='text-black font-semibold text-3xl'>Edit Gift Idea</h2>
                </div>
            </div>
            {/* Edit GiftIdeas Header Section End */}


            {/* Edit GiftIdeas Form Start */}
            <div className='rounded-lg border border-stroke bg-white '>
                <div className='mt-6 mb-4 ml-6'>
                    <Form
                        name="wrap"
                        labelCol={{ flex: '110px' }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{ flex: 1 }}
                        colon={false}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            label={<h3 className='font-semibold text-xl text-black'>Name</h3>}
                            name="username"
                            initialValue={data?.data?.name}
                        >
                            <Input className="border-0 rounded-none border-b-2 !shadow-none hover:border-black" onChange={(event) => setCategoryData({ ...categoryData, name: event.target.value })} />
                        </Form.Item>

                        <Form.Item
                            label={<h3 className='font-semibold text-xl text-black'>Description</h3>}
                            name="password"
                            initialValue={data?.data?.description}
                        >
                            <Input className="border-0 rounded-none border-b-2 !shadow-none hover:border-black" onChange={(event) => setCategoryData({ ...categoryData, description: event.target.value })} />
                        </Form.Item>

                        <label className='font-semibold text-xl text-black'>Image</label>
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button className="ml-17">Choose file</Button>
                        </Upload>
                        {<img src={data?.data?.image} className="h-45 w-50 mt-3 ml-27 border" />}
                    </Form>
                </div>
            </div>
            {/* Edit GiftIdeas Form End */}


            {/* Edt GiftIdeas Table Start */}
            <div className='rounded-lg border border-stroke bg-white mt-10'>
                <Table
                    scroll={{ x: 1300 }}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                        defaultSelectedRowKeys: selectedIds,
                    }}
                    columns={columns}
                    dataSource={tableData}
                />
            </div>
            {/* Edt GiftIdeas Table End */}


            {/* Edt GiftIdeas Bottom Buttons Start */}
            <div className='flex justify-end gap-10 mt-10'>
                <Button className="h-12 text-blue-800">CANCEL</Button>
                <Button className='h-10 bg-blue-800 text-white font-medium' onClick={updateCategoryHandler}>SAVE CHANGES</Button>
            </div>
            {/* Edt GiftIdeas Bottom Buttons End */}

        </>
    );
}

export default editDetails;