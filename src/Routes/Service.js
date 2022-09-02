import PrivacyPolicy from "../Components/Private/Privacy/Privacy";
import { BASE_URL, POST } from "../Utilities/HTTP";

//* SIGNIN API REQUEST
export const SignInAPI = (data) => POST(`${BASE_URL}/login`, data);
export const MobileSignInAPI = (data) => POST(`${BASE_URL}/login-mobile`, data);
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

//* FORGOT/RESET PASSWORD API REQUEST
export const ForgotPasswordAPI = (data) =>
  POST(`${BASE_URL}/forgot-password`, data);
export const ResetPasswordAPI = (data) =>
  POST(`${BASE_URL}/reset-password`, data);
export const OTPResendForgotAPI = (data) =>
  POST(`${BASE_URL}/forgot-password-resend-otp`, data);
export const OTPVerifyForgotAPI = (data) =>
  POST(`${BASE_URL}/check-forgot-password-otp`, data);

//* PROFILE API REQUEST
export const GetUserProfileAPI = (data) =>
  POST(`${BASE_URL}/profile-details`, data);
export const ToggleLiveStatusAPI = (data) =>
  POST(`${BASE_URL}/online-offline-update`, data);
export const EditUserProfileAPI = (data) =>
  POST(`${BASE_URL}/edit-profile`, data);
export const RejectionDetailsAPI = (data) =>
  POST(`${BASE_URL}/rejection-details`, data);

//* BANK-DETAILS/SCHEDULE API REQUEST
export const EditBankAPI = (data) =>
  POST(`${BASE_URL}/bank-account-create`, data);
export const EditScheduleAPI = (data) =>
  POST(`${BASE_URL}/availibility-create`, data);

export const ChangePasswordAPI = (data) =>
  POST(`${BASE_URL}/change-password`, data);

// ...Privacy & PrivacyPolicy....
export const PrivacyAndPolicyAPI = () => POST(`${BASE_URL}/privacy-policy`);

// ...Terms&Conditions..........
export const TermsAndConditionsAPI = () =>
  POST(`${BASE_URL}/term-and-condition`);

// ...Helps & Supports..........
export const HelpsAndSupportsAPI = () => POST(`${BASE_URL}/faqs`);

// Change Mobile number in Setting...

export const SendOTPOnCurrentMobileNumberAPI = (data) =>
  POST(`${BASE_URL}/send-otp-old-mobile-number`, data);

export const VerifyOTPOnCurrentMobileNumberAPI = (data) =>
  POST(`${BASE_URL}/verify-otp-old-mobile-number`, data);

export const SendOTPOnNewMobileNumberAPI = (data) =>
  POST(`${BASE_URL}/send-otp-new-mobile-number`, data);

export const VerifyOTPOnNewMobileNumberAPI = (data) =>
  POST(`${BASE_URL}/verify-otp-new-mobile-number`, data);

// ...Get Time Slot..........
export const TimeSlotAPI = () => POST(`${BASE_URL}/profile-details`);

//......Edit Time Slot............
export const AvailibilityCreateAPI = (data) =>
  POST(`${BASE_URL}/availibility-create`, data);
//* CHANGE-MOBILENUMBER API REQUEST
export const ChangeMobileNumberAPI = (data) =>
  POST(`${BASE_URL}/verify-change-mobile-number`, data);

//* CONSULTATION API REQUESTS
export const NewConsultAPI = (data) =>
  POST(`${BASE_URL}/consultation-upcoming`, data);
export const PastConsultAPI = (data) =>
  POST(`${BASE_URL}/consultation-past`, data);
