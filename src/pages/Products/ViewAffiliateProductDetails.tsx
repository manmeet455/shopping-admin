import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Button } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import CardWithProductDetails from "../../customComponents/CardWithProductDetails";
import { useGetProductByIdQuery, useUpdateProductByIdMutation } from "../../queries/product";
import { useEffect, useState } from 'react';
import { useAddMultipleImagesMutation } from '../../queries/upload';


const ViewAffiliateProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  //  Duplication of ProductDetails Page to Edit
  const location = useLocation();
  const viewSuscelProductsPage = location?.pathname?.includes("suscel-products");
  const editAffiliatedProducts = location?.pathname?.includes(`edit-affiliated-products/${id}`)

  const isView = location?.pathname?.includes("view-affiliated-products") || location?.pathname?.includes("view-suscel-products");

  //Handle BackButton
  function handleBackButton() {
    { viewSuscelProductsPage ? navigate("/suscel-products") : navigate("/affiliated-products") };
  }

  //Handle CancelButton
  function handleCancelButton(){
    {editAffiliatedProducts ? navigate("/affiliated-products") : navigate("/suscel-products")};
  }

  //Call Apis from product Start
  const { data: viewProductsData, isLoading, error, refetch } = useGetProductByIdQuery(id);
  useEffect(() => {
    refetch();
  }, []);
  const [updateProduct] = useUpdateProductByIdMutation();

  // useEffect(() => {

  // }, [viewProductsData])


  //useState for UpdateChangesInProduct Api
  const [productData, setProductData] = useState({
    affiliate: true,
    brand: viewProductsData?.data?.brand,
    description: viewProductsData?.data?.description,
    images: viewProductsData?.data?.images,
    name: viewProductsData?.data?.name,
    price: viewProductsData?.data?.price,
    productUrl: viewProductsData?.data?.productUrl,
    weight: viewProductsData?.data?.weight,
  });


  //Response of UpdateChangesInProduct Api  
  const updateChanges = () => {
    const updateProductsData = { ...productData, id }
    updateProduct(updateProductsData).then((res: any) => {
      {editAffiliatedProducts ? navigate('/affiliated-products') : navigate('/suscel-products')}
    });
  }

  //Upload MultipleImage Section Start
  const [addMultipleImage] = useAddMultipleImagesMutation();

  function handleMultipleImage(e: any){
    // console.log(e, "hiiii");

    const fileType = e?.file?.type.split('/')[1];

    const dataToSend = {filesType: [fileType]}
    // console.log(dataToSend, "hiii");
    addMultipleImage(dataToSend).then((res: any) => {
      // console.log(res, "resss");
      const {fileUrl} = res?.data?.[0];
      setProductData({...productData, images: fileUrl})
    }) 
  }
  //Upload MultipleImage Section End



  return (
    <>

      {/* Header Section start */}
      <div className="mb-4">
        <Button className='bg-blue-800 text-white w-11 h-11 rounded-full mb-5' onClick={handleBackButton}><FontAwesomeIcon icon={faArrowLeftLong} /></Button>
        {id !== "new" && <h2 className='text-black text text-3xl font-semibold'>{isView ? 'Product Details' : 'Edit Product'}</h2>}
        {id === "new" && <h2 className='text-black text text-3xl font-semibold'>Add Products</h2>}
      </div>
      {/* Header Section End */}


      {/* AffiliatedProducts Form Start */}
      <div className='border border-stroke rounded-lg p-6'>
        <CardWithProductDetails
          data={viewProductsData}
          isLoading={isLoading}
          error={error}
          isView={isView}
          setProductData={setProductData}
          productData={productData}
          handleCancelButton={handleCancelButton}
          handleOkButton={updateChanges}
          handleMultipleImage={handleMultipleImage}
        />
      </div>
      {/* AffiliatedProducts Form End */}
    </>
  );
}

export default ViewAffiliateProductDetails;
