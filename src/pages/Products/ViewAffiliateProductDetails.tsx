import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Button } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import CardWithProductDetails from "../../customComponents/CardWithProductDetails";
import { useGetProductByIdQuery, useUpdateProductByIdMutation } from "../../queries/product";
// import { useState } from 'react';


const ViewAffiliateProductDetails = () => {

  const { id } = useParams();

  //  Duplication of ProductDetails Page to Edit
  const location = useLocation();

  const isView = location?.pathname?.includes("view-affiliated-products") || location?.pathname?.includes("view-suscel-products");


  const navigate = useNavigate();

  //Handle Functions Here
  function handleBackButton() {
    navigate("/affiliated-products");
  }

  //Call Apis from product
  const { data: viewProductsData, isLoading, error } = useGetProductByIdQuery(id);
  // const [updateProduct] = useUpdateProductByIdMutation();


  //useState for UpdateProduct Api

  //   const [productData, setProductData] = useState({
  //     affiliate: true,
  //     brand: "",
  //     description: "",
  //     images: [],
  //     name: "",
  //     price: "",
  //     productUrl: "",
  //     weight: "",
  // });

  // const handleSubmit = () => {
  //   updateProduct(productData);
  // }

  // const updateProductsData = {...productData, id}
  // console.log(updateProductsData, "check");
  // updateProduct(updateProductsData).then((res: any) => console.log(res));

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
        // setProductData={setProductData}
        // handleSubmit = {handleSubmit}
        />
      </div>
      {/* AffiliatedProducts Form End */}
    </>
  );
}

export default ViewAffiliateProductDetails;
