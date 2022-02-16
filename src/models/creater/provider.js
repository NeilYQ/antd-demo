
import { ConfigContext } from './content.js';
import Dispatcher from './dispatcher.js';
import Executor from './exxcutor.js';
import models from '@/config/models';

const dispatcher = new Dispatcher();

const StoreProvider = ({ children } = {}) => {
    return (
        <ConfigContext.Provider value={dispatcher}>
        { Object.entries(models).map(([ key, hook ]) => (
            <Executor 
                key={ key }
                namespace={ key }
                hook={ hook }
                onUpdate={ val => {
                    dispatcher.data[key] = val;
                    dispatcher.update(key);
                }}
            />
        )) }
        { children }
        </ConfigContext.Provider>
    );
};

export default StoreProvider;