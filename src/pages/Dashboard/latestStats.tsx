import { Lists } from '../../customComponents/lists.tsx';
import { useGetGiftBundlesQuery } from '../../queries/giftBundles.ts';
import { useGetOrdersQuery } from '../../queries/order.ts';
import { useGetUsersQuery } from '../../queries/user.ts';
import { useGetGiftIdeasQuery } from '../../queries/giftIdea.ts';
import { useNavigate } from 'react-router-dom';

export const LatestStats = () => {

    const { data: giftBundlesData, isLoading: loadingBundle, error: errorBundle } = useGetGiftBundlesQuery(null);
    const { data: ordersData, isLoading: loadingOrder, error: errorOrder } = useGetOrdersQuery(null);
    const { data: usersData, isLoading: loadingUser, error: errorUser } = useGetUsersQuery(null);
    const {data: giftIdeasData, isLoading: lodingIdeas, error: errorIdeas} =  useGetGiftIdeasQuery(null);
    console.log(ordersData);


    // Handler Function

    const navigate = useNavigate();
    const handler = (key: string) => {
        let url = "/"
        if (key?.toLowerCase().includes('order'))
            url = "/orders?p=1"
        if (key?.toLowerCase().includes('user'))
            url = "/users?p=1"
        if (key?.toLowerCase().includes('bundles'))
            url = "/bundles?p=1"
        if (key?.toLowerCase().includes('gift-ideas'))
            url = "/gift-ideas?p=1"
        navigate(url);
    };
    

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

    // Bundles Map
    const bundles = giftBundlesData?.data?.bundles?.map((el: any) => {
        return{
            name: el?.name,
            image: el?.image,
            description: el?.description,
        }
    })

    return (
    
        <div>
            {/* Gift Bundles */}
                <Lists
                    title='Gift Bundles'
                    handler={() => handler('bundles')}
                    data={bundles}
                    isLoading={loadingBundle}
                    error={errorBundle}
                />

                {/* Orders */}
                <Lists
                    title='Orders'
                    handler={() => handler('orders')}
                    data={orders}
                    isLoading={loadingOrder}
                    error={errorOrder}
                />

                {/* Users */}
                <Lists
                    title='Users'
                    handler={() => handler('users')}
                    data={users}
                    isLoading={loadingUser}
                    error={errorUser}
                />

                {/* GiftIdeas */}
            <Lists 
            title='Gift Ideas'
            handler={() => handler('gift-ideas')}
            data={giftIdeas}
            isLoading={lodingIdeas}
            error={errorIdeas}
        />
        </div>
    )
}