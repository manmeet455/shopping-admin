import CardWithButtons from "../../customComponents/cardWithButtons";
import { useGetGiftBundlesQuery } from "../../queries/giftBundles";

const GiftBundles = () => {

    const { data: giftBundlesData, isLoading, error } = useGetGiftBundlesQuery(null);
const handler=()=>{}
    return (
        <div className="grid grid-cols-2 gap-4">
            {giftBundlesData?.data?.bundles && giftBundlesData?.data?.bundles?.map((data: any) => {
                return <CardWithButtons data={data} isLoading={isLoading} error={error} handler={handler}/>
            })}
        </div>
    );
};

export default GiftBundles;