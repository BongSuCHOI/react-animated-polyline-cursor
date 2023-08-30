import React from "react";
import styled from "./DemoContent.module.css";

export default function DemoContent() {
    return (
        <div className={styled.wrap}>
            <div className={styled.con}>
                <h1 className={styled.h1}>
                    Custom Animated Cursor
                    <br />
                    React Component
                </h1>
                <p className={styled.p}>
                    이벤트 리스너와 커서의 상태, requestAnimationFrame을 관리하기 위해 useRef,
                    useEffect, useState, useCallback 훅 등을 사용하여 만든 Custom Animated Cursor
                    React Component입니다
                </p>
                <p className={styled.p}>
                    아래의 각 요소에 마우스를 올려서 확인해보세요. 기본 데모 효과 뿐 아니라 커스텀도
                    가능합니다. 자세한 내용은{" "}
                    <a
                        href="https://github.com/BongSuCHOI/react-custom-animated-cursor"
                        target="_blank"
                        className="c-cursor-hover"
                    >
                        깃허브
                    </a>
                </p>
                <p className={styled.p}>
                    본 컴포넌트는 함수형 컴포넌트로 제작되었으며,{" "}
                    <a href="https://www.dfy.co.kr/" target="_blank" className="c-cursor-hover">
                        DFY
                    </a>
                    의 커서를 React 버전으로 만들어보고 싶어서{" "}
                    <a
                        href="https://github.com/stephenscaff/react-animated-cursor"
                        target="_blank"
                        className="c-cursor-hover"
                    >
                        react-animated-cursor
                    </a>
                    와{" "}
                    <a href="https://www.dfy.co.kr/" target="_blank" className="c-cursor-hover">
                        DFY
                    </a>
                    를 참고하여 공부 겸 지속적인 유지보수 및 개선을 해보고 싶어서 오픈소스의 형태로
                    제작하였습니다.{" "}
                    <i>
                        소스를 참고해서 만든 것을 공개 리포지토리로 공유해도 되냐고 물어본 메일은
                        답이 한달이 넘도록 없기도 하고, 저장소에 따로 수정/배포에 관한 내용은 안
                        써있어서 올렸습니다. 문제가 된다면 알려주세요. 바로 조치를 취하겠습니다.
                    </i>
                </p>
                <p className={styled.p}>버그, 이슈, 리팩토링 등 다양한 피드백 환영합니다.</p>
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
