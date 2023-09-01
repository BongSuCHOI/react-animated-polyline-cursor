import type { getCursorStyleProps } from "@lib/types/Cursor.types";

export const getCursorStyle = ({
    dotColor,
    lineColor,
    lineWidth,
    markerColor,
    markerBlendMode,
}: getCursorStyleProps) => {
    return {
        customCursorWrap: {
            zIndex: 1500,
            position: "relative" as "relative",
            height: 0,
            mixBlendMode: markerBlendMode ? ("difference" as "difference") : ("normal" as "normal"),
        },
        cursorSvg: {
            zIndex: 1,
            opacity: 0,
            position: "fixed" as "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none" as "none",
            transition: "opacity 0.5s",
        },
        circle: {
            fill: dotColor,
            transition: "opacity 0.2s",
        },
        polyline: {
            stroke: lineColor,
            strokeWidth: lineWidth,
            fill: "none",
            transition: "opacity 0.2s",
        },
        markerCircle: {
            fill: markerColor,
            zIndex: 5,
            opacity: 0,
            transition: "opacity 0.2s, r 0.2s cubic-bezier(0.22, 0.61, 0.36, 1)",
            r: 0,
        },
    };
};
