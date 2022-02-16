import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';

import StoreProvider from '@/models/creater/provider';
import routes from '@/config/routes'

import './App.css';

let location = window.location

const Redirect = ({ to }) => {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
};

const redirectRoute = route => (
    <Route
        key={ route.name }
        path={ route.path }
        element={ <Redirect to={ route.redirects } /> }
    />
);

const simpleRoute = route => (
    route.redirects
    ? redirectRoute(route)
    : (
        <Route
            key={ route.name }
            path={ route.path }
            index={ route.index }
            element={ <route.component { ...route } location={ location } /> }
        />
    )
);

const mainRoute = route => (
    <Route 
        key={ route.name } 
        path={ route.path } 
        index={ route.index }
        element={ <route.component { ...route } location={ location } /> }
    >
        { route.children.map(it => simpleRoute(it)) }
    </Route>
);

const App = () => (
    <StoreProvider>
        <Router>
            <Routes>
            { routes.map((route, i) => ( 
                route.children && route.component
                    ? mainRoute(route)
                    : simpleRoute(route)
            )) }
            </Routes>
        </Router>
    </StoreProvider>
);

export default App;
