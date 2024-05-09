import { useContext } from "react";

import { Context } from "./confirm";

export const useConfirm = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
};
