import { BASE_URL, POST } from "../Utilities/HTTP";

//* SIGNIN/SIGNUP API REQUEST
export const SignInAPI = (data) => POST(`${BASE_URL}/login`, data);
export const SignUp = (data) => POST(`${BASE_URL}/web/register`, data);
export const Forgot = (data) => POST(`${BASE_URL}/forgot-password`, data);
