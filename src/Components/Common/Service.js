import { BASE_URL, POST } from "../../Utilities/HTTP";
//* AUTHENTICATE USER SESSION API REQUEST
export const VerifySessionAPI = (data) =>
  POST(`${BASE_URL}/check-auth-token`, data);
export const UploadFileAPI = (data) =>
  POST(`${BASE_URL}/chat-document-upload`, data);
export const GetAgoraToken = (data) =>
  POST(`${BASE_URL}/get-agora-token`, data);

//* NONAUTHENTICATED APIS
export const StateListAPI = (data) => POST(`${BASE_URL}/state-list`, data);
export const CityListAPI = (data) => POST(`${BASE_URL}/city-list`, data);
export const SpecialityListAPI = (data) => POST(`${BASE_URL}/speciality`, data);
export const SubSpecialityListAPI = (data) =>
  POST(`${BASE_URL}/sub-speciality`, data);
export const LanguageListAPI = (data) =>
  POST(`${BASE_URL}/language-list`, data);
export const QualificationListAPI = (data) =>
  POST(`${BASE_URL}/qualification-list`, data);
export const DocumentListAPI = (data) =>
  POST(`${BASE_URL}/document-list`, data);
export const PrivacyAndPolicyAPI = () => POST(`${BASE_URL}/privacy-policy`);
export const TermsAndConditionsAPI = () =>
  POST(`${BASE_URL}/term-and-condition`);
export const HelpsAndSupportsAPI = () => POST(`${BASE_URL}/faqs`);
