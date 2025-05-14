import classNames from "classnames";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { AdGet, UserResponse } from "@/api/handlers/order/types";
import AvatarUser from "@/components/avatarUser";
import Button from "@/components/button";
import DateBuilder from "@/components/dateBuilder";
import Modal from "@/components/modal";
import urls from "@/services/router/urls";
import { createChat } from "@/store/actions/chat";
import { setResponder } from "@/store/actions/order";
import { selectUserData } from "@/store/selectors/user";
import { infoUser } from "@/utils/user";
import { getFullDate } from "@/utils/util";

import CardStatus from "../cardStatus";

import "./CardTask.scss";

interface Props
  extends Pick<
    AdGet,
    | "executor"
    | "room_id"
    | "id"
    | "responders"
    | "status"
    | "title"
    | "deadlineStartAt"
    | "deadlineEndAt"
    | "author"
    | "budget"
  > {
  className?: string;
  category?: string[];
  type?: string[];
  user?: UserResponse;
  isOrder?: boolean;
}

export default function CardTask(props: Props) {
  const { t } = useTranslation("c_cards");
  const [isOpenRespondersModal, setIsOpenRespondersModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [selectedResponder, setSelectedResponder] = useState<number>();

  const history = useHistory();
  const dispatch = useDispatch();

  const myProfileData = useSelector(selectUserData);
  const categories = props.category?.join(", ") || "";
  const isMyWork = myProfileData?.slug === props.executor?.slug;

  function openChat() {
    if (!!props.room_id) {
      history.push(
        urls.profile.index +
          urls.profile.messages.item.replace(":roomId", props.room_id)
      );

      return;
    } else if (props.executor?.id) {
      dispatch(
        createChat({
          participant_id: props.executor.id,
          ad_id: props.id,
        })
      );

      return;
    }

    toast.error(t("goToChat.getError"));
  }

  function openUserProfile(
    event?: React.MouseEvent<HTMLSpanElement>,
    slug?: string
  ) {
    event?.stopPropagation();

    if (props.user) {
      history.push(
        urls.profile.index +
          urls.profile.item.replace(":profileId", slug || props.user.slug)
      );
    }
  }

  function goToItemOrder() {
    history.push(
      urls.orders.index +
        urls.orders.item.replace(":orderId", props.id.toString())
    );
  }

  function handleSelectResponderSubmit() {
    if (selectedResponder) {
      dispatch(
        setResponder({
          ad_id: props.id,
          response_id: selectedResponder,
          callback: () => closeModalResponders(),
        })
      );
    }
  }

  function closeModalResponders() {
    setSelectedResponder(undefined);
    setIsClosingModal(true);
    setTimeout(() => {
      setIsClosingModal(false);
      setIsOpenRespondersModal(false);
    }, 300);
  }

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
            {props.responders?.map(({ responder, id: respondId }) => (
              <div key={respondId} className="modal-responders__user">
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
                    onClick={() => setSelectedResponder(respondId)}
                    color="blue-dark"
                    size="small"
                    fullWidth
                    label={
                      !!respondId && selectedResponder === respondId
                        ? t("cardTask.selected")
                        : t("cardTask.choose")
                    }
                    isTransparent={
                      !!respondId && selectedResponder === respondId
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="modal-responders__actions">
            {props.status === "open" && !!props.responders?.length && (
              <Button
                fullWidth
                label={t("cardTask.action.confirm")}
                size="middle"
                disabled={!selectedResponder}
                onClick={handleSelectResponderSubmit}
              />
            )}
            <Button
              label={t("cardTask.action.cancel")}
              onClick={closeModalResponders}
              size="middle"
              color="red"
              isTransparent
              fullWidth
            />
          </div>
        </div>
      </Modal>
    );
  }

  function renderAction() {
    if (isMyWork && props.author) {
      return (
        <button
          className="card-task__link_btn"
          onClick={(e) => openUserProfile(e, props.author.slug)}
        >
          {props.author.slug}
        </button>
      );
    }

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
    <article
      className={classNames(
        props.isOrder ? "card-task--order" : "card-task",
        props.className
      )}
    >
      <header className="card-task__header" onClick={goToItemOrder}>
        <h2 className="card-task__title">{props.title}</h2>
      </header>
      <div className="card-task__order_block">
        <div className="card-task__order-info">
          {props.type && props.type.length && (
            <span className="card-task__order-type">
              {props.type.join(", ")}
            </span>
          )}
          {props.type && props.category && (
            <span className="card-task__order-type line">|</span>
          )}
          {props.category && (
            <div className="card-task__order-categories" title={categories}>
              {categories}
            </div>
          )}
        </div>
        <div className="card-task__order-budget">
          <span className="card-task__order-budget_text">
            {t("budget.placeholder")}
          </span>
          <span className="card-task__order-budget_text">
            {props.budget
              ? t("budget.currency", { budget: props.budget })
              : t("budget.negotiated")}
          </span>
        </div>
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
            <span className="card-task--text">
              {isMyWork ? t("cardTask.customer") : t("cardTask.executor")}
            </span>
            {renderAction()}
            {renderModalResponders()}
          </div>
        )}
      </div>
      {props.executor && (
        <span className="card-task__action_chat" onClick={openChat}>
          {t("goToChat.title", {
            user: isMyWork ? t("goToChat.customer") : t("goToChat.executor"),
          })}
        </span>
      )}
    </article>
  );
}
