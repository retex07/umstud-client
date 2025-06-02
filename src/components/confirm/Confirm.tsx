import cn from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("c_confirm");

  return (
    <Modal
      title={t("title")}
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
        <Button
          size="small"
          isTransparent
          fullWidth
          onClick={props.handleCancel}
        >
          {t("cancel")}
        </Button>
        <Button size="small" fullWidth onClick={props.handleConfirm}>
          {t("submit")}
        </Button>
      </div>
    </Modal>
  );
}
