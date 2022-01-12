import ProTable from "@ant-design/pro-table";

import useModel from "@/models/creater/useModel.js";

const columns = [
    { title: "名称", dataIndex: "name" },
    { title: "键值", dataIndex: "keys" },
];

const data = [
    { name: "a", keys: "aa" },
    { name: "b", keys: "bb" },
];

const Tables = (props) => {
    console.log(props)
    const config = useModel("users");
    console.log("useModel", config)
    return (
        <ProTable
            headerTitle={ "表格" }
            columns={ columns }
            request={() => {
                return Promise.resolve(data)
            }}
        />
    );
};

export default Tables;