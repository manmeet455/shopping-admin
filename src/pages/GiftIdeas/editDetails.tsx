import { useGetGiftIdeasByIdQuery, useGetGiftIdeasEditProductsByIdQuery } from "../../queries/giftIdea";

import { Button, Form, Input, Upload, Table, Tag, Space } from 'antd';
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
// import { UploadOutlined } from '@ant-design/icons';


const editDetails = () => {

    const { data, isLoading, error } = useGetGiftIdeasByIdQuery("65a61ea9322cef379d3bc092");
    const { data: editProducts, isLoadingEditProducts, errorEditProducts } = useGetGiftIdeasEditProductsByIdQuery("65a61ea9322cef379d3bc092");
    console.log(editProducts, "hi");
    


    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <>
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="password"
                    initialValue={data?.data?.description}
                >
                    <Input />
                </Form.Item>

                <label>Image</label>
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button className="ml-17">Choose file</Button>
                </Upload>
                {<img src={data?.data?.image} className="h-45 mt-4 ml-27 border" />}
            </Form>




        </>
    );
}

export default editDetails;