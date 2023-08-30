import { useRef, useEffect } from "react";

const useEventListener = (
    element: Window | HTMLElement,
    eventName: string,
    handler: (e: Event) => void
) => {
    const eventHandlerRef = useRef<(e: Event) => void>(() => {});

    useEffect(() => {
        eventHandlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        element.addEventListener(eventName, eventHandlerRef.current);
        return () => element.removeEventListener(eventName, eventHandlerRef.current);
    }, [eventName, element]);
};

export { useEventListener };
