import { Button, Form, Input, Upload, Table } from 'antd';

interface IProps {
    data: any,
    isLoading: boolean,
    error: any,
}
const CardWithProductDetails = (props: IProps) => {
    const { data, isLoading, error } = props;
    // console.log(data?.data?.images?.map((image: any) => <img src={image.url} />), "images")
    if (isLoading) {
        return <>Loading</>
    }
    if (error) {
        return <>Something Went Wrong...</>
    }

    return (
        <>
            <div>
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
                        label={<h3 className='font-semibold text-xl text-black'>Product Url</h3>}
                        name="username"
                        initialValue={data?.data?.productUrl}
                    >
                        <Input className="border-0 rounded-none border-b-2 !shadow-none hover:border-black" />
                    </Form.Item>

                    <Form.Item
                        label={<h3 className='font-semibold text-xl text-black'>Name</h3>}
                        name="password"
                        initialValue={data?.data?.name}
                    >
                        <Input className="border-0 rounded-none border-b-2 !shadow-none hover:border-black" />
                    </Form.Item>

                    <Form.Item
                        label={<h3 className='font-semibold text-xl text-black'>Brand</h3>}
                        name="Brand"
                        initialValue={data?.data?.brand}
                    >
                        <Input className="border-0 rounded-none border-b-2 !shadow-none hover:border-black" />
                    </Form.Item>

                    <Form.Item
                        label={<h3 className='font-semibold text-xl text-black'>Description</h3>}
                        name="Description"
                        initialValue={data?.data?.description}
                    >
                        <Input className="border-0 rounded-none border-b-2 !shadow-none hover:border-black" />
                    </Form.Item>

                    <Form.Item
                        label={<h3 className='font-semibold text-xl text-black'>Price(AU$)</h3>}
                        name="Price"
                        initialValue={data?.data?.price}
                    >
                        <Input className="border-0 rounded-none border-b-2 !shadow-none hover:border-black" />
                    </Form.Item>

                    <Form.Item
                        label={<h3 className='font-semibold text-xl text-black'>Image</h3>}
                        name="Image"
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button className="ml-17">Choose file</Button>
                            <div className='grid grid-cols-2 gap-2 mt-3'>
                                {data?.data?.images?.map((image: any) => <img src={image.url} className='h-40 w-50 border p-1 mt-3'/>)}
                            </div>
                        </Upload>

                    </Form.Item>
                </Form>
            </div>

        </>
    )
}

export default CardWithProductDetails;
