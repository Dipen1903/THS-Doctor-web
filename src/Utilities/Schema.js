import * as Yup from "yup";
const FILE_SIZE = 5e8;
const SUPPORTED_FORMATS = "image/jpeg image/png image/gif";

export const SignInSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Please enter minimum 6 letter")
    .required("Please enter your password"),
});
