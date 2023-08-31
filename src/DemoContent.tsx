import React from "react";
import styled from "@src/DemoContent.module.css";

export default function DemoContent() {
    return (
        <div className={styled.wrap}>
            <div className={styled.con}>
                <h1 className={styled.h1}>Custom Animated Polyline Cursor</h1>
                <p className={styled.p}>
                    아래의 각 요소에 마우스를 올려서 확인해보세요.
                    <br />
                    기본 데모 효과 뿐 아니라 약간의 커스텀도 가능합니다. 자세한 내용은{" "}
                    <a
                        href="https://github.com/BongSuCHOI/react-custom-animated-cursor"
                        target="_blank"
                        className="c-cursor-hover"
                    >
                        GitHub
                    </a>
                </p>
                <p className={styled.p}>
                    본 컴포넌트는 함수형 컴포넌트로 제작되었으며,
                    <br />
                    Vue로 구현되어있는{" "}
                    <a href="https://www.dfy.co.kr/" target="_blank" className="c-cursor-hover">
                        DFY
                    </a>
                    의 커서를 React 버전으로 만들어보고 싶어서 제작하였습니다. <br />
                    버그, 이슈, 리팩토링 등 다양한 피드백 환영합니다.
                </p>
                <ul className={styled.ul}>
                    <li>
                        <p>기본 텍스트입니다.</p>
                    </li>
                    <li>
                        <a href="#" className="c-cursor-hover">
                            링크 텍스트입니다.
                        </a>
                    </li>
                    <li>
                        <button type="button" className="c-cursor-hover">
                            버튼
                        </button>
                    </li>
                    <li>
                        <input type="text" placeholder="TEXT INPUT" />
                    </li>
                    <li>
                        <input type="checkbox" />
                    </li>
                    <li>
                        <select>
                            <option>OPTION 01</option>
                            <option>OPTION 02</option>
                        </select>
                    </li>
                    <li>
                        <div className="c-cursor-hover">Hover Box</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
