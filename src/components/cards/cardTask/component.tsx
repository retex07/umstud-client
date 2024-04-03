import DateBuilder from "components/dateBuilder";
import React from "react";

import "./styles.scss";
import CardStatus from "../cardStatus";

interface User {
  imagePath: string;
  fullName: string;
  username: string;
}

interface Props {
  title: string;
  description: string;
  deadlineStartAt: string;
  deadlineEndAt: string;
  user: User | null;
  isOrder?: boolean;
  isClosed?: boolean;
}

export default function CardTask(props: Props) {
  return (
    <article className={props.isOrder ? "card-task--order" : "card-task"}>
      <header>
        <h2 className="card-task--title">{props.title}</h2>
        <p className="card-task--description">{props.description}</p>
      </header>
      <div className="card-task--states">
        {props.isOrder ? (
          <div>Таушканов Александр</div>
        ) : (
          <CardStatus type={props.isClosed ? "closed" : "open"} />
        )}
        <DateBuilder
          isClosed={props.isClosed}
          dateStartAt={props.deadlineStartAt}
          dateEndAt={props.deadlineEndAt}
        />
        {props.isOrder ? (
          <CardStatus type={props.isClosed ? "closed" : "open"} />
        ) : (
          <div className="card-task--person">
            <span className="card-task--text">Исполнитель</span>
            <span className="card-task--link">
              {props.user?.username ?? "Выбрать"}
            </span>
          </div>
        )}
      </div>
      <footer></footer>
    </article>
  );
}
