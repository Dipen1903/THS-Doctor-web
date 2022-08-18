import * as Yup from "yup";
// const FILE_SIZE = 5e8;
// const SUPPORTED_FORMATS = "image/jpeg image/png image/gif";

export const validateEmail = (email) => {
  return Yup.string().email().isValidSync(email);
};
export const validatePhone = (phone) => {
  return Yup.number()
    .integer()
    .positive()
    .test((phone) => {
      return phone && phone.toString().length === 10 ? true : false;
    })
    .isValidSync(phone);
};

export const SignInSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your mobile/email")
    .test("email", "Please enter valid mobile/email", (value) => {
      return validateEmail(value) || validatePhone(parseInt(value ?? "0"));
    }),
  password: Yup.string()
    .min(6, "Please enter minimum 6 letter")
    .required("Please enter your password"),
});
export const ForgotSchema = Yup.object({
  value: Yup.string()
    .required("Please enter your mobile/email")
    .test("email", "Please enter valid mobile/email", (value) => {
      return validateEmail(value) || validatePhone(parseInt(value ?? "0"));
    }),
});
export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])$/,
      "Password must contain minimum eight characters, both uppercase and lowercase letter and one number"
    )
    .required("Please enter your password"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password does not match."
  ),
});

export const SignUpSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  first_name: Yup.string()
    .max(32, "First name should be less than 32 characters")
    .required("Please enter your first name"),
  last_name: Yup.string()
    .max(32, "Last name should be less than 32 characters")
    .required("Please enter your last name"),
  mobile_number: Yup.string()
    .matches(
      /^([6-9]{1})([0-9]{1})([0-9]{8})$/,
      "Please enter valid mobile number"
    )
    .required("Please enter your mobile number"),
  password: Yup.string()
    .matches(
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be eight characters and contain uppercase, lowercase, number and speacial character."
    )
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
