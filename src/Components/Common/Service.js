import { BASE_URL, POST } from "../../Utilities/HTTP";
//* AUTHENTICATE USER SESSION API REQUEST

//* NONAUTHENTICATED APIS
export const StateList = (data) => POST(`${BASE_URL}/state-list`, data);
