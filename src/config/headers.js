export const getHeader = function() {
  const tokenData = JSON.parse(window.localStorage.getItem("authUser"));
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + tokenData.token
    // Authorization: "Bearer " + tokenData.token
  };
  return headers;
};
