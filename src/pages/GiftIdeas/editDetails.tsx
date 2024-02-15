import { Button, Form, Input, Upload, Table} from 'antd';
import type { TableColumnsType } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
// import { UploadOutlined } from '@ant-design/icons';

import { useAddGiftIdeasMutation, useGetGiftIdeasByIdQuery, useGetGiftIdeasEditProductsByIdQuery, useUpdateGiftIdeasMutation } from "../../queries/giftIdea";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddImageMutation } from '../../queries/upload';


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

    const selectedIds = data?.data?.products;

    //handle BackButton function Start
    const navigate = useNavigate();

    function handleBackbutton() {
        navigate("/gift-ideas")
    }
    //handle BackButton function End


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
            title: 'Description',
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
    const [addCategory] = useAddGiftIdeasMutation();

    const tableData: DataType[] = editProducts?.data?.products?.map((el: any, i: any) => ({
        key: el?._id,
        image: <img src={el?.images[0]?.url} className="w-8" />,
        name: el?.name,
        brand: el?.brand,
        description: el?.description,
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
        if (id === 'new') {
            addCategory(categoryData)
        } else {
            const updatedCategoryData = { ...categoryData, id }
            console.log(updatedCategoryData, "check")
            updateCategory(updatedCategoryData).then((res: any) => alert(res?.data?.message));
        }
    }

    // upload image

    const [addSingleImage] = useAddImageMutation();

    function handleSingleImage(e: any)
    {
        const fileType = e?.file?.type.split('/')[1];

        const dataToSend = {fileType}
        // {filesType: [fileType]}

        addSingleImage(dataToSend).then((res) => {
            // console.log(res,"ress");
            const {fileUrl} = res?.data?.data;
    //   console.log(fileUrl,"fileUrl")
      setCategoryData({ ...categoryData, image: fileUrl })
        })
    }

    //update api 
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
    // if (error) {
    //     return <>Something Went...</>
    // }

    if (isLoadingEditProducts) {
        return <>Loading...</>
    }
    if (errorEditProducts) {
        return <>Something Went...</>
    }

    return (
        <>

            {/* Edit GiftIdeas Header Section Start */}
            <div>
                <div className='mb-5'>
                    <Button className='bg-blue-800 text-white w-11 h-11 rounded-full ' onClick={handleBackbutton}><FontAwesomeIcon icon={faArrowLeftLong} /></Button>
                </div>
                <div className='mb-4'>
                    <h2 className='text-black font-semibold text-3xl'>{id === "new" ? "Add" : "Edit"} Gift Idea</h2>
                </div>
            </div>
            {/* Edit GiftIdeas Header Section End */}


            {/* Edit GiftIdeas Form Start */}
            <div className='rounded-lg border border-stroke bg-white '>
                <div className='mt-6 mb-4 ml-6'>
                    <Form
                        name="wrap"
                        labelCol={{ flex: '140px' }}
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

                        {/* <label className='font-semibold text-xl text-black'>Image</label> */}
                        <Form.Item
                        label={<h3 className='font-semibold text-xl text-black'>Image</h3>}
                        name="Image"
                    >
                        <Upload name="logo" onChange={handleSingleImage} action="/upload.do" listType="picture">
                            <Button>Choose file</Button>
                            {<img src={data?.data?.image} className="h-45 w-50 mt-3 border border-graydark" />}
                        </Upload>
                        {/* {<img src={data?.data?.image} className="h-45 w-50 mt-3 ml-27 border" />} */}
                        </Form.Item>
                    </Form>
                </div>
            </div>
            {/* Edit GiftIdeas Form End */}


            {/* Edit GiftIdeas Table Start */}
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
            {/* Edit GiftIdeas Table End */}


            {/* Edit GiftIdeas Bottom Buttons Start */}
            <div className='flex justify-end gap-10 mt-10'>
                <Button className="h-12 text-blue-800" onClick={handleBackbutton}>CANCEL</Button>
                <Button className='h-10 bg-blue-800 text-white font-medium' onClick={updateCategoryHandler}>{id === "new" ? "ADD CATEGORY" : "SAVE CHANGES"}</Button>
            </div>
            {/* Edit GiftIdeas Bottom Buttons End */}

        </>
    );
}

export default editDetails;