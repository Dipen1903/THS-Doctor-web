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
export const MobileSignInSchema = Yup.object({
  mobile_number: Yup.string()
    .required("Please enter your mobile number")
    .test("mobile_number", "Please enter valid mobile number", (value) => {
      return validatePhone(parseInt(value ?? "0"));
    }),
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
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      "Password must be eight characters and contain uppercase, lowercase, number."
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
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      "Password must be eight characters and contain uppercase, lowercase, number."
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
export const PersonalProfileSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  first_name: Yup.string()
    .max(32, "First name should be less than 32 characters")
    .required("Please enter your first name"),
  last_name: Yup.string()
    .max(32, "Last name should be less than 32 characters")
    .required("Please enter your last name"),
  image: Yup.mixed().required("Please upload any image"),
  dob: Yup.string().required("Please enter your date of birth"),
  gender: Yup.string().required("Please select your gender").nullable(),
});
export const WorkProfileSettingSchema = Yup.object({
  city_id: Yup.string().required("Please select your city"),
  state_id: Yup.string().required("Please select your state"),
  speciality: Yup.string()
    .min(1, "Please select your speaciality")
    .required("Please select your speaciality")
    .nullable(),
  sub_speciality: Yup.string().notRequired(),
  experience: Yup.string()
    .matches(/^\d/)
    .required("Please enter your experience")
    .nullable(),
  // registration_number: Yup.string()
  //   .matches(
  //     /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,32}$/,
  //     "Please enter valid registration number"
  //   )
  //   .required("Please enter your registration number")
  //   .nullable(),
  languages: Yup.array()
    .of(Yup.string())
    .required("Please select any one language"),
  qualification: Yup.array()
    .of(Yup.object())
    .min(1, "Please select any qualification")
    .required("Please select any qualification")
    .nullable(),
  proof: Yup.array()
    .of(Yup.object())
    .required("Please select any proof")
    .nullable(),
});
export const BasicInformationSchema = Yup.object({
  image: Yup.mixed().required("Please upload any image"),
  dob: Yup.string().required("Please enter your date of birth"),
  gender: Yup.string().required("Please select your gender").nullable(),
  city_id: Yup.string().required("Please select your city"),
  state_id: Yup.string().required("Please select your state"),
});
export const WorkProfileSchema = Yup.object({
  speciality: Yup.string()
    .min(1, "Please select your speaciality")
    .required("Please select your speaciality")
    .nullable(),
  sub_speciality: Yup.string().notRequired(),
  experience: Yup.string()
    .matches(/^\d/)
    .required("Please enter your experience")
    .nullable(),
  // registration_number: Yup.string()
  //   .matches(
  //     /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,32}$/,
  //     "Please enter valid registration number"
  //   )
  //   .required("Please enter your registration number")
  //   .nullable(),
  languages: Yup.array()
    .of(Yup.string())
    .required("Please select any one language"),
});
export const EducationalProfileSchema = Yup.object({
  qualification: Yup.array()
    .of(Yup.object())
    .min(1, "Please select any qualification")
    .required("Please select any qualification")
    .nullable(),
  proof: Yup.array()
    .of(Yup.object())
    .required("Please select any proof")
    .nullable(),
  signature: Yup.mixed().required("Please upload signature").nullable(),
});

export const ChangePasswordSchema = Yup.object({
  new_password: Yup.string().required("Please enter your password"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("new_password"), null],
    "Password does not match."
  ),
});
export const ShareLinkSchema = Yup.object({
  link: Yup.string()
    .url("Please enter valid link.")
    .required("Please enter you link."),
  mobile_number: Yup.string()
    .required("Please enter your mobile number")
    .test("mobile_number", "Please enter valid mobile number", (value) => {
      return validatePhone(parseInt(value ?? "0"));
    }),
});
export const PhoneNumberSchema = Yup.object({
  mobile_number: Yup.string()
    .required("Please enter your mobile number")
    .test("mobile_number", "Please enter valid mobile number", (value) => {
      return validatePhone(parseInt(value ?? "0"));
    }),
  otp: Yup.string().required("Please enter your OTP."),
});
export const CancelConsultSchema = Yup.object({
  reason: Yup.string().required("Please provide any reason!"),
});

export const validateIFSC = (value) => {
  let errorMessage;
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(value)) {
    errorMessage = "Please enter valid IFSC code";
  }
  return errorMessage;
};
export const validateAcccountNumber = (value) => {
  let errorMessage;
  if (!/^\d{9,18}$/i.test(value)) {
    errorMessage = "Please enter valid account number";
  }
  return errorMessage;
};
export const validateConfirmAcccountNumber = (value) => {
  let errorMessage;
  // if (value !== values?.account_number) {
  //   errorMessage = "Account number not matched";
  // }
  return errorMessage;
};
