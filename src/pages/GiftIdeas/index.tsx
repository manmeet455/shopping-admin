import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from "antd";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardWithButtons from "../../customComponents/cardWithButtons";
import { useDeleteGiftIdeasMutation, useGetGiftIdeasQuery } from "../../queries/giftIdea";
import { CustomModal } from '../../customComponents/modal';


const GiftIdeas = () => {

  //Call API's of GiftIdea
  const { data: giftIdeasData, isLoading, error, refetch: refetchGiftIdeas } = useGetGiftIdeasQuery(null);
  useEffect(() => {
    refetchGiftIdeas();
  }, []);
  const [deleteIdeas] = useDeleteGiftIdeasMutation();


  //useState for Modal Start
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currData, setCurrData] = useState<any>();
  //useState for Modal End


  // Functions for Handle Category Icons Start
  const navigate = useNavigate();

  function viewHandler(id: any) {
    navigate(`/details/${id}`);
  }
  function editHandler(id: any) {
    navigate(`/editDetails/${id}`);
  }
  function showModalHandler(data: any) {
    setCurrData(data)
    setIsModalOpen(true);
  }
  // Functions for Handle Category Icons End


  // Function for Handle Category Header Button
  function addGiftIdeas() {
    navigate(`/editDetails/new`)
  }


  //Function for Handle Modal Buttons Start
  const handleOk = (id: any) => {
    deleteIdeas(id).then(() => refetchGiftIdeas());
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //Functions for Handle Modal Buttons End


  return (
    <>

      {/* GiftIdeas Header Start */}
      <div className='flex items-center justify-between mb-5'>
        <div>
          <h2 className='text-black text-3xl font-semibold'>Gift Ideas</h2>
          <p className='mt-0'>Total gift ideas: {giftIdeasData?.data?.categories.length} </p>
        </div>
        <Button className='bg-blue-800 text-white h-10' onClick={addGiftIdeas}><FontAwesomeIcon icon={faPlus} className='mr-1' />ADD GIFT IDEA</Button>
      </div>
      {/* GiftIdeas Header End */}


      {/* GiftIdeas Categories Start */}
      <div className="grid grid-cols-2 gap-4 ">
        {giftIdeasData?.data?.categories && giftIdeasData?.data?.categories?.map((data: any) => {
          return <CardWithButtons
            data={data}
            isLoading={isLoading}
            error={error}
            actions={[
              <FontAwesomeIcon icon={faEye} onClick={() => viewHandler(data._id)} />,
              <FontAwesomeIcon icon={faPen} onClick={() => editHandler(data._id)} />,
              <FontAwesomeIcon color="red" icon={faTrash} onClick={() => { showModalHandler(data); }} />,
            ]} />
        })}
        {/* GiftIdeas Categories End */}


        {/* <Modal
          title={"Confirm Delete"}
          open={isModalOpen}
          onOk={() => handleOk(currData?._id)}
          onCancel={handleCancel}
          cancelText='no'
          okText='yes'
          cancelButtonProps={{className: '!bg-red'}}
        >
          <p>Are you sure you want to delete <strong>{(currData?.name)}</strong> bundle?</p>
        </Modal> */}


        {/* CustomModal For Delete Categories Start */}
        <CustomModal title={'Confirm Delete'} open={isModalOpen} onOk={() => handleOk(currData?._id)} onCancel={handleCancel} cancelText={'no'} okText={'yes'}
          okButtonProps={{ className: 'bg-red-700' }}
          message={<p>Are you sure you want to delete <strong>{(currData?.name)}</strong> bundle?</p>} />
        {/* CustomModal For Delete Categories End */}

      </div>
    </>
  );
};

export default GiftIdeas;
