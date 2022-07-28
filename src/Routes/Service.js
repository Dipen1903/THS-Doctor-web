import { BASE_URL, POST } from "../Utilities/HTTP";

//* SIGNIN API REQUEST
export const SignInAPI = (data) => POST(`${BASE_URL}/login`, data);
export const OTPSignInAPI = (data) => POST(`${BASE_URL}/login-mobile`, data);
export const OTPResendSignInAPI = (data) =>
  POST(`${BASE_URL}/resend-otp`, data);
export const OTPVerifySignInAPI = (data) =>
  POST(`${BASE_URL}/verify-otp`, data);

//* SIGNUP API REQUEST
export const SignUpAPI = (data) => POST(`${BASE_URL}/doctor-register`, data);
export const OTPResendSignUpAPI = (data) =>
  POST(`${BASE_URL}/doctor-resend-otp`, data);
export const OTPVerifySignUpAPI = (data) =>
  POST(`${BASE_URL}/doctor-verify-otp`, data);
export const Forgot = (data) => POST(`${BASE_URL}/forgot-password`, data);

//* PROFILE API REQUEST
export const GetUserProfileAPI = (data) =>
  POST(`${BASE_URL}/profile-details`, data);
export const EditUserProfileAPI = (data) =>
  POST(`${BASE_URL}/edit-profile`, data);
