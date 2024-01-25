import { useNavigate } from "react-router-dom";
import CardWithButtons from "../../customComponents/cardWithButtons";
import { useGetGiftIdeasQuery } from "../../queries/giftIdea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faPen, faTrash} from '@fortawesome/free-solid-svg-icons';

const GiftIdeas = () => {

    const navigate = useNavigate();
    function viewHandler(id:any) {
        navigate(`/details/${id}`);
    }

    function editHandler(id: any) {
        navigate(`/editDetails/${id}`);
    }

    function deleteHandler(){
        navigate("/gift-ideas")
    }

    const { data: giftIdeasData, isLoading, error } = useGetGiftIdeasQuery(null);
    console.log(giftIdeasData,"check ")
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
                    <FontAwesomeIcon color="red" icon={faTrash} onClick={deleteHandler} />,

                  ]} />
            })}
        </div>
    );
};

export default GiftIdeas;
