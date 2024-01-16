import { useNavigate } from 'react-router-dom';
import CardOne from '../../components/CardOne.tsx';
import { useGetDashboardDataQuery } from '../../queries/dashboard.ts';


export const TopCards = () => {

    const navigate = useNavigate();

    const handler = (el: string) => {
        navigate('/')
    }

    const getIcon = (el: string) => {
        navigate('/')
    }



    const { data, isLoading } = useGetDashboardDataQuery(null);
    console.log( 'lllllllllllllllllll', data?.data);

    if (isLoading) {
        return <>loading</>
    }
    console.log('ddd', data)
    return (
        <>{data?.data && Object.keys(data.data)?.map((el, i) => {
            return <CardOne
                key={i}
                title={el}
                icon={() => getIcon(el)}
                iconUser={() => getIcon(el)}
                count={data[i]}
                handler={() => handler(el)}
            />
        })}
        </>
    )
}