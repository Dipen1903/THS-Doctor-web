export const SESSION = "USER";
export const TOKEN = "TOKEN";
export const COMMUNITYLINK = process.env.REACT_APP_CURRENT_COMMUNITY_ADDRESS;
export const AlertEnum = {
  Success: "SUCCESS",
  Error: "ERROR",
  Info: "INFO",
  Warning: "WARNING",
};
export const SignInEnum = { email: "", password: "" };
export const SignUpEnum = {
  email: "",
  first_name: "",
  last_name: "",
  mobile_number: "",
  password: "",
  confirm_password: "",
};

export const ProfileEnum = {
  first_name: "",
  last_name: "",
  email: "",
  //first step
  dob: "",
  age: "",
  gender: "",
  city_id: "",
  state_id: "",
  image: "",
  //second step
  speciality: "",
  sub_speciality: "",
  registration_number: "",
  experience: "",
  languages: [],
};
export const BankEnum = {
  bank_name: "",
  account_name: "",
  account_number: "",
  routing_number: "",
  bank_address: "",
  save_as: "",
};
export const VideoPostEnum = {
  embeded_code: "",
  title: "",
  description: "",
  topic: "",
  language: "",
  tags: [],
  speakers: [],
};
export const Months = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

export const EventEnum = {
  poster: "",
  title: "",
  start_date: "",
  start_time: "",
  venue: "",
  address: "",
  details: "",
  latitude: "",
  longitude: "",
  country_id: "",
  state_id: "",
  city_id: "",
  speakers: [],
  hosts: [],
  admission_type: "ticket_price",
  admission_data: [
    { price: "", invitees: [], category: "premium", benifits: [""] },
  ],
  isEndTime: false,
  end_date: "",
  end_time: "",
};
