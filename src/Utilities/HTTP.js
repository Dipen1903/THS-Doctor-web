import axios from "axios";
import { MK_TOKEN, SESSION } from "./Enums";
import { JSONToFormData } from "./Functions";
const USER = process.env.REACT_APP_VENDOR || process.env.REACT_APP_MANAGER;
async function processFormData(data) {
  try {
    var form_data = new FormData();
    for (var key in data) {
      form_data.append(key, data[key]);
    }
    return form_data;
  } catch (error) {
    return error;
  }
}
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const MEDKART_URL = process.env.REACT_APP_MEDKART_BASE_URL;
export const RP_URL = process.env.REACT_APP_RP_BASE_URL;

let SessionData;

export async function POST(url, data, customConfig) {
  let formData = [];
  try {
    if (data?.deepIntegrate) {
      formData = await JSONToFormData(data);
    } else {
      formData = data;
    }
    SessionData = JSON.parse(localStorage.getItem(SESSION));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${SessionData?.token}`,
      },
    };
    return await axios
      .post(url, formData, customConfig || config)
      .then((result) => {
        if (
          (result?.data?.status_code && result?.data?.status_code !== 200) ||
          (result.data.status && result.data.status !== "SUCCESS")
        ) {
          // eslint-disable-next-line
          throw { hasError: true, message: result.data.message };
        } else {
          return result.data;
        }
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
}

export async function UPLOAD(url, data, onUploadProgress) {
  try {
    let formData = [];
    if (data) {
      formData = await JSONToFormData(data);
    }

    return await axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${SessionData?.token}`,
        },
        onUploadProgress,
      })
      .then((result) => {
        if (result && result.data && result.data.status_code !== 200) {
          // eslint-disable-next-line
          throw { hasError: true, message: result?.data?.message };
        } else {
          return result.data;
        }
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
}

export async function GET(url, data) {
  try {
    let config = {
      params: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(MK_TOKEN)}`,
      },
    };
    return await axios
      .get(url, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    return error;
  }
}
