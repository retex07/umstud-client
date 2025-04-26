import { UseFormSetError } from "react-hook-form/dist/types/form";
import { createAction } from "redux-actions";

import {
  CreateComment,
  CreateDiscussion_Body,
  Discussion,
} from "@/api/handlers/forum/types";

const prefix = "app/";

export const getDiscussionList = createAction<void>(
  prefix + "GET_DISCUSSION_LIST"
);

export const setDiscussionList = createAction<Discussion[]>(
  prefix + "SET_DISCUSSION_LIST"
);

export const getDiscussion = createAction<string>(prefix + "GET_DISCUSSION");
export const setDiscussion = createAction<Discussion>(
  prefix + "SET_DISCUSSION"
);

export const sendAnswer = createAction<{
  discussionId: string;
  body: CreateComment;
}>(prefix + "SEND_ANSWER");

export const createDiscussion = createAction<{
  body: CreateDiscussion_Body;
  setError: UseFormSetError<CreateDiscussion_Body>;
}>(prefix + "CREATE_DISCUSSION");

export const setIsLoading = createAction<boolean>(prefix + "SET_IS_LOADING");
