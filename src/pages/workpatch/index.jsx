import { useEffect, useState } from 'react';
import ProLayout, { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import useModel from "@/models/creater/useModel";
import routes from '@/config/routes';

import request from '@/services/request';

const Workpatch = (props) => {
    console.log(props)
    
    const [ pathname, setPathname ] = useState(window.location.pathname);
    const { state, dispatch } = useModel("users");

    const requestDict = async () => {
        let res = await request(`/api/system/sys_dict`, { getResponse: true });
        console.log("res", res)
    };

    useEffect(() => {
        requestDict()
    }, []);

    const handleAdd = () => {
        dispatch?.({ type: "add", payload: 1 });
    };

    const handleReduce = () => {
        dispatch?.({ type: "reduce", payload: 1 });
    };

    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <ProLayout
                location={{ pathname }}
                ErrorBoundary={false}
                headerContentRender={() => <ProBreadcrumb />}
                breadcrumbRender={(routers = []) => [
                    {
                        path: '/',
                        breadcrumbName: '主页',
                    },
                    ...routers,
                ]}
                menuDataRender={ () => routes }
                menuItemRender={(it, dom) => (
                    <Link to={ it.path } onClick={() => setPathname(it.path)}>{ dom }</Link>
                )}
            >
                <PageContainer content="欢迎使用" breadcrumbRender={false}>
                    <div>{ state?.count || 0 }</div>
                    <Button onClick={handleAdd}>加 1</Button>
                    
                    <Button onClick={handleReduce}>加 -1</Button>

                    {/* { props.children } */}
                    <Outlet />
                </PageContainer>
            </ProLayout>
        </div>
    );
};

export default Workpatch;