import { BASE_URL, POST } from "../Utilities/HTTP";

//* SIGNIN/SIGNUP API REQUEST
export const SignInAPI = (data) => POST(`${BASE_URL}/login`, data);
export const OTPSignInAPI = (data) => POST(`${BASE_URL}/login-mobile`, data);
export const SignUpAPI = (data) => POST(`${BASE_URL}/doctor-register`, data);
export const OTPResendSignUpAPI = (data) =>
  POST(`${BASE_URL}/doctor-resend-otp`, data);
export const OTPVerifySignUpAPI = (data) =>
  POST(`${BASE_URL}/doctor-verify-otp`, data);
export const Forgot = (data) => POST(`${BASE_URL}/forgot-password`, data);
