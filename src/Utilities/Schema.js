import * as Yup from "yup";
const FILE_SIZE = 5e8;
const SUPPORTED_FORMATS = "image/jpeg image/png image/gif";

export const SignInSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your mobile/email"),
  password: Yup.string()
    .min(6, "Please enter minimum 6 letter")
    .required("Please enter your password"),
});

export const SignUpSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  first_name: Yup.string().required("Please enter your first name"),
  last_name: Yup.string().required("Please enter your last name"),
  mobile_number: Yup.string().required("Please enter your mobile number"),
  password: Yup.string()
    .min(6, "Please enter minimum 6 letter")
    .required("Please enter your password"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password does not match."
  ),
});
export const OTPSchema = Yup.object({
  otp: Yup.string()
    .min(4, "Please enter valid OTP")
    .max(4, "Please enter valid OTP")
    .required("Please enter your OTP"),
});
