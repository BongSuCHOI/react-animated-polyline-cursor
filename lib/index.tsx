import React from "react";
import Cursor from "@lib/Cursor";
import DeviceCheck from "@lib/util/deviceCheck";

import type { CursorTypes } from "@lib/types/Cursor.types";

// render
const CustomAnimatedCursor = ({
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
    if (DeviceCheck.any()) {
        return <></>;
    }
    return (
        <Cursor
            dotColor={dotColor}
            dotSize={dotSize}
            dotReductionRatio={dotReductionRatio}
            lineColor={lineColor}
            lineDelay={lineDelay}
            lineLength={lineLength}
            lineWidth={lineWidth}
            markerColor={markerColor}
            removeCursorElements={removeCursorElements}
            markerBlendMode={markerBlendMode}
        />
    );
};

CustomAnimatedCursor.defaultProps = {
    dotColor: "#000",
    dotSize: 8,
    dotReductionRatio: 0.25,
    lineColor: "#000",
    lineDelay: 2,
    lineLength: 12,
    lineWidth: 2,
    markerColor: "#fff",
    removeCursorElements: ["a", "input", "label", "select", "textarea", "button"],
    markerBlendMode: true,
};

export default CustomAnimatedCursor;
