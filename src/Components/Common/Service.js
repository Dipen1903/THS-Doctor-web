import { BASE_URL, POST } from "../../Utilities/HTTP";
//* AUTHENTICATE USER SESSION API REQUEST

//* NONAUTHENTICATED APIS
export const StateListAPI = (data) => POST(`${BASE_URL}/state-list`, data);
export const CityListAPI = (data) => POST(`${BASE_URL}/city-list`, data);
export const SpecialityListAPI = (data) => POST(`${BASE_URL}/speciality`, data);
export const SubSpecialityListAPI = (data) =>
  POST(`${BASE_URL}/sub-speciality`, data);
export const LanguageListAPI = (data) =>
  POST(`${BASE_URL}/language-list`, data);
