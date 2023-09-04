# React Animated Polyline Cursor

기본 커서를 커스텀 가능한 애니메이션 커서로 변경해주는 React Component입니다.
<br/>
해당 Component는 함수형으로 제작되었습니다.

<br/>

## Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Install](#Install)
4. [Options](#options)
5. [Notes](#notes)

<br/>

## Features

-   Custom cursor replaced by default cursor
-   Line effects that track the path the cursor has traveled
-   Cursor scale down effect on click
-   Cursor resizing effect when hovering over elements with 'c-cursor-hover' class defined

Other customizations include color, size, polyline-delay, polyline-length, marker-blend-mode, and more for `circle`, `polyline`, and `marker`.

[Live Demo](https://bongsuchoi.github.io/react-animated-polyline-cursor/)

<br/>

## Install

```
npm i react-animated-polyline-cursor
```

<br/>

## Usage

**Add to global scope. (ex. App.ts)**

```jsx
import React from "react";
import CustomAnimatedCursor from "user project dir path";

export default function App() {
    return (
        <div className="App">
            // It has default values, ​​and you can only override custom settings.
            <CustomAnimatedCursor
                dotColor={"#2AFADF"}
                lineColor={"#2AFADF"}
                markerColor={"#2AFADF"}
            />
            ...component
        </div>
    );
}
```

**Hover Element (add 'c-cursor-hover' className)**

```jsx
export default function DemoContent() {
    return (
        <div>
            <div>
                <h1>Custom Animated Polyline Cursor</h1>
                <a href="#" className="c-cursor-hover">
                    Link Text.
                </a>
                <div className="c-cursor-hover">Hover Box</div>
                <div>
                    <label htmlFor="chk" className="c-cursor-hover">
                        Checkbox
                    </label>
                    <input type="checkbox" id="chk" />
                </div>
            </div>
        </div>
    );
}
```

### Default Props

```ts
CustomAnimatedCursor.defaultProps = {
    dotColor: "#000",
    dotSize: 8,
    dotReductionRatio: 0.25,
    lineColor: "#000",
    lineDelay: 2,
    lineLength: 12,
    lineWidth: 2,
    markerSize: 24,
    markerColor: "#fff",
    removeCursorElements: ["a", "input", "label", "select", "textarea", "button"],
    markerBlendMode: true,
};
```

### Props Types

```ts
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
    removeCursorElements: string[];
    markerBlendMode: boolean;
}
```

<br/>

## Options

| Option                 | Type    | Description                                             | Default                                                   |
| ---------------------- | ------- | ------------------------------------------------------- | --------------------------------------------------------- |
| `dotColor`             | string  | Cursor color - rgb or hex                               | `#000`                                                    |
| `dotSize`              | number  | Cursor size - Minimum 1                                 | `8`                                                       |
| `dotReductionRatio`    | number  | Cursor reduction ratio - 0~1                            | `0.25`                                                    |
| `lineColor`            | string  | DrawLine color - rgb or hex                             | `#000`                                                    |
| `lineDelay`            | number  | DrawLine delay to follow - Minimum 1                    | `2`                                                       |
| `lineLength`           | number  | DrawLine stretched length - Recommend 2~30 limit        | `12`                                                      |
| `lineWidth`            | number  | DrawLine width - Minimum 1, Maximum "dotSize"           | `2`                                                       |
| `markerSize`           | string  | HoveredMarker size - Minimum "dotSize"                  | `24`                                                      |
| `markerColor`          | string  | HoveredMarker color - rgb or hex                        | `#000`                                                    |
| `removeCursorElements` | array   | Remove default cursor from element - htmlTag, class, id | `['a', 'input', 'label', 'select', 'textarea', 'button']` |
| `markerBlendMode`      | boolean | On/Off the Cursor blend mode - boolean                  | `true`                                                    |

<br/>

## Todos

-   ~~Webpack to Vite Migration~~
-   ~~Add Hovered Marker Click Action~~
-   ~~Add Input Type Element Hovered Action~~
-   ~~Create & Deploy NPM Package~~
-   Add more detailed cursor style editing
-   Changed input element cursor hovered design
-   Add SSR Mode
-   Source Refactoring

<br/>

## Notes

-   Vue로 구현되어있는 [DFY](https://www.dfy.co.kr/)의 커서를 React 버전으로 만들어보고 싶어서 제작하였습니다.
-   버그, 이슈, 리팩토링 등 다양한 피드백 환영합니다.
