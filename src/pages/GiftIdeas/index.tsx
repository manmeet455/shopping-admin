import { Modal } from "antd";

import { useNavigate } from "react-router-dom";
import CardWithButtons from "../../customComponents/cardWithButtons";
import { useDeleteGiftIdeasMutation, useGetGiftIdeasQuery } from "../../queries/giftIdea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

const GiftIdeas = () => {

    const [deleteIdeas] = useDeleteGiftIdeasMutation();

    //useState for Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currData,setCurrData] = useState<any>();
    
    const navigate = useNavigate();

    function viewHandler(id:any) {
        navigate(`/details/${id}`);
    }

    function editHandler(id: any) {
        navigate(`/editDetails/${id}`);
    }

    function deleteHandler(data: any){
        deleteIdeas(data);
        setCurrData(data)
        setIsModalOpen(true);
    }
    const handleOk = (id: any) => {
         deleteIdeas(id);
        setIsModalOpen(false);
      };
     
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    const { data: giftIdeasData, isLoading, error, refetch: refetchGiftIdeas } = useGetGiftIdeasQuery(null);

    useEffect(() => {
        refetchGiftIdeas();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4">
            {giftIdeasData?.data?.categories && giftIdeasData?.data?.categories?.map((data: any) => {
                return    <CardWithButtons 
                data={data} 
                isLoading={isLoading}
                 error={error} 
                 actions={[
                    <FontAwesomeIcon icon={faEye} onClick={() => viewHandler(data._id)} />,
                    <FontAwesomeIcon icon={faPen} onClick={() => editHandler(data._id)} />,
                    <FontAwesomeIcon color="red" icon={faTrash} onClick={() => {deleteHandler(data);}} />,

                  ]} />
            })}
            <Modal
                title={"Confirm Delete"}
                open={isModalOpen}
                onOk={() => handleOk(currData?._id)}
                onCancel={handleCancel}
                cancelText='no'
                okText='yes'
              >
                <p>Are you sure you want to delete <strong>{(currData?.name)}</strong> bundle?</p>
              </Modal>
        </div>

        
    );
};

export default GiftIdeas;
