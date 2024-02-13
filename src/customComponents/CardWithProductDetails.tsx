import { Button, Form, Input, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
    data: any,
    isLoading: boolean,
    error: any,
    isView: boolean,
    handleCancelButton: () => void,
    handleOkButton: () => void,
    setProductData: any,
    productData: any,
}
const CardWithProductDetails = (props: IProps) => {
    const { data, isLoading, isView, setProductData, productData } = props;


    if (isLoading) {
        return <>Loading</>
    }
    // if (error) {
    //     return <>Something Went Wrong...</>
    // }

    const navigate = useNavigate();

    function handleEditButton() {
        {editSuscelProductPage ? navigate(`/edit-suscel-products/${data.data._id}`) : navigate(`/edit-affiliated-products/${data.data._id}`)};
    }
    // function handleCancelButton() {
    //     navigate("/affiliated-products");
    // }

    const location = useLocation();
    const addProductsPage = location?.pathname?.includes("edit-affiliated-products/new");
    const viewSuscelProductsPage = location?.pathname?.includes("view-suscel-products");
    const editSuscelProductPage = location?.pathname?.includes(`edit-suscel-products/${data.data._id}`);

    return (
        <>

            <div>
                <div className="grid grid-cols-4 gap-4">
                    <Form
                        className='col-span-3 '
                        name="wrap"
                        labelCol={{ flex: '145px' }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{ flex: 1 }}
                        colon={false}
                        style={{ maxWidth: 800 }}
                    >
                        {!viewSuscelProductsPage && !editSuscelProductPage && <Form.Item
                            label={<h3 className='font-semibold text-xl text-black'>Product Url</h3>}
                            name="Product Url"
                            initialValue={data?.data?.productUrl}
                        >
                            <Input className={`border-0 rounded-none !shadow-none hover:border-black ${!isView && "border-b-2"}`} readOnly={!addProductsPage} required={addProductsPage} placeholder='Enter Product Url'
                                onChange={(event) => setProductData({ ...productData, productUrl: event.target.value })}
                            />
                        </Form.Item>}

                        {!addProductsPage && <Form.Item
                            label={<h3 className='font-semibold text-xl text-black'>Name</h3>}
                            name="Name"
                            initialValue={data?.data?.name}
                        >
                            <Input className={`border-0 rounded-none !shadow-none hover:border-black ${!isView && "border-b-2"}`} readOnly={isView}
                                onChange={(event) => setProductData({ ...productData, name: event.target.value })}
                            />
                        </Form.Item>}

                        {!addProductsPage && <Form.Item
                            label={<h3 className='font-semibold text-xl text-black'>Brand</h3>}
                            name="Brand"
                            initialValue={data?.data?.brand}
                        >
                            <Input className={`border-0 rounded-none !shadow-none hover:border-black ${!isView && "border-b-2"}`} readOnly={isView}
                                onChange={(event) => setProductData({ ...productData, brand: event.target.value })}
                            />
                        </Form.Item>}

                        {!addProductsPage && <Form.Item
                            label={<h3 className='font-semibold text-xl text-black'>Description</h3>}
                            name="Description"
                            initialValue={data?.data?.description}
                        >
                            <Input className={`border-0 rounded-none !shadow-none hover:border-black ${!isView && "border-b-2"}`} readOnly={isView}
                                onChange={(event) => setProductData({ ...productData, description: event.target.value })}
                            />
                        </Form.Item>}

                        {!addProductsPage && <Form.Item
                            label={<h3 className='font-semibold text-xl text-bhandleCancelButtonlack'>Price(AU$)</h3>}
                            name="Price"
                            initialValue={data?.data?.price}
                        >
                            <Input className={`border-0 rounded-none !shadow-none hover:border-black ${!isView && "border-b-2"}`} readOnly={isView}
                                onChange={(event) => setProductData({ ...productData, price: event.target.value })}
                            />
                        </Form.Item>}

                        {(viewSuscelProductsPage || editSuscelProductPage) && <Form.Item
                            label={<h3 className='font-semibold text-xl text-black'>Weight(in kg)</h3>}
                            name="Weight"
                            initialValue={data?.data?.weight}
                        >
                            <Input className={`border-0 rounded-none !shadow-none hover:border-black ${!isView && "border-b-2"}`} readOnly={isView}
                                onChange={(event) => setProductData({ ...productData, weight: event.target.value })}
                            />
                        </Form.Item>}

                        {!addProductsPage && <Form.Item
                            label={<h3 className='font-semibold text-xl text-black'>Image</h3>}
                            name="Image"
                        >
                            {!isView && <Upload name="logo" action="/upload.do" listType="picture">
                                <Button className='border border-black rounded-none'>Choose files</Button>
                            </Upload>}
                            <div className='grid grid-cols-3 gap-2 mt-3'>
                                {data?.data?.images?.map((image: any) => <img src={image.url} className='h-30 w-40 border p-1 mt-2' />)}
                            </div>
                        </Form.Item>}
                    </Form>

                    {/* Edit Button */}
                    {isView && <Button className="bg-blue-800 text-white h-9 w-21 ml-32" onClick={handleEditButton}><FontAwesomeIcon icon={faPen} className="mr-2" />EDIT</Button>}

                    {/* Add Button */}
                    {addProductsPage && <Button className='bg-blue-800 text-white w-11 h-11 rounded-full ml-18 mb-3'><FontAwesomeIcon icon={faPlus} /></Button>}
                </div>

                {/* EditProducts Bottom Buttons Start */}
                {!isView && !addProductsPage && <div className='flex justify-end gap-10'>
                    <Button className="h-8 text-blue-800 border-0" onClick={props.handleCancelButton}>CANCEL</Button>
                    <Button className='h-11 bg-blue-800 text-white font-medium' onClick={props.handleOkButton}>SAVE CHANGES</Button>
                </div>}
                {/* EditProducts Bottom Buttons End */}
            </div>

        </>
    )
}

export default CardWithProductDetails;
