// import { faUser } from "@fortawesome/free-solid-svg-icons";


interface IProps {
    title: string,
    handler: () => void,
    data: any,
    isLoading: boolean,
    error: any,
}


export const Lists = (props: IProps) => {
    const { title, handler, data, isLoading } = props;

    const handlePrice = (price: number, title: string) => {
        if (title === "Orders") {
            return `$${price}`;
        }
    };

    const handleId = (id: string, title: string) => {
        if (title === "Orders") {
            return `$${id}`;
        }
    };


    if (isLoading) return <>Loading....</>
    return (
        <>
            {/* {title}
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 bg-white">
                {data?.length ?
                    data?.map((el: any, i: number) => {
                        return (
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={el?.image?.trim()} alt="image" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {el?._id ?? ''}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {el?.name ?? ''}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        ${el?.price ?? ''}
                                    </div>
                                </div>
                            </li>
                        )
                    })
                    :
                    <>No records found</>
                }
            </ul> */}


            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-7">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold leading-none text-black dark:text-white">{title}</h2>
                    <button type="button" className="text-white bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={handler} >View all</button>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 grid grid-row-2 gap-4">

                        {data?.length ?
                            data?.map((el: any) => {
                                return (
                                    <li className="py-3 sm:py-4" key={el?.name}>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img className="w-8 h-8 rounded-full" src={el?.image?.trim()} alt="image" />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {el?.name ?? ''}
                                                    {/* {handleName(el?.name, title)} */}
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {/* {el?._id ?? ''} */}
                                                    {handleId(el?._id, title)}
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {el?.description ?? ''}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {el?.email ?? ''}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                {/* ${el?.price ?? ''} */}
                                                {handlePrice(el?.price, title)}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                            :
                            <>No records found</>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
