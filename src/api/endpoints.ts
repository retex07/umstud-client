const baseUrl = process.env.REACT_APP_SERVER_URL;

export const ENDPOINTS_CONFIG = {
  api: {
    login: baseUrl + "/api/users/login/",
    register: baseUrl + "/api/users/register/",
    users: baseUrl + "/api/users/list/",
  },
};
