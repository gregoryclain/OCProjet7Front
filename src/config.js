/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
// fichier a importer aux component
export const getHeader = function() {
  const tokenData = JSON.parse(window.localStorage.getItem("authUser"));
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer" + tokenData.access_token
  };
  return headers;
};
