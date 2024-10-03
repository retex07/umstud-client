import { SimpleUserProfile } from "api/user/types";
import DateBuilder from "components/dateBuilder";
import React from "react";
import { useTranslation } from "react-i18next";
import { getFullDate } from "utils/constant.utils";
import { infoUser } from "utils/user.utils";

import CardStatus from "../cardStatus";
import { CardStatusTypes } from "../cardStatus/component";
import "./styles.scss";

interface Props {
  title: string;
  deadlineStartAt: string;
  deadlineEndAt: string;
  category?: string[];
  type?: string;
  user: SimpleUserProfile | null;
  isOrder?: boolean;
  status: CardStatusTypes;
}

export default function CardTask(props: Props) {
  const { t } = useTranslation("c_cards");

  return (
    <article className={props.isOrder ? "card-task--order" : "card-task"}>
      <header className="card-task__header">
        <h2 className="card-task__title">{props.title}</h2>
      </header>
      <div className="card-task__order-info">
        {props.type && (
          <span className="card-task__order-type">{props.type}</span>
        )}
        {props.category && (
          <div className="card-task__order-category-list">
            {props.category.map((category, index) => (
              <span className="card-task__order-category" key={index}>
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="card-task--states">
        {props.isOrder && props.user ? (
          <div>
            <img src={props.user.photo} alt={props.user.slug} />
            <span className="card-task__order-author-full-name">
              {infoUser({ ...props.user })}
            </span>
          </div>
        ) : (
          <CardStatus type={props.status} />
        )}
        <DateBuilder
          isClosed={props.status === "closed"}
          dateStartAt={getFullDate(new Date(props.deadlineStartAt))}
          dateEndAt={getFullDate(new Date(props.deadlineEndAt))}
        />
        {props.isOrder ? (
          <CardStatus type={props.status} />
        ) : (
          <div className="card-task--person">
            <span className="card-task--text">{t("cardTask.executor")}</span>
            <span className="card-task--link">
              {props.user?.slug ?? t("cardTask.choose")}
            </span>
          </div>
        )}
      </div>
      <footer></footer>
    </article>
  );
}
