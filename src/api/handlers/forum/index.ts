import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import http from "@/api/http";
import { convertDataToFormData } from "@/utils/formdata";

import {
  CreateComment,
  CreateDiscussion_Body,
  Discussion,
  FormDataUploadFile_Body,
  FormDataUploadFile_Success,
} from "./types";

export type ApiForumHandlers = {
  getDiscussions: () => Promise<Discussion[]>;
  createDiscussion: (
    data: CreateDiscussion_Body
  ) => Promise<CreateDiscussion_Body>;
  getDiscussion: (id: string) => Promise<Discussion>;
  createComment: (id: string, body: CreateComment) => Promise<CreateComment>;
  uploadFile: (
    data: FormDataUploadFile_Body
  ) => Promise<FormDataUploadFile_Success>;
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

  const uploadFile: ApiForumHandlers["uploadFile"] = async (data) => {
    return (
      await http.post(API.discussion.uploadFile, convertDataToFormData(data))
    ).data;
  };

  return {
    getDiscussions,
    createDiscussion,
    getDiscussion,
    createComment,
    uploadFile,
  };
}
