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

export interface getCoordinatesProps {
    mouseXY: mouseCoordinates;
    lineDelay: number;
    dotReductionRatio: number;
}

export interface getCoordinatesResult {
    historyX: number;
    historyY: number;
    cursorScale: number;
}

export interface cursorStyleType {
    circle: {
        fill: string;
    };
    polyline: {
        stroke: string;
        strokeWidth: number;
    };
    markerCircle: {
        fill: string;
    };
}
