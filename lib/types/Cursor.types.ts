export type removeCursor = string[];

export type mouseStateBoolean = boolean;

export type polyLinePoints = string[];

export interface CursorTypes {
    dotColor: string;
    dotSize: number;
    dotReductionRatio: number;
    lineColor: string;
    lineDelay: number;
    lineLength: number;
    lineWidth: number;
    markerSize: number;
    markerColor: string;
    removeCursorElements: removeCursor;
    markerBlendMode: mouseStateBoolean;
}

export interface mouseCoordinates {
    x: number;
    y: number;
}

export interface handleMouseEventsProps {
    setMouseXY: React.Dispatch<React.SetStateAction<mouseCoordinates>>;
    setIsVisible: React.Dispatch<React.SetStateAction<mouseStateBoolean>>;
    setIsClicked: React.Dispatch<React.SetStateAction<mouseStateBoolean>>;
    setIsHovered: React.Dispatch<React.SetStateAction<mouseStateBoolean>>;
}

export interface historyCoordinates {
    historyX: number;
    historyY: number;
    dist: number;
    scale: number;
}

export type getCursorStyleProps = {
    dotColor: string;
    lineColor: string;
    lineWidth: number;
    markerColor: string;
    markerBlendMode: boolean;
};
export interface cursorStyleType {
    customCursorWrap: {
        zIndex: number;
        position: "relative";
        height: number;
        mixBlendMode: "difference" | "normal";
    };
    cursorSvg: {
        zIndex: number;
        opacity: number;
        position: "fixed";
        left: number;
        top: number;
        width: string;
        height: string;
        pointerEvents: "none";
        transition: string;
    };
    circle: {
        fill: string;
        transition: string;
    };
    polyline: {
        stroke: string;
        strokeWidth: number;
        fill: string;
        transition: string;
    };
    markerCircle: {
        fill: string;
        zIndex: number;
        opacity: number;
        transition: string;
        r: number;
    };
}
