import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';
import { Button} from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import CardWithProductDetails from "../../customComponents/CardWithProductDetails";
import { useGetProductByIdQuery } from "../../queries/product";


const ViewAffiliateProductDetails = () => {

  const { id } = useParams();

 const location = useLocation();

  const isView = location?.pathname?.includes("view-affiliated-products");

  const navigate = useNavigate();

  //Handle Functions Here
  function handleBackButton(){
    navigate("/affiliated-products");
  }

  //Call Apis from product
  const { data: viewProductsData, isLoading, error } = useGetProductByIdQuery(id);


  return (
    <>
      
      {/* Header Section start */}
      <div className="mb-4">
        <Button className='bg-blue-800 text-white w-11 h-11 rounded-full mb-5' onClick={handleBackButton}><FontAwesomeIcon icon={faArrowLeftLong} /></Button>
        <h2 className='text-black text text-3xl font-semibold'>{isView ? 'Product Details' : 'Edit Product'}</h2>
      </div>
      {/* Header Section End */}


      {/* AffiliatedProducts Form Start */}
      <div className='border border-stroke rounded-lg p-6'>
        <CardWithProductDetails
          data={viewProductsData}
          isLoading={isLoading}
          error={error}
          isView={isView}
        />
      </div>
      {/* AffiliatedProducts Form End */}
    </>
  );
}

export default ViewAffiliateProductDetails;
