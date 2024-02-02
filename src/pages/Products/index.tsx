import { Card } from 'antd';
import photo from '../../images/product/affiliate.jpg';
import photo2 from '../../images/product/suscel.png';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const Products = () => {

  const navigate = useNavigate();

  function openAffiliatedProducts(){
    navigate('/affiliated-products');
  }



  return (
    <>
      <div>
        <div className='mb-8'>
          <h2 className='text-black text-3xl font-semibold '>Products</h2>
        </div>
        <div className='flex gap-10'>
          {/* Affiliated Card Start */}
          <Card
            className='shadow shadow-black cursor-pointer'
            style={{ width: 340 }}
            onClick={openAffiliatedProducts}
            cover={
              <img className='h-55'
                alt="image"
                src={photo}
              />
            }
          >
            <Meta className='text-center'
              title="Affiliated Products"
            />
          </Card>
          {/* Affiliated Card End */}

          {/* SuscelProducts Card Start */}
          <Card
            className='shadow shadow-black cursor-pointer'
            style={{ width: 340 }}
            cover={
              <img className='h-55'
                alt="image"
                src={photo2}
              />
            }
          >
            <Meta className='text-center'
              title="Suscel Products"
            />
          </Card>
          {/* SuscelProducts Card End */}
        </div>
      </div>
    </>
  );
}

export default Products;
