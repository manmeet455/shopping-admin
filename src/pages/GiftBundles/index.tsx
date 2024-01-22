import CardWithButtons from "../../customComponents/cardWithButtons";
import { useGetGiftBundlesQuery } from "../../queries/giftBundles";

const GiftBundles = () => {

    const { data: giftBundlesData, isLoading, error } = useGetGiftBundlesQuery(null);

    return (
        <>
            {giftBundlesData?.data?.bundles && giftBundlesData?.data?.bundles?.map((data: any) => {
                return <CardWithButtons data={data} isLoading={isLoading} error={error} />
            })}
        </>
    );
};

export default GiftBundles;