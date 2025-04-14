import {
  DetailUserProfile,
  Skill,
  BlackList,
  PortfolioItem_Response,
  CreateBlackList_RequestBody,
  CreateBlackList_Response,
  ChangePassword_RequestBody,
  RemovePortfolioItem_Response,
  RemoveUserBlackList_Response,
  UserPut_Response,
} from "./types";
import { ENDPOINTS_CONFIG } from "../../endpoints";
import http from "../../http";
import { PureResponse } from "../../types";

interface QueryHandlers {
  getMyProfile: () => Promise<DetailUserProfile>;
  getUserList: () => Promise<DetailUserProfile[]>;
  getBlackList: () => Promise<BlackList[]>;
  getSkills: () => Promise<Skill[]>;
  activateAccount: (uidb64: string, token: string) => Promise<unknown>;
  getUserProfile: (id: string) => Promise<DetailUserProfile>;
}

interface MutateHandlers {
  removeFilePortfolio: (
    idFile: number
  ) => PureResponse<RemovePortfolioItem_Response>;
  removeUserOfBlackList: (
    id: number
  ) => PureResponse<RemoveUserBlackList_Response>;
  editProfile: (data: FormData) => PureResponse<UserPut_Response>;
  addPortfolioItem: (data: FormData) => PureResponse<PortfolioItem_Response>;
  editFilePortfolio: (
    idFile: number,
    data: FormData
  ) => PureResponse<PortfolioItem_Response>;
  changePassword: (
    data: ChangePassword_RequestBody
  ) => PureResponse<UserPut_Response>;
  addToBlackList: (
    data: CreateBlackList_RequestBody
  ) => PureResponse<CreateBlackList_Response>;
}

export type ApiUserHandlers = QueryHandlers & MutateHandlers;

const API = ENDPOINTS_CONFIG.api;

export default function ApiUser(): ApiUserHandlers {
  const getUserList = async () => {
    return (await http.get(API.userList)).data;
  };

  const getUserProfile = async (slug: string) => {
    return (await http.get(API.userProfile + slug + "/")).data;
  };

  const getMyProfile = async () => {
    return (await http.get(API.profile)).data;
  };

  const activateAccount = async (uidb64: string, token: string) => {
    return (await http.get(API.activateAccount + uidb64 + "/" + token + "/"))
      .data;
  };

  const getBlackList = async () => {
    return (await http.get(API.blackList)).data;
  };

  const getSkills = async () => {
    return (await http.get(API.skills)).data;
  };

  const addPortfolioItem = async (data: FormData) => {
    return (
      await http.post(API.portfolio, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  };

  const addToBlackList = async (data: CreateBlackList_RequestBody) => {
    return (await http.post(API.addToBlackList, data)).data;
  };

  const changePassword = async (data: ChangePassword_RequestBody) => {
    return (await http.post(API.changePassword, data)).data;
  };

  const editFilePortfolio = async (idFile: number, data: FormData) => {
    return (
      await http.put(API.portfolio + idFile + "/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  };

  const editProfile = async (data: FormData) => {
    return (
      await http.put(API.profile, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  };

  const removeFilePortfolio = async (idFile: number) => {
    return (await http.delete(API.portfolio + idFile + "/")).data;
  };

  const removeUserOfBlackList = async (idUser: number) => {
    return (await http.delete(API.removeOfBlackList + idUser + "/")).data;
  };

  return {
    getUserList,
    getUserProfile,
    activateAccount,
    getBlackList,
    getMyProfile,
    getSkills,
    addPortfolioItem,
    addToBlackList,
    changePassword,
    editFilePortfolio,
    editProfile,
    removeFilePortfolio,
    removeUserOfBlackList,
  };
}
