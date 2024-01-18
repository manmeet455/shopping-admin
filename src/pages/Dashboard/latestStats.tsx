import { Lists } from '../../customComponents/lists.tsx';
import { useGetGiftBundlesQuery } from '../../queries/giftBundles.ts';
import { useGetOrdersQuery } from '../../queries/order.ts';
import { useGetUsersQuery } from '../../queries/user.ts';
import { useGetGiftIdeasQuery } from '../../queries/giftIdea.ts';

export const LatestStats = () => {

    const { data: giftBundlesData, isLoading: loadingBundle, error: errorBundle } = useGetGiftBundlesQuery(null);
    const { data: ordersData, isLoading: loadingOrder, error: errorOrder } = useGetOrdersQuery(null);
    const { data: usersData, isLoading: loadingUser, error: errorUser } = useGetUsersQuery(null);
    const {data: giftIdeasData, isLoading: lodingIdeas, error: errorIdeas} =  useGetGiftIdeasQuery(null);
    console.log(ordersData);

    // OrdersMap
    const orders = ordersData?.data?.orders?.map((el: any) => {
        return {
            _id: el?._id,
            name: el?.bundlesDetails?.[0]?.name,
            price: el?.total,
            image: el?.bundlesDetails?.[0]?.image,
        }
    })

    // usersMap
    const users = usersData?.data?.users?.map((el: any) => {
        // console.log(el?.profileImage);

        return {
            // _id: el?._id,
            email: el?.email,
            name: el?.name,
            image: el?.profileImage,
        }
    })

    // GiftIdeas
    const giftIdeas = giftIdeasData?.data?.categories?.map((el: any) => {
        return{
            _id: el?._id,
            name: el?.name,
            image: el?.image,
        }
    })

    return (
        // <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 xl:grid-cols-2 2xl:gap-7.5 py-8'>
        <div>
            {/* Gift Bundles */}


            {/* <div className='flex'> */}
                <Lists
                    title='Gift Bundles'
                    handler={() => { }}
                    data={giftBundlesData?.data?.bundles}
                    isLoading={loadingBundle}
                    error={errorBundle}
                />
            {/* </div> */}


            {/* <div className='flex'> */}
                <Lists
                    title='Orders'
                    handler={() => { }}
                    data={orders}
                    isLoading={loadingOrder}
                    error={errorOrder}
                />
            {/* </div> */}


            {/* <div className='flex'> */}

                <Lists
                    title='Users'
                    handler={() => { }}
                    data={users}
                    isLoading={loadingUser}
                    error={errorUser}
                />
            {/* </div> */}


            <Lists 
            title='Gift Ideas'
            handler={() => { }}
            data={giftIdeas}
            isLoading={lodingIdeas}
            error={errorIdeas}
        />
        </div>
    )
}