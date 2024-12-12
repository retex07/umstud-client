import { CardStatusTypes, UserResponse } from "api/ads/types";
import DateBuilder from "components/dateBuilder";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import urls from "services/router/urls";
import { getFullDate } from "utils/constant.utils";
import { infoUser } from "utils/user.utils";

import CardStatus from "../cardStatus";
import "./styles.scss";

interface Props {
  id: number;
  title: string;
  deadlineStartAt?: string;
  deadlineEndAt?: string;
  category?: string[];
  type?: string[];
  user?: UserResponse;
  isOrder?: boolean;
  status: CardStatusTypes;
}

export default function CardTask(props: Props) {
  const { t } = useTranslation("c_cards");

  const history = useHistory();
  const categories = props.category?.join(", ") || "";

  function openUserProfile(event: React.MouseEvent<HTMLSpanElement>) {
    event.stopPropagation();

    if (props.user) {
      history.push(
        urls.profile.index +
          urls.profile.item.replace(":profileId", props.user.slug)
      );
    }
  }

  function goToItemOrder() {
    history.push(
      urls.orders.index +
        urls.orders.item.replace(":orderId", props.id.toString())
    );
  }

  return (
    <article
      className={props.isOrder ? "card-task--order" : "card-task"}
      onClick={goToItemOrder}
    >
      <header className="card-task__header">
        <h2 className="card-task__title">{props.title}</h2>
      </header>
      <div className="card-task__order-info">
        {props.type && props.type.length && (
          <span className="card-task__order-type">{props.type.join(", ")}</span>
        )}
        {props.category && (
          <div className="card-task__order-categories" title={categories}>
            {categories}
          </div>
        )}
      </div>
      <div className="card-task__states">
        {props.isOrder && props.user ? (
          <div className="card-task__states-user">
            <img
              className="card-task__states-user_img"
              src={props.user.photo}
              alt={props.user.slug}
            />
            <span
              className="card-task__order-author-full-name"
              onClick={openUserProfile}
            >
              {infoUser({ ...props.user })}
            </span>
          </div>
        ) : (
          <CardStatus type={props.status} />
        )}
        {props.deadlineStartAt && props.deadlineEndAt && (
          <DateBuilder
            isClosed={props.status === "closed"}
            dateStartAt={getFullDate(new Date(props.deadlineStartAt))}
            dateEndAt={getFullDate(new Date(props.deadlineEndAt))}
          />
        )}
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
