import { Table } from "antd";
import type { TableProps } from "antd";
import { Select, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';


import { useGetUsersMutation } from "../../queries/user";
import { useEffect, useState } from "react";

import debounce from 'lodash.debounce'


interface DataType {
    sno: number;
    image: any;
    name: string;
    email: string;
    dob: string;
    registeredDate: string;
    platform: string;
    actions: any;

}

const Users = () => {

    //Call User's API
    const [getUser, { data, isLoading, error }] = useGetUsersMutation();

    const [key, setKey] = useState("Name");
    const [filterData, setFilterData] = useState({});


    useEffect(() => {
        console.log("filterr", filterData);
        getUser(filterData);
    }, [filterData]);



    //Function for Selector
    const handleChange = (value: string) => {
        setKey(value)
        console.log(`selected ${value}`);
    };

    const searchHandler = (e: any) => {
        let payload = {};
        payload = {
            ...payload,
            [key]: e.target.value,
        };
        const debouncedSearchHandler = debounce(() => {
            setFilterData(payload);
            console.log(setFilterData, "filterdata");
        }, 1000);
        debouncedSearchHandler()
    };



// TableContent Start
const columns: TableProps<DataType>["columns"] = [
    {
        title: "S.No.",
        dataIndex: "sno",
        key: "sno",
    },
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
        // ellipsis: true,
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Email",
        key: "email",
        dataIndex: "email",
    },
    {
        title: "DOB",
        key: "dob",
        dataIndex: "dob",
    },
    {
        title: "Registered Date",
        key: "registeredDate",
        dataIndex: "registeredDate",
    },
    {
        title: "Platform",
        key: "platform",
        dataIndex: "platform",
    },
    {
        title: "Actions",
        key: "actions",
        dataIndex: "actions",
    },
];
// Table Content End

// TableData Fetching Start
const tableData: DataType[] = data?.data?.users?.map((el: any, i: any) => ({
    sno: i + 1,
    image: <img src={el?.profileImage} className="w-8" />,
    name: el?.name,
    email: el?.email,

    dob: new Date(el?.dob).getDate() +
        "/" +
        (new Date(el?.dob).getMonth() + 1) +
        "/" +
        new Date(el?.dob).getFullYear(),
    registeredDate: new Date(el?.createdAt).getDate() +
        "/" +
        (new Date(el?.createdAt).getMonth() + 1) +
        "/" +
        new Date(el?.createdAt).getFullYear(),
    platform: el?.platform,
    actions: <div className="flex gap-3 cursor-pointer"><FontAwesomeIcon icon={faEye} size="xs" />
        <FontAwesomeIcon icon={faPen} size="xs" />
        <FontAwesomeIcon icon={faTrash} size="xs" color="red" />
    </div>


}));
// TableData Fetching End




return (
    <>

        {/* Header Section Start */}
        <div>
            <h2 className="text-black text-3xl font-semibold">All Users</h2>
        </div>
        <p className="mt-3">Total users: {data?.data?.users?.length}</p>

        <div className="flex justify-around gap-2 h-15 mt-6">
            <div className="h-full">
                <Select
                    defaultValue={key}
                    style={{ width: 130, height: 59 }}
                    onChange={handleChange}
                    options={[
                        { value: 'name', label: 'Name' },
                        { value: 'email', label: 'Email' },
                    ]}
                />
            </div>
            <div className="w-full h-full">
                <Input
                    placeholder="Search"
                    className="w-full, h-full"
                    onChange={searchHandler}
                />
            </div>
        </div>



        {/* Table Start */}
        <div className="border border-stroke rounded-lg cursor-pointer mt-4">
            <Table scroll={{ x: 1300 }} pagination={false} columns={columns} dataSource={tableData} />
        </div>
        {/* Table End */}
    </>
)
}

export default Users;