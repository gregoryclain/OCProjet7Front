/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
const URL_API = process.env.VUE_APP_URL;
// const URL_API = "http://serveur:3000/";
export const api = {
  // routes user
  USERS_SIGNUP: URL_API + "api/users/signup",
  USERS_LOGIN: URL_API + "api/users/login",

  // routes message
  MESSAGE_CREATE: URL_API + "api/messages/new",
  MESSAGE_LIST: URL_API + "api/messages/list",
  MESSAGE_RESPONSES: URL_API + "api/messages/responses/",
  MESSAGE_GET_ONE: URL_API + "api/messages/"
};
