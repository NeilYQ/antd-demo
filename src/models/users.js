import { useState } from "react";

export default () => {

    const [count, setCount] = useState(0);
    const effects = {
        add: (num = 0) => {
            let nextCount = count + num
            setCount(nextCount);
            return nextCount;
        },
        reduce: (num = 0) => {
            let nextCount = count - num
            setCount(nextCount);
            return nextCount;
        }
    };

    const dispatch = ({ type, payload } = {}) => {
        return type && effects?.[type] 
            ? effects?.[type]?.(payload)
            : function () {
                console.log(`${type} is not found!`);
            }
        ;
    };

    return {
        dispatch,
        state: {
            count
        },
    }
};
