import React from "react";

import { ReactComponent as FillStarSvg } from "@/static/images/fill-star.svg";
import { ReactComponent as HollowStarSvg } from "@/static/images/hollow-star.svg";
import "./CardReview.scss";

interface Props {
  key?: number;
  countStars: number;
  author: string;
  comment: string;
  date: string;
}

export default function CardReview(props: Props) {
  if (props.countStars > 5) {
    return <>Неверное значение оценки!</>;
  }

  return (
    <article className="card-review">
      <header className="card-review--header">
        <h3 className="card-review--heading">{props.author}</h3>
        <div className="stars">
          {[...Array(props.countStars)].map((item, index) => (
            <FillStarSvg key={index} />
          ))}
          {[...Array(5 - props.countStars)].map((item, index) => (
            <HollowStarSvg key={index} />
          ))}
        </div>
      </header>
      <div className="card-review--comment-container">
        <span>Комментарий:</span>
        <p>{props.comment}</p>
      </div>
      <footer className="card-review--date">{props.date}</footer>
    </article>
  );
}
