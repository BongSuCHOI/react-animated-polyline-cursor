import { useEffect, useRef } from "react";

const useDebounce = (timeoutCallback: () => void, delay: number, deps?: any) => {
    const debounceRef = useRef<NodeJS.Timeout | number>(0);

    useEffect(() => {
        debounceRef.current = setTimeout(timeoutCallback, delay);
        return () => clearTimeout(debounceRef.current);
    }, [deps]);

    return debounceRef;
};

export { useDebounce };
