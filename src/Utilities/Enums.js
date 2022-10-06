export const SESSION = "USER";
export const TOKEN = "TOKEN";
export const MEDKART_TOKEN = "MEDKART_TOKEN";
export const MK_CLIENT = process.env.REACT_APP_MEDKART_CLIENT;
export const MK_APPID = process.env.REACT_APP_MEDKART_APP_ID;
export const MK_SECRET = process.env.REACT_APP_MEDKART_APP_SECRET;

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
  proof: "",
  signature: "",
  registration_number: "",
  experience: "",
  languages: [],
};

export const ScheduleEnum = {
  weekdays: {
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"], //"monday","tuesday"
    time_period: {
      morning: {
        start_time: "",
        end_time: "",
        slots: [
          { label: "None", value: "" },
          { label: "09:00 AM", value: "09:00 AM" },
          { label: "09:15 AM", value: "09:15 AM" },
          { label: "09:30 AM", value: "09:30 AM" },
          { label: "09:45 AM", value: "09:45 AM" },
          { label: "10:00 AM", value: "10:00 AM" },
          { label: "10:15 AM", value: "10:15 AM" },
          { label: "10:30 AM", value: "10:30 AM" },
          { label: "10:45 AM", value: "10:45 AM" },
          { label: "11:00 AM", value: "11:00 AM" },
          { label: "11:15 AM", value: "11:15 AM" },
          { label: "11:30 AM", value: "11:30 AM" },
          { label: "11:45 AM", value: "11:45 AM" },
          { label: "12:00 PM", value: "12:00 PM" },
        ],
      },
      afternoon: {
        start_time: "",
        end_time: "",
        slots: [
          { label: "None", value: "" },
          { label: "12:00 PM", value: "12:00 PM" },
          { label: "12:15 PM", value: "12:15 PM" },
          { label: "12:30 PM", value: "12:30 PM" },
          { label: "12:45 PM", value: "12:45 PM" },
          { label: "01:00 PM", value: "01:00 PM" },
          { label: "01:15 PM", value: "01:15 PM" },
          { label: "01:30 PM", value: "01:30 PM" },
          { label: "01:45 PM", value: "01:45 PM" },
          { label: "02:00 PM", value: "02:00 PM" },
          { label: "02:15 PM", value: "02:15 PM" },
          { label: "02:30 PM", value: "02:30 PM" },
          { label: "02:45 PM", value: "02:45 PM" },
          { label: "03:00 PM", value: "03:00 PM" },
        ],
      },
      evening: {
        start_time: "",
        end_time: "",
        slots: [
          { label: "None", value: "" },
          { label: "03:00 PM", value: "03:00 PM" },
          { label: "03:15 PM", value: "03:15 PM" },
          { label: "03:30 PM", value: "03:30 PM" },
          { label: "03:45 PM", value: "03:45 PM" },
          { label: "04:00 PM", value: "04:00 PM" },
          { label: "04:15 PM", value: "04:15 PM" },
          { label: "04:30 PM", value: "04:30 PM" },
          { label: "04:45 PM", value: "04:45 PM" },
          { label: "05:00 PM", value: "05:00 PM" },
          { label: "05:15 PM", value: "05:15 PM" },
          { label: "05:30 PM", value: "05:30 PM" },
          { label: "05:45 PM", value: "05:45 PM" },
          { label: "06:00 PM", value: "06:00 PM" },
        ],
      },
      night: {
        start_time: "",
        end_time: "",
        slots: [
          { label: "None", value: "" },
          { label: "06:00 PM", value: "06:00 PM" },
          { label: "06:15 PM", value: "06:15 PM" },
          { label: "06:30 PM", value: "06:30 PM" },
          { label: "06:45 PM", value: "06:45 PM" },
          { label: "07:00 PM", value: "07:00 PM" },
          { label: "07:15 PM", value: "07:15 PM" },
          { label: "07:30 PM", value: "07:30 PM" },
          { label: "07:45 PM", value: "07:45 PM" },
          { label: "08:00 PM", value: "08:00 PM" },
        ],
      },
    },
  },
  weekends: {
    days: ["saturday", "sunday"], //"saturday","sunday"
    time_period: {
      morning: {
        start_time: "",
        end_time: "",
        slots: [
          { label: "None", value: "" },
          { label: "09:00 AM", value: "09:00 AM" },
          { label: "09:15 AM", value: "09:15 AM" },
          { label: "09:30 AM", value: "09:30 AM" },
          { label: "09:45 AM", value: "09:45 AM" },
          { label: "10:00 AM", value: "10:00 AM" },
          { label: "10:15 AM", value: "10:15 AM" },
          { label: "10:30 AM", value: "10:30 AM" },
          { label: "10:45 AM", value: "10:45 AM" },
          { label: "11:00 AM", value: "11:00 AM" },
          { label: "11:15 AM", value: "11:15 AM" },
          { label: "11:30 AM", value: "11:30 AM" },
          { label: "11:45 AM", value: "11:45 AM" },
          { label: "12:00 PM", value: "12:00 PM" },
        ],
      },
      afternoon: {
        start_time: "",
        end_time: "",
        slots: [
          { label: "None", value: "" },
          { label: "12:00 PM", value: "12:00 PM" },
          { label: "12:15 PM", value: "12:15 PM" },
          { label: "12:30 PM", value: "12:30 PM" },
          { label: "12:45 PM", value: "12:45 PM" },
          { label: "01:00 PM", value: "01:00 PM" },
          { label: "01:15 PM", value: "01:15 PM" },
          { label: "01:30 PM", value: "01:30 PM" },
          { label: "01:45 PM", value: "01:45 PM" },
          { label: "02:00 PM", value: "02:00 PM" },
          { label: "02:15 PM", value: "02:15 PM" },
          { label: "02:30 PM", value: "02:30 PM" },
          { label: "02:45 PM", value: "02:45 PM" },
          { label: "03:00 PM", value: "03:00 PM" },
        ],
      },
      evening: {
        start_time: "",
        end_time: "",
        slots: [
          { label: "None", value: "" },
          { label: "03:00 PM", value: "03:00 PM" },
          { label: "03:15 PM", value: "03:15 PM" },
          { label: "03:30 PM", value: "03:30 PM" },
          { label: "03:45 PM", value: "03:45 PM" },
          { label: "04:00 PM", value: "04:00 PM" },
          { label: "04:15 PM", value: "04:15 PM" },
          { label: "04:30 PM", value: "04:30 PM" },
          { label: "04:45 PM", value: "04:45 PM" },
          { label: "05:00 PM", value: "05:00 PM" },
          { label: "05:15 PM", value: "05:15 PM" },
          { label: "05:30 PM", value: "05:30 PM" },
          { label: "05:45 PM", value: "05:45 PM" },
          { label: "06:00 PM", value: "06:00 PM" },
        ],
      },
      night: {
        start_time: "",
        end_time: "",
        slots: [
          { label: "None", value: "" },
          { label: "06:00 PM", value: "06:00 PM" },
          { label: "06:15 PM", value: "06:15 PM" },
          { label: "06:30 PM", value: "06:30 PM" },
          { label: "06:45 PM", value: "06:45 PM" },
          { label: "07:00 PM", value: "07:00 PM" },
          { label: "07:15 PM", value: "07:15 PM" },
          { label: "07:30 PM", value: "07:30 PM" },
          { label: "07:45 PM", value: "07:45 PM" },
          { label: "08:00 PM", value: "08:00 PM" },
        ],
      },
    },
  },
  emergency_call: false,
};

export const RejectedProfileEnum = {
  registration_number: "",
  account_holder_name: "",
  account_number: "",
  confirm_account_number: "",
  ifsc_code: "",
  qualification: "",
  proof: "",
  signature: "",
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
export const MonthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
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

export const PrescriptionEnum = {
  booking_id: "",
  user_id: "",
  medicines: [
    // {
    //   medicine_name: "",
    //   medicine_id: "",
    //   morning: "",
    //   afternoon: "",
    //   evening: "",
    //   night: "",
    //   conditions: "",
    //   days: "",
    // },
  ],
  lab_test: [
    // {
    //   test_id: "",
    //   test_name: "",
    //   notes: "",
    // },
  ],
  refer_speciality: [],
  doctor_notes: {
    chef_complaints: "",
    diagnosis: "",
    medical_history: "",
    instruction: "",
    follow_up_days: "",
  },
  tempSpeciality: [],
};

export const MessageEnum = {
  dateTime: "",
  documentType: 0,
  extension: null,
  imageName: null,
  imageUrl: null,
  message: "",
  sizeOfDocument: "",
  userType: 0,
};

export const ChatRoomEnum = {
  callingType: "",
  doctorCallingId: "",
  doctorOnlineLastTime: "",
  doctorOnlineStatus: "",
  isCallingStatus: "",
  lastBookingId: "",
  lastMessage: "",
  lastMessageTime: "",
  lastMessageType: "",
  unreadMessageOfDoctor: "",
  unreadMessageOfUser: "",
  userCallingId: "",
  userId: "",
  userName: "",
  userOnlineLastTime: "",
  userOnlineStatus: "",
};
