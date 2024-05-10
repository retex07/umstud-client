import cn from "classnames";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as ExitSvg } from "static/images/exit.svg";
import "./styles.scss";

interface Props {
  isOpen: boolean;
  isClosing?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  title?: string;
}

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  title,
  isClosing: prevClosing,
}) => {
  const modalRef = useRef(document.createElement("div"));
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root") || document.body;
    const el = modalRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      el.setAttribute("id", "modal");
      modalRoot.appendChild(el);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (modalRoot.contains(el)) {
        modalRoot.removeChild(el);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
    }, 300);
  };

  return isOpen
    ? createPortal(
        <>
          <div
            className={cn("modal-container", {
              "fade-out": prevClosing || isClosing,
            })}
          >
            <div
              className={cn("modal-card", {
                "slide-out": prevClosing || isClosing,
              })}
            >
              <div className="modal-card__wrapper">
                <div className="modal-card__header">
                  <h2 className="modal-card__title">{title}</h2>
                  <button className="modal-card__btn" onClick={handleClose}>
                    <ExitSvg />
                  </button>
                </div>
                {children}
              </div>
            </div>
            <div className="bg-closer" onClick={handleClose} />
          </div>
        </>,
        modalRef.current
      )
    : null;
};

export default Modal;
