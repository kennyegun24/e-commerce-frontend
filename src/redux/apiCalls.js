// import axios from 'axios'

import { publicRequest } from "../allRequests";
import { loginStart, loginSuccess } from "./user/user"

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  const res = await publicRequest.post("user/login", user)
  const responseData = res.data;
  delete responseData.headers;
  dispatch(loginSuccess(responseData))
}

export const register = async (dispatch, user) => {
  dispatch(loginStart());
  const res = await publicRequest.post("users", user)
  const responseData = res.data;
  delete responseData.headers;
  dispatch(loginSuccess(responseData))
}