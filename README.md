# React Animated Polyline Cursor

기본 커서를 커스텀 가능한 애니메이션 커서로 변경해주는 React Component입니다.
<br/>
해당 Component는 함수형으로 제작되었습니다.

<br/>

## Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Start](#start)
4. [Options](#options)
5. [Notes](#notes)

<br/>

## Features

-   기본 커서 대체 `circle`
-   `circle`가 이동했던 경로를 선을 그리며 따라오는 `polyline`
-   클릭시 `circle` scale 축소 효과
-   호버시 `marker` 노출 효과

그 외에 `circle`, `polyline`, `marker`의 color, size, polyline-delay, polyline-length, marker-blend-mode 등 다양한 커스텀이 가능합니다.

<br/>

## Demo

[Live Demo](https://bongsuchoi.github.io/react-animated-polyline-cursor/)

<br/>

## Start

아직 npm 패키지 등록을 안해서 lib에 있는 파일/폴더들을 다운 혹은 카피 후 본인 프로젝트에 적용해서 사용해야 합니다.

### 프로젝트에 적용

전역 위치에 추가(`App.js`)

```
import React from "react";
import CustomAnimatedCursor from "user project dir path";

export default function App() {
  return (
    <div className="App">
      <CustomAnimatedCursor />
    </div>
  );
}
```

### 사용 예시

```
import React from "react";
import CustomAnimatedCursor from "user project dir path";

export default function App() {
  return (
    <div className="App">
      <CustomAnimatedCursor
            dotColor={"#2AFADF"}
            dotSize={8}
            dotReductionRatio={0.25}
            lineColor={"#2AFADF"}
            lineDelay={2}
            lineLength={12}
            lineWidth={2}
            markerColor={"#2AFADF"}
            addRemoveCursor={".ex-video"}
            markerBlendMode={true}
        />
        ...component
    </div>
  );
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
| `markerColor`          | string  | HoveredMarker color - rgb or hex                        | `#000`                                                    |
| `removeCursorElements` | array   | Remove default cursor from element - htmlTag, class, id | `['a', 'input', 'label', 'select', 'textarea', 'button']` |
| `markerBlendMode`      | boolean | On/Off the hoveredMarker blend mode - boolean           | `true`                                                    |

<br/>

## Todos

-   ~~Webpack to Vite Migration~~
-   Add Hovered Marker Click Action
-   Add Input Type Element Hovered Action
-   Create & Deploy NPM Package
-   Source Refactoring

<br/>

## Notes

-   Vue로 구현되어있는 [DFY](https://www.dfy.co.kr/)의 커서를 React 버전으로 만들어보고 싶어서 제작하였습니다.
-   버그, 이슈, 리팩토링 등 다양한 피드백 환영합니다.
