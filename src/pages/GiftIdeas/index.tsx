import { useGetGiftIdeasQuery } from "../../queries/giftIdea";
import GiftIdeasCard from "../../customComponents/giftIdeasCard";

export const GiftIdeas = () => {

    const { data: giftIdeasData, isLoading: lodingIdeas, error: errorIdeas } = useGetGiftIdeasQuery(null);

    console.log(giftIdeasData,"helllo ji");
    

    const giftIdeas = giftIdeasData?.data?.categories?.map((el: any) => {
        return {
            _id: el?._id,
            name: el?.name,
            image: el?.image,
        }
    })
    return (
        <>
            <GiftIdeasCard
                title='Gift Ideas'
                // handler={""}
                data={giftIdeas}
                isLoading={lodingIdeas}
                error={errorIdeas}
            />
        </>
    );

}
