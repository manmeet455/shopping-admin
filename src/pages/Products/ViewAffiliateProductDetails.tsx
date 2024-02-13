import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Button } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import CardWithProductDetails from "../../customComponents/CardWithProductDetails";
import { useGetProductByIdQuery, useUpdateProductByIdMutation } from "../../queries/product";
import { useEffect, useState } from 'react';


const ViewAffiliateProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  //  Duplication of ProductDetails Page to Edit
  const location = useLocation();
  const viewSuscelProductsPage = location?.pathname?.includes("suscel-products");

  const isView = location?.pathname?.includes("view-affiliated-products") || location?.pathname?.includes("view-suscel-products");

  //Handle BackButton
  function handleBackButton() {
    { viewSuscelProductsPage ? navigate("/suscel-products") : navigate("/affiliated-products") };
  }

  //Call Apis from product Start
  const { data: viewProductsData, isLoading, error, refetch } = useGetProductByIdQuery(id);
  useEffect(() => {
    refetch();
  }, []);

  const [updateProduct] = useUpdateProductByIdMutation();
  //Call Apis from product End


  //useState for UpdateProduct Api
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

  //Response of UpdateProduct Api  
  const updateChanges = () => {
    const updateProductsData = { ...productData, id }
    updateProduct(updateProductsData).then((res: any) => {
      navigate('/affiliated-products')
    });
  }

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
          handleCancelButton={() => { navigate("/affiliated-products"); }}
          handleOkButton={updateChanges}
        />
      </div>
      {/* AffiliatedProducts Form End */}
    </>
  );
}

export default ViewAffiliateProductDetails;
