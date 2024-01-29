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

    //handle Back Button function
    const navigate = useNavigate();
    
    function handleBackbutton(){
        navigate("/gift-ideas")
    }
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

    const { data: editProducts, isLoading: isLoadingEditProducts, error: errorEditProducts } = useGetGiftIdeasEditProductsByIdQuery(id);

    //useState for update api
    const [categoryData, setCategoryData] = useState({
        name: "",
        description: "",
        image: "",
        products: [],
    });

    //Update api(Edit)
    const [updateCategory] = useUpdateGiftIdeasMutation();

    const tableData: DataType[] = editProducts?.data?.products?.map((el: any, i: any) => ({
        key: i,
        image: <img src={el?.images[0]?.url} className="h-15" />,
        name: <div className="text-ellipsis">{el?.name}</div>,
        brand: <div className="text-ellipsis">{el?.brand}</div>,
        description: <div className="text-ellipsis">{el?.description}</div>,
        price: <>${el?.price}</>,
        productURL: el?.productUrl,
    }));

   // const existingProductKeys = tableData.map((item) => item.key);
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const updateCategoryHandler = () => {
        const updatedCategoryData = { ...categoryData, id }
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
    },[data])

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

            <Button className='bg-blue-800 text-white w-11 h-11 rounded-full ' onClick={handleBackbutton}><FontAwesomeIcon icon={faArrowLeftLong} /></Button>

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
                    label="Name"
                    name="username"
                    initialValue={data?.data?.name}
                >
                    <Input onChange={(event) => setCategoryData({ ...categoryData, name: event.target.value })} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="password"
                    initialValue={data?.data?.description}
                >
                    <Input onChange={(event) => setCategoryData({ ...categoryData, description: event.target.value })} />
                </Form.Item>

                <label>Image</label>
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button className="ml-17">Choose file</Button>
                </Upload>
                {<img src={data?.data?.image} className="h-45 mt-4 ml-27 border" />}
            </Form>

            <div className="mt-12">
                <Table
                    scroll={{ x: 1300 }}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={tableData}
                />
            </div>

            <div className='flex justify-end gap-10 mt-6'>
            <Button className="h-12 text-blue-800">CANCEL</Button>
            <Button className='h-10 bg-blue-800 text-white font-medium' onClick={updateCategoryHandler}>SAVE CHANGES</Button>
            </div>

        </>
    );
}

export default editDetails;