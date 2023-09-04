import React, { useRef, useEffect, useState, useMemo } from "react";
import { getCursorStyle } from "@lib/CursorStyles";

import type {
    CursorTypes,
    mouseCoordinates,
    polyLinePoints,
    handleMouseEventsProps,
    removeCursor,
    mouseStateBoolean,
    historyCoordinates,
    cursorStyleType,
} from "@lib/types/Cursor.types";

const Cursor = ({
    dotColor,
    dotSize,
    dotReductionRatio,
    lineColor,
    lineDelay,
    lineLength,
    lineWidth,
    markerSize,
    markerColor,
    removeCursorElements,
    markerBlendMode,
}: CursorTypes) => {
    const drawingCursorRef = useRef<HTMLDivElement>(null);
    const svgElementRef = useRef<SVGSVGElement>(null);
    const circleElementRef = useRef<SVGCircleElement>(null);
    const polylineElementRef = useRef<SVGPolylineElement>(null);
    const markerElementRef = useRef<SVGCircleElement>(null);

    const historyCoordRef = useRef<historyCoordinates>({
        historyX: 0,
        historyY: 0,
        dist: 0,
        scale: 1,
    });
    const requestRef = useRef<number>(0);
    const debounceRef = useRef<NodeJS.Timeout | number>(0);
    const polyLinePointsRef = useRef<polyLinePoints>([]);

    const [mouseXY, setMouseXY] = useState<mouseCoordinates>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState<mouseStateBoolean>(false);
    const [isClicked, setIsClicked] = useState<mouseStateBoolean>(false);
    const [isHovered, setIsHovered] = useState<mouseStateBoolean>(false);

    const cursorStyle: cursorStyleType = useMemo(
        () =>
            getCursorStyle({
                dotColor,
                lineColor,
                lineWidth,
                markerColor,
                markerBlendMode,
            }),
        []
    );

    // Draw a mouse pointer and polyline
    const updateCursorAnimate = () => {
        updateHistoryXY();

        const { historyX, historyY, scale } = historyCoordRef.current;
        const polyLinePoints = polyLinePointsRef.current;
        const polylineElement = polylineElementRef.current;
        const circleElement = circleElementRef.current;
        const markerElement = markerElementRef.current;

        if (polylineElement) {
            polyLinePoints.push(`${historyX},${historyY}`);
            polyLinePoints.length > lineLength ? polyLinePoints.shift() : null;
            polylineElement.setAttribute("points", polyLinePoints.join(" "));
        }

        if (circleElement) {
            circleElement.setAttribute("cx", String(mouseXY.x));
            circleElement.setAttribute("cy", String(mouseXY.y));
            circleElement.setAttribute("r", String(scale * dotSize));
        }

        if (markerElement && isHovered) {
            markerElement.setAttribute("cx", String(mouseXY.x));
            markerElement.setAttribute("cy", String(mouseXY.y));
        }

        requestRef.current = requestAnimationFrame(updateCursorAnimate);
    };

    // Get a history of mouse movement coordinates (used for polyline points)
    const updateHistoryXY = () => {
        let { historyX, historyY, dist, scale } = historyCoordRef.current;
        historyCoordRef.current = {
            historyX: (historyX += (mouseXY.x - historyX) / lineDelay),
            historyY: (historyY += (mouseXY.y - historyY) / lineDelay),
            dist: Math.abs(mouseXY.x - historyX + (mouseXY.y - historyY)),
            scale: Math.max(scale + ((100 - dist * 8) * 0.01 - scale) * 0.1, dotReductionRatio),
        };
    };

    // Registering event listeners and removing the default cursor
    useEffect(() => {
        const cleanupMouseEvents: () => void = setMouseEvents({
            setMouseXY,
            setIsVisible,
            setIsClicked,
            setIsHovered,
        });
        removeDefaultCursor(removeCursorElements);

        return () => {
            cleanupMouseEvents();
        };
    }, []);

    // Run and debounce updateCursorAnimate()
    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateCursorAnimate);
        debounceRef.current = setTimeout(
            () => cancelAnimationFrame(requestRef.current),
            (lineDelay + lineLength) * 30
        );

        return () => {
            cancelAnimationFrame(requestRef.current);
            clearTimeout(debounceRef.current);
        };
    }, [updateCursorAnimate]);

    // When the mouse enters and exits a window
    useEffect(() => {
        if (svgElementRef.current) {
            svgElementRef.current.style.opacity = isVisible ? "1" : "0";
        }
    }, [isVisible]);

    // On mouse click
    useEffect(() => {
        if (circleElementRef.current) {
            const circleR: number = isClicked ? dotSize - 2 : dotSize;
            circleElementRef.current.setAttribute("r", String(circleR));
        }

        if (isHovered && markerElementRef.current) {
            (markerElementRef.current.style as any).r = isClicked ? markerSize - 3 : markerSize;
        }

        if (isClicked) {
            cancelAnimationFrame(requestRef.current);
        }
    }, [isClicked]);

    // When the mouse is hovered over the '.c-cursor-hover' element
    useEffect(() => {
        if (circleElementRef.current && polylineElementRef.current && markerElementRef.current) {
            circleElementRef.current.style.opacity = isHovered ? "0" : "1";
            polylineElementRef.current.style.opacity = isHovered ? "0" : "1";
            markerElementRef.current.style.opacity = isHovered ? "1" : "0";
            (markerElementRef.current.style as any).r = isHovered ? markerSize : dotSize;
        }
    }, [isHovered]);

    return (
        <div
            ref={drawingCursorRef}
            className="polyline-cursor-wrap"
            style={cursorStyle.customCursorWrap}
        >
            <svg ref={svgElementRef} className="cursor-svg" style={cursorStyle.cursorSvg}>
                <circle
                    ref={circleElementRef}
                    className="cursor-circle"
                    style={cursorStyle.circle}
                    cx="500"
                    cy="500"
                    r={dotSize}
                ></circle>
                <polyline
                    ref={polylineElementRef}
                    className="cursor-polyline"
                    style={cursorStyle.polyline}
                    points=""
                ></polyline>
                <circle
                    ref={markerElementRef}
                    className="cursor-marker"
                    style={cursorStyle.markerCircle}
                />
            </svg>
        </div>
    );
};

const removeDefaultCursor = (removeCursorElements: removeCursor) => {
    const elements: NodeListOf<Element> = document.querySelectorAll(removeCursorElements.join(","));
    elements.forEach((element: HTMLElement) => (element.style.cursor = "none"));
    document.body.style.cursor = "none";
};

const setMouseEvents = (props: handleMouseEventsProps) => {
    const { setMouseXY, setIsVisible, setIsClicked, setIsHovered } = props;
    const hoverElements: NodeListOf<Element> = document.querySelectorAll(".c-cursor-hover");

    const onMouseMoveHandler = (e: MouseEvent) => setMouseXY({ x: e.clientX, y: e.clientY });
    const onMouseOverHandler = () => setIsVisible(true);
    const onMouseOutHandler = () => setIsVisible(false);
    const onMouseDownHandler = () => setIsClicked(true);
    const onMouseUpHandler = () => setIsClicked(false);
    const onMouseEnterHandler = () => setIsHovered(true);
    const onMouseLeaveHandler = () => setIsHovered(false);

    window.addEventListener("mousemove", onMouseMoveHandler);
    window.addEventListener("mouseover", onMouseOverHandler);
    window.addEventListener("mouseout", onMouseOutHandler);
    window.addEventListener("mousedown", onMouseDownHandler);
    window.addEventListener("mouseup", onMouseUpHandler);

    hoverElements.forEach((element: HTMLElement) => {
        element.addEventListener("mouseenter", onMouseEnterHandler);
        element.addEventListener("mouseleave", onMouseLeaveHandler);
    });

    return () => {
        window.removeEventListener("mousemove", onMouseMoveHandler);
        window.removeEventListener("mouseover", onMouseOverHandler);
        window.removeEventListener("mouseout", onMouseOutHandler);
        window.removeEventListener("mousedown", onMouseDownHandler);
        window.removeEventListener("mouseup", onMouseUpHandler);

        hoverElements.forEach((element: HTMLElement) => {
            element.removeEventListener("mouseenter", onMouseEnterHandler);
            element.removeEventListener("mouseleave", onMouseLeaveHandler);
        });
    };
};

export default React.memo(Cursor);
