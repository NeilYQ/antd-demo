import { useState } from 'react';
import ProLayout, { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import useModel from "@/models/creater/useModel.js";
import routes from '@/routes';

export default (props) => {
    console.log(props)
    
    const [ pathname, setPathname ] = useState(window.location.pathname);
    const { state, dispatch } = useModel("users");

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