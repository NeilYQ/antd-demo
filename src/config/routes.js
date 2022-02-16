import Loadable from '@/components/Loadable';

const Workpatch = Loadable(import('@/pages/workpatch'));
const Logins = Loadable(import('@/pages/Users/login'));
const Tables = Loadable(import('@/pages/Tables'));

const routes = [
    {
        path: "/",
        name: "main",
        // component: Workpatch,
        redirects: "/workpatch/tables"
    }, 
    {
        path: '/user/login',
        name: 'login',
        component: Logins,
    },  
    {
        path: '/tables',
        name: 'main-tables',
        component: Tables,
    }, 
    {
        path: '/workpatch',
        name: 'workpatch',
        component: Workpatch,
        children: [
            {
                path: '/workpatch/tables',
                name: 'tables',
                component: Tables
            },
            {
                path: '/workpatch/login',
                name: 'w-login',
                component: Logins,
            }
        ]
    }, 
    {
        path: '*',
        name: 404,
        component: () => <h1>404</h1>
    }
];

export default routes;