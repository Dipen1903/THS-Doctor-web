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
  tempQualification: [],
  qualification: [],
  tempProof: [],
  proof: [],
  signature: "",
  registration_number: "",
  experience: "",
  languages: [],
};

export const ScheduleEnum = {
  weekdays: {
    days: [], //"monday","tuesday"
    time_period: {
      morning: {
        start_time: "",
        end_time: "",
      },
      afternoon: {
        start_time: "",
        end_time: "",
      },
      evening: {
        start_time: "",
        end_time: "",
      },
      night: {
        start_time: "",
        end_time: "",
      },
    },
  },
  weekends: {
    days: [], //"saturday","sunday"
    time_period: {
      morning: {
        start_time: "",
        end_time: "",
      },
      afternoon: {
        start_time: "",
        end_time: "",
      },
      evening: {
        start_time: "",
        end_time: "",
      },
      night: {
        start_time: "",
        end_time: "",
      },
    },
  },
  emergency_call: 1,
};

export const BankEnum = {
  account_holder_name: "",
  account_number: "",
  confirm_account_number: "",
  ifsc_code: "",
  upi_id: "",
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
