
import { useContext, useEffect, useRef, useState } from 'react';
import isEqual from 'fast-deep-equal';
import { ConfigContext } from './content.js';
import models from '@/config/models';

const useModel = (namespace, updater = (model = models) => model) => {
    
    const dispatcher = useContext(ConfigContext);
    const updaterRef = useRef(updater);
    updaterRef.current = updater;

    const [store, setStore] = useState(
        () => updaterRef.current ? updaterRef.current(dispatcher.data?.[namespace]) : dispatcher.data?.[namespace]
    );

    const stateRef = useRef(false);
    stateRef.current = store

    const isMount = useRef(false);
    useEffect(() => {
        isMount.current = true;
        return () => {
            isMount.current = false;
        }
    }, []);

    useEffect(() => {
        const handler = e => {
            
            if(!isMount.current){
                setTimeout(() => {
                    // 如果 handler 执行过程中，组件被卸载了，则强制更新全局 data
                    if(!dispatcher.data?.[namespace]) return;
                    
                    dispatcher.data[namespace] = e;
                    dispatcher.update(namespace);
                });
            }else{
                if(updater && updaterRef.current){
                    
                    const currentState = updaterRef.current(e);
                    const prevState = stateRef.current
                    
                    if(isEqual(currentState, prevState)){
                        setStore(currentState)
                    }else{
                        setStore(e)
                    }
                }
            }
        };
        try{
            dispatcher.callbacks[namespace].add(handler);
            dispatcher.update(namespace);
        }catch(e){
            dispatcher.callbacks[namespace] = new Set();
            dispatcher.callbacks?.[namespace]?.add?.(handler);
            dispatcher.update(namespace);
        }
        return () => {
            dispatcher.callbacks?.[namespace]?.delete?.(handler)
        };
    }, [ namespace ]);
    
    return store || {};
};

export default useModel;