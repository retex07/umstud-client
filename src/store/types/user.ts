import { DetailUserProfile } from "@/api/user/types";

type ActivationAccount = {
  isInitialized: boolean;
  isError: boolean;
  isLoading: boolean;
};

export type UserState = {
  user: DetailUserProfile | null;
  activation: ActivationAccount;
  isLoading: boolean;
  isLoadingChats: boolean;
};
