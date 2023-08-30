import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "./Cursor.module.css";

import type {
    CursorTypes,
    mouseCoordinates,
    polyLinePoints,
    handleMouseEventsProps,
    removeCursor,
    mouseStateBoolean,
    getCoordinatesProps,
    getCoordinatesResult,
    cursorStyleType,
} from "./types/CursorTypes";

const Cursor = ({
    dotColor,
    dotSize,
    dotReductionRatio,
    lineColor,
    lineDelay,
    lineLength,
    lineWidth,
    markerColor,
    removeCursorElements,
    markerBlendMode,
}: CursorTypes) => {
    const drawingCursorRef = useRef<HTMLDivElement>(null);
    const svgElementRef = useRef<SVGSVGElement>(null);
    const circleElementRef = useRef<SVGCircleElement>(null);
    const polylineElementRef = useRef<SVGPolylineElement>(null);
    const markerElementRef = useRef<SVGCircleElement>(null);

    const requestRef = useRef<number>(0);
    const debounceRef = useRef<NodeJS.Timeout | number>(0);
    const polyLinePointsRef = useRef<polyLinePoints>([]);

    const [mouseXY, setMouseXY] = useState<mouseCoordinates>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState<mouseStateBoolean>(false);
    const [isClicked, setIsClicked] = useState<mouseStateBoolean>(false);
    const [isHovered, setIsHovered] = useState<mouseStateBoolean>(false);

    const cursorStyle: cursorStyleType = useMemo(
        () => ({
            circle: { fill: dotColor },
            polyline: {
                stroke: lineColor,
                strokeWidth: lineWidth,
            },
            markerCircle: {
                fill: markerColor,
            },
        }),
        []
    );

    const updateCursorAnimate = () => {
        const polylineElement = polylineElementRef.current;
        const circleElement = circleElementRef.current;
        const markerElement = markerElementRef.current;
        const polyLinePoints = polyLinePointsRef.current;
        const { historyX, historyY, cursorScale }: getCoordinatesResult = getCoordinates({
            mouseXY,
            lineDelay,
            dotReductionRatio,
        });

        if (polylineElement) {
            polyLinePoints.push(`${historyX},${historyY}`);
            polyLinePoints.length > lineLength ? polyLinePoints.shift() : null;
            polylineElement.setAttribute("points", polyLinePoints.join(" "));
        }

        if (circleElement) {
            circleElement.setAttribute("cx", String(mouseXY.x));
            circleElement.setAttribute("cy", String(mouseXY.y));
            circleElement.setAttribute("r", String(cursorScale * dotSize));
        }

        if (markerElement && isHovered) {
            markerElement.setAttribute("cx", String(mouseXY.x));
            markerElement.setAttribute("cy", String(mouseXY.y));
        }

        requestRef.current = requestAnimationFrame(updateCursorAnimate);
    };

    // init
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

    // rAF for updateCursorAnimate
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

    // visibility
    useEffect(() => {
        if (svgElementRef.current) {
            svgElementRef.current.classList.toggle(styled["visibled"], isVisible);
        }
    }, [isVisible]);

    // clicked
    useEffect(() => {
        if (circleElementRef.current) {
            const circleR: number = isClicked ? dotSize - 2 : dotSize;
            circleElementRef.current.setAttribute("r", String(circleR));
        }

        if (isClicked) {
            cancelAnimationFrame(requestRef.current);
        }
    }, [isClicked]);

    // hovered
    useEffect(() => {
        if (drawingCursorRef.current && markerElementRef.current) {
            const blendMode: string = markerBlendMode ? styled["blend"] : "";
            const markerSize: number = isHovered ? dotSize * 3 : 0;
            drawingCursorRef.current.classList.toggle(styled["hovered"], isHovered);
            drawingCursorRef.current.classList.toggle(blendMode, isHovered);
            (markerElementRef.current.style as any).r = markerSize;
        }
    }, [isHovered]);

    return (
        <div ref={drawingCursorRef} className={styled["custom-cursor-wrap"]}>
            <svg ref={svgElementRef} className={styled["cursor-svg"]}>
                <circle
                    ref={circleElementRef}
                    className={styled["cursor-circle"]}
                    style={cursorStyle.circle}
                    cx="500"
                    cy="500"
                    r={dotSize}
                ></circle>
                <polyline
                    ref={polylineElementRef}
                    className={styled["cursor-polyline"]}
                    style={cursorStyle.polyline}
                    points=""
                ></polyline>
                <circle
                    ref={markerElementRef}
                    className={styled["cursor-marker"]}
                    style={cursorStyle.markerCircle}
                    cx="48"
                    cy="48"
                    r="48"
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

const getCoordinates = (() => {
    let historyX: number = 0;
    let historyY: number = 0;
    let dist: number = 0;
    let cursorScale: number = 1;

    return (props: getCoordinatesProps) => {
        const { mouseXY, lineDelay, dotReductionRatio } = props;
        historyX += (mouseXY.x - historyX) / lineDelay;
        historyY += (mouseXY.y - historyY) / lineDelay;
        dist = Math.abs(mouseXY.x - historyX + (mouseXY.y - historyY));
        cursorScale = Math.max(
            cursorScale + ((100 - dist * 8) * 0.01 - cursorScale) * 0.1,
            dotReductionRatio
        );

        return { historyX, historyY, cursorScale };
    };
})();

export default React.memo(Cursor);
