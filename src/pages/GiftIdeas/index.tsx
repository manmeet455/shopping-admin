import CardWithButtons from "../../customComponents/cardWithButtons";
import { useGetGiftIdeasQuery } from "../../queries/giftIdea";

const GiftIdeas = () => {

    const { data: giftIdeasData, isLoading, error } = useGetGiftIdeasQuery(null);
console.log(giftIdeasData,"ooooo")
    return (
        <>
            {giftIdeasData?.data?.categories && giftIdeasData?.data?.categories?.map((data: any) => {
                return <CardWithButtons data={data} isLoading={isLoading} error={error} />
            })}
        </>
    );
};

export default GiftIdeas;
