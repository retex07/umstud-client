import { createContext } from "react";

interface ConfirmContextType {
  requestConfirm: (message: string, isQuestion?: boolean) => Promise<boolean>;
}

export const Context = createContext<ConfirmContextType | undefined>(undefined);
