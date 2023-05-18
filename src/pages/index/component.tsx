import React from "react";
import { ReactComponent as ManWithBoardSvg } from "static/images/index/man-with-board.svg";
import "./styles.scss";

export default function IndexPage() {
  return (
    <div className="index-page">
      <div className="head-container">
        <div className="head-block">
          <ManWithBoardSvg />
          <div className="head-text-container">
            <h1 className="heading">Помощь студентам - наша цель</h1>
            <h2 className="subtitle">
              Мы имеем дело с превосходными исполнителями учебных работ
            </h2>
            <select>
              <option>Пункт 1</option>
              <option>Пункт 2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
