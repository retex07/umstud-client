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
    <article className="umstud-card-review">
      <header className="umstud-card-review__header">
        <h3 className="umstud-card-review__heading">{props.author}</h3>
        <div className="umstud-stars">
          {[...Array(props.countStars)].map((_, index) => (
            <FillStarSvg key={index} />
          ))}
          {[...Array(5 - props.countStars)].map((_, index) => (
            <HollowStarSvg key={index} />
          ))}
        </div>
      </header>
      <div className="umstud-card-review__comment-container">
        <p>{props.comment}</p>
      </div>
      <footer className="umstud-card-review__date">{props.date}</footer>
    </article>
  );
}
