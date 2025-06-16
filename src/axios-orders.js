import axios from "axios";

export const prefixURL = "https://identitytoolkit.googleapis.com/v1/accounts";

export const instance = axios.create({
  baseURL: "https://burger-builder-46554.firebaseio.com",
});

export default instance;
