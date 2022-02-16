import Loadable from 'react-loadable';

function Loading({ error }) {
    if (error) {
        console.error(error);
        return <div>页面加载错误</div>;
    }
    return <div>loading</div>;
}

const ReactLoadable = (compPromise) => {
    return Loadable({
        loader: () => {
            // await util.sleep(1000000);
            return compPromise;
        },
        loading: Loading
    });
};

export default ReactLoadable;