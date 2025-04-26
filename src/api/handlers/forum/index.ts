import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { PureResponse } from "@/api/types";

import { CreateComment, CreateDiscussion_Body, Discussion } from "./types";

export type ApiForumHandlers = {
  getDiscussions: () => PureResponse<Discussion[]>;
  createDiscussion: (
    data: CreateDiscussion_Body
  ) => PureResponse<CreateDiscussion_Body>;
  getDiscussion: (id: string) => PureResponse<Discussion>;
  createComment: (
    id: string,
    body: CreateComment
  ) => PureResponse<CreateComment>;
};

const API = ENDPOINTS_CONFIG.api;

export default function ApiForum(): ApiForumHandlers {
  const getDiscussions: ApiForumHandlers["getDiscussions"] = async () => {
    return (await http.get(API.discussion.list)).data;
  };

  const getDiscussion: ApiForumHandlers["getDiscussion"] = async (id) => {
    return (await http.get(API.discussion.item.replace(":itemId", id))).data;
  };

  const createDiscussion: ApiForumHandlers["createDiscussion"] = async (
    data
  ) => {
    return (await http.post(API.discussion.create, data)).data;
  };

  const createComment: ApiForumHandlers["createComment"] = async (id, data) => {
    return (
      await http.post(API.discussion.createComment.replace(":itemId", id), data)
    ).data;
  };

  return { getDiscussions, createDiscussion, getDiscussion, createComment };
}
