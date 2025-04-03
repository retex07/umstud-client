import cn from "classnames";
import React from "react";

import Modal from "@/components/modal";

import Button from "../button";
import "./Confirm.scss";

interface Props {
  message: string;
  isOpen: boolean;
  isClosing: boolean;
  isQuestion?: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function ConfirmComponent(props: Props) {
  return (
    <Modal
      title="Подтверждение действия"
      isOpen={props.isOpen}
      isClosing={props.isClosing}
      onClose={props.handleCancel}
    >
      <p
        className={cn("confirm__msg", {
          question: props.isQuestion,
        })}
      >
        {props.message}
      </p>
      <div className="confirm__actions">
        <Button size="small" fullWidth onClick={props.handleCancel}>
          Отменить
        </Button>
        <Button
          size="small"
          fullWidth
          color="red"
          onClick={props.handleConfirm}
        >
          Удалить
        </Button>
      </div>
    </Modal>
  );
}
