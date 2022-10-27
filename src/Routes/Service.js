import { RP_ID, RP_SECRET } from "../Utilities/Enums";
import { BASE_URL, POST, RP_URL } from "../Utilities/HTTP";
const token = `${RP_ID}:${RP_SECRET}`;
const encodedToken = window.btoa(token);
let config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${encodedToken}`,
  },
};
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

//* DASHBOARD ANALYTICS API REQUEST
export const AnalyticsAPI = (data) =>
  POST(`${BASE_URL}/dashboard-analytics`, data);
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
export const ReverifyUserProfileAPI = (data) =>
  POST(`${BASE_URL}/re-upload-details`, data);
export const RejectionDetailsAPI = (data) =>
  POST(`${BASE_URL}/rejection-details`, data);
export const ChangePasswordAPI = (data) =>
  POST(`${BASE_URL}/change-password`, data);
export const ShareLinkAPI = (data) => POST(`${BASE_URL}/share-link`, data);

//* BANK-DETAILS/SCHEDULE API REQUEST
export const EditBankAPI = (data) =>
  POST(`${BASE_URL}/bank-account-create`, data);
export const EditScheduleAPI = (data) =>
  POST(`${BASE_URL}/availibility-create`, data);
export const ValidateBankAccountAPI = (data) =>
  POST(`${BASE_URL}/validate-bank-account`, data);

//* MOBILE NUMBER API REQUEST
export const OTPCurrentAPI = (data) =>
  POST(`${BASE_URL}/send-otp-old-mobile-number`, data);
export const VerifyOTPCurrentAPI = (data) =>
  POST(`${BASE_URL}/verify-otp-old-mobile-number`, data);
export const OTPNewAPI = (data) =>
  POST(`${BASE_URL}/send-otp-new-mobile-number`, data);
export const VerifyOTPNewAPI = (data) =>
  POST(`${BASE_URL}/verify-otp-new-mobile-number`, data);

//* CONSULTATION API REQUESTS
export const NewConsultAPI = (data) =>
  POST(`${BASE_URL}/consultation-upcoming`, data);
export const PastConsultAPI = (data) =>
  POST(`${BASE_URL}/consultation-past`, data);
export const ConsultDetailsAPI = (data) =>
  POST(`${BASE_URL}/consultation-details`, data);
export const CompleteConsultAPI = (data) =>
  POST(`${BASE_URL}/complete-appointment`, data);
export const CancelConsultAPI = (data) =>
  POST(`${BASE_URL}/consultation-cancel`, data);
export const CancelAllConsultAPI = (data) =>
  POST(`${BASE_URL}/consultation-cancel-all`, data);
export const DelayConsultAPI = (data) =>
  POST(`${BASE_URL}/delay-appointment`, data);
export const CancelReasonsAPI = (data) =>
  POST(`${BASE_URL}/cancelation-reason`, data);

//* PRESCRIPTION API REQUESTS
export const CreatePrescAPI = (data) =>
  POST(`${BASE_URL}/create-prescription`, data);
export const PrescDetailsAPI = (data) =>
  POST(`${BASE_URL}/prescription-details`, data);

//* PAYOUTS API REQUESTS
export const PayoutsAPI = (data) => POST(`${BASE_URL}/payouts-recent`, data);
export const PayoutDetailsAPI = (data) =>
  POST(`${BASE_URL}/payouts-details`, data);
export const RequestWithdrawAPI = (data) =>
  POST(`${BASE_URL}/payouts-send-request`, data);
