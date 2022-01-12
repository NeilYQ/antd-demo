import { useEffect, useMemo, useRef } from 'react';

export default ({
    namespace,
    hook = () => {},
    onUpdate = () => {},
} = {}) => {
    const updateRef = useRef(onUpdate);
    updateRef.current = onUpdate;
    const initLoad = useRef(false);

    let data = {};
    try{
        data = hook()
    }catch(e){
        console.error(
            `model: Invoking '${namespace || 'unknown'}' model failed:`,
            e,
        );
    }

    useMemo(() => {
        updateRef.current(data);
        initLoad.current = false;
    }, []);

    useEffect(() => {
        if(initLoad.current){
            updateRef.current(data)
        }else{
            initLoad.current = true
        }
    });

    return <></>
};