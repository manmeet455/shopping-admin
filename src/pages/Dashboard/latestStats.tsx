import { Lists } from '../../customComponents/lists.tsx';
import { useGetGiftBundlesQuery } from '../../queries/giftBundles.ts';
import { useGetGiftIdeasQuery } from '../../queries/giftIdea.ts';
import { useGetOrdersQuery } from '../../queries/order.ts';

export const LatestStats = () => {
    // const { data: users, isLoading, error } = useGetGiftBundlesQuery(null);
    // const { data: bundles, isLoading, error } = useGetGiftBundlesQuery(null);
    // const { data, isLoading, error } = useGetGiftBundlesQuery(null);
    const { data: giftIdeasData, isLoading, error } = useGetGiftBundlesQuery(null);
    // const { data, isLoading, error } = useGetOrdersQuery(null);
    // const { data, isLoading, error } = useGetGiftIdeasQuery(null);
    console.log(giftIdeasData)
    return (
        <>
            <Lists
                title='Gift Ideas'
                handler={() => { }}
                data={giftIdeasData}
                isLoading={isLoading}
                error={error}
            />
            {/* <Lists />
            <Lists />
            <Lists /> */}
        </>
    )
}