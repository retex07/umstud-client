import React, { ReactNode, useRef, useState } from "react";

import ConfirmComponent from "@/components/confirm";

import { Context } from "./confirm";

interface ProviderProps {
  children: ReactNode;
}

export const ConfirmProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isQuestion, setIsQuestion] = useState(false);
  const [message, setMessage] = useState("");
  const resolvePromiseRef = useRef<
    (value: boolean | PromiseLike<boolean>) => void
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  >(null!);

  const requestConfirm = (
    message: string,
    isQuestion?: boolean
  ): Promise<boolean> => {
    setMessage(message);
    setIsOpen(true);

    if (isQuestion) {
      setIsQuestion(true);
    }

    return new Promise<boolean>((resolve) => {
      resolvePromiseRef.current = resolve;
    });
  };

  const handleConfirm = () => {
    resolvePromiseRef.current(true);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 300);
  };

  const handleCancel = () => {
    resolvePromiseRef.current(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 300);
  };

  return (
    <Context.Provider value={{ requestConfirm }}>
      {children}
      {isOpen && (
        <ConfirmComponent
          isQuestion={isQuestion}
          isOpen={isOpen}
          isClosing={isClosing}
          message={message}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      )}
    </Context.Provider>
  );
};
