import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { CardStatusTypes, UserResponse } from "@/api/ads/types";
import AvatarUser from "@/components/avatarUser";
import Button from "@/components/button";
import DateBuilder from "@/components/dateBuilder";
import Modal from "@/components/modal";
import urls from "@/services/router/urls";
import { setResponder } from "@/store/actions/order";
import { infoUser } from "@/utils/user";
import { getFullDate } from "@/utils/util";

import CardStatus from "../cardStatus";

import "./CardTask.scss";

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
  responders?: UserResponse[];
}

export default function CardTask(props: Props) {
  const { t } = useTranslation("c_cards");
  const [isOpenRespondersModal, setIsOpenRespondersModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [selectedResponder, setSelectedResponder] = useState<number>();

  const history = useHistory();
  const dispatch = useDispatch();

  const categories = props.category?.join(", ") || "";

  function openUserProfile(event?: React.MouseEvent<HTMLSpanElement>) {
    event?.stopPropagation();

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

  function handleSubmit() {
    if (selectedResponder) {
      dispatch(
        setResponder({
          ad_id: props.id,
          response_id: selectedResponder,
        })
      );
    }
  }

  const closeModalResponders = () => {
    setSelectedResponder(undefined);
    setIsClosingModal(true);
    setTimeout(() => {
      setIsClosingModal(false);
      setIsOpenRespondersModal(false);
    }, 300);
  };

  function renderModalResponders() {
    return (
      <Modal
        isOpen={isOpenRespondersModal}
        onClose={closeModalResponders}
        isClosing={isClosingModal}
        title={t("titleModalResponders")}
      >
        <div className="modal-responders">
          <div className="modal-responders__users">
            {!props.responders?.length && <span>{t("noDataResponders")}</span>}
            {props.responders?.map((responder) => (
              <div key={responder.id} className="modal-responders__user">
                <div className="modal-responders__user-info">
                  <AvatarUser
                    classNameImg="modal-responders__user_img"
                    classNameWrapper="modal-responders__user_wrapper-avatar"
                    photo={responder.photo || null}
                    username={responder.slug}
                  />
                  <span className="modal-responders__user_text">
                    {responder.last_name} {responder.first_name}
                  </span>
                </div>
                <div className="modal-responders__action">
                  <Button
                    onClick={() => setSelectedResponder(responder.id)}
                    color="blue-dark"
                    size="small"
                    fullWidth
                    label={
                      !!responder.id && selectedResponder === responder.id
                        ? t("cardTask.selected")
                        : t("cardTask.choose")
                    }
                    isTransparent={
                      !!responder.id && selectedResponder === responder.id
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          {!!props.responders?.length && (
            <div className="modal-responders__actions">
              <Button
                fullWidth
                label="Подтвердить"
                size="middle"
                disabled={!selectedResponder}
                onClick={handleSubmit}
              />
              <Button
                label="Отменить"
                onClick={closeModalResponders}
                size="middle"
                color="red"
                isTransparent
                fullWidth
              />
            </div>
          )}
          {!props.responders?.length && (
            <Button
              label="Отменить"
              onClick={closeModalResponders}
              size="middle"
              color="red"
              isTransparent
              fullWidth
            />
          )}
        </div>
      </Modal>
    );
  }

  function renderAction() {
    if (props.user?.slug) {
      return (
        <button className="card-task__link_btn" onClick={openUserProfile}>
          {props.user?.slug}
        </button>
      );
    }

    return (
      <button
        className="card-task__link_btn"
        onClick={() => setIsOpenRespondersModal(true)}
      >
        {props.user?.slug ?? t("cardTask.choose")}
      </button>
    );
  }

  return (
    <article className={props.isOrder ? "card-task--order" : "card-task"}>
      <header className="card-task__header" onClick={goToItemOrder}>
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
            {renderAction()}
            {renderModalResponders()}
          </div>
        )}
      </div>
    </article>
  );
}
