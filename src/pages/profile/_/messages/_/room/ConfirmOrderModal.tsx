import classNames from "classnames";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { ChatRoom } from "@/api/handlers/chat/types";
import Button from "@/components/button";
import Modal from "@/components/modal";
import Textarea from "@/components/textarea";
import { ReactComponent as FillStarSvg } from "@/static/images/fill-star.svg";
import { ReactComponent as HollowStarSvg } from "@/static/images/hollow-star.svg";
import { requestConfirmOrderReady } from "@/store/actions/order";
import "../../MessageProfilePage.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  isLoading?: boolean;
  chatRoomId?: ChatRoom["id"];
}

export default function ConfirmOrderModal({
  isOpen,
  onClose,
  orderId,
  isLoading,
  chatRoomId,
}: Props) {
  const [countStars, setCountStars] = useState(0);
  const [countHoverStars, setCountHoverStars] = useState(0);
  const [isErrorCountStars, setIsErrorCountStars] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const dispatch = useDispatch();

  const { t } = useTranslation("p_profile", {
    keyPrefix: "messages.room.confirmOrder",
  });

  function changeCommentValue(e: ChangeEvent<HTMLTextAreaElement>) {
    setCommentValue(e.target.value);
  }

  function handleSubmit() {
    if (!countStars || countStars > 5) {
      setIsErrorCountStars(true);
      return;
    }

    dispatch(
      requestConfirmOrderReady({
        orderId,
        data: { count: countStars, message: commentValue },
        callback: onClose,
        chatRoomId: chatRoomId?.toString(),
      })
    );
  }

  function renderStars() {
    return (
      <div
        className="umstud-confirm-order-modal__form-stars-wrapper"
        onMouseLeave={() => setCountHoverStars(0)}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const isFilled = i < (countHoverStars || countStars);
          return (
            <div
              className={classNames("blue-star pointer", { fill: isFilled })}
              key={i}
              onMouseEnter={() => setCountHoverStars(i + 1)}
              onClick={() => {
                setCountStars(i + 1);
                setIsErrorCountStars(false);
              }}
            >
              {isFilled ? <FillStarSvg /> : <HollowStarSvg />}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <div className="umstud-confirm-order-modal">
        <div className="umstud-confirm-order-modal__form">
          <div className="umstud-confirm-order-modal__form-stars">
            <label className="umstud-confirm-order-modal__form-stars_label">
              {t("score")}
            </label>
            {renderStars()}
            {isErrorCountStars && (
              <label className="umstud-confirm-order-modal__form-stars__label-warning">
                {t("require")}
              </label>
            )}
          </div>
          <Textarea
            value={commentValue}
            onChange={changeCommentValue}
            name="comment"
            label={t("comment.label")}
            placeholder={t("comment.placeholder")}
          />
        </div>
        <div className="umstud-confirm-order-modal__actions">
          <Button
            fullWidth
            label={t("actions.cancel")}
            color="red"
            isTransparent
            onClick={onClose}
          />
          <Button
            label={t("actions.submit")}
            isLoading={isLoading}
            onClick={handleSubmit}
            fullWidth
          />
        </div>
      </div>
    </Modal>
  );
}
