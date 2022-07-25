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
  step_one: {
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    month: "",
    day: "",
    year: "",
    country: "",
    state: "",
    city: "",
  },
  step_two: {
    image: "",
  },
  step_three: {
    linkedIn: "",
    instagram: "",
    twitter: "",
  },
  step_four: {
    current_job: { title: "", company_name: "" },
    past_jobs: [{ title: "", company_name: "" }],
  },
  step_five: [{ school_university: "", start_year: "", end_year: "" }],
  step_six: [
    { question_id: "What have you done?", answer: "" },
    { question_id: "What will you be doing in the future?", answer: "" },
    { question_id: "What hill are you 1000% willing to die on?", answer: "" },
    { question_id: "Come to me for - what are you good at?", answer: "" },
    { question_id: "What are you working on right now?", answer: "" },
  ],
  step_seven: {
    additionalQuestion: "In 10 words, what should the world know about you?",
    answer: "",
  },
};

export const EditProfileEnum = {
  email: "",
  first_name: "",
  last_name: "",
  username: "",
  country: "",
  state: "",
  city: "",
  linkedIn: "",
  instagram: "",
  twitter: "",
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
