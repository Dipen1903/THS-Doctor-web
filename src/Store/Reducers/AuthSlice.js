import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetMedKartTokenAPI,
  VerifySessionAPI,
} from "../../Components/Common/Service";
import {
  DeleteAccountAPI,
  ForgotPasswordAPI,
  MobileSignInAPI,
  OTPResendForgotAPI,
  OTPResendSignInAPI,
  OTPSignInAPI,
  OTPVerifyForgotAPI,
  OTPVerifySignInAPI,
  ResetPasswordAPI,
  SignInAPI,
} from "../../Routes/Service";
import {
  AlertEnum,
  MK_TOKEN,
  MK_APPID,
  MK_CLIENT,
  MK_SECRET,
  SESSION,
  TOKEN,
  AGORA,
} from "../../Utilities/Enums";
import { GetFirbaseToken } from "../../Utilities/Firebase.config";
import { setLoading, setMessage } from "./LayoutSlice";
import { GetUserProfile } from "./ProfileReducer";
import { useEffect } from "react";

const initialState = {
  token: localStorage.getItem(TOKEN),
  medkart_token: localStorage.getItem(MK_TOKEN),
  session: JSON.parse(localStorage.getItem(SESSION) || "{}") || "",
  otpModal: false,
  forgotModal: false,
  verifyForgot: false,
  resetModal: false,
  successModal: false,
};
export const SignIn = createAsyncThunk(
  "SignIn",
  async (values, { dispatch }) => {
    const fcmToken = await GetFirbaseToken();
    // console.log("fcmToken1111111111111111111111111111111111111111111111111111111111111",fcmToken);
  
    try {
      dispatch(setLoading(true));
      if (fcmToken) {
        values["device_token"] = fcmToken;
      }
      const result = await SignInAPI(values);
      // console.log("result",result);
      if (result?.success) {
        dispatch(setLoading(false));
        dispatch(setSession(result?.data));
        await dispatch(GetUserProfile());
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const MobileSignIn = createAsyncThunk(
  "MobileSignIn",
  async (values, { dispatch }) => {
    // const fcmToken = await GetFirbaseToken();
    // console.log("fcmTokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",fcmToken);
    // if (fcmToken) {
    //   values["device_token"] = fcmToken;
    // }
    try {
      dispatch(setLoading(true));
      // const fcmToken = await GetFirbaseToken();
      // console.log("fcmToken??????????????????????????????????",fcmToken);
      // if (fcmToken) {
      //   values["device_token"] = fcmToken;
      // }
      const result = await MobileSignInAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const OTPSignIn = createAsyncThunk(
  "SignIn",
  async (values, { dispatch }) => {
    const fcmToken = await GetFirbaseToken();
    // console.log("fcmToke222222222222222222222222222",fcmToken);
    if (fcmToken) {
      values["device_token"] = fcmToken;
    }
    try {
      const result = await OTPSignInAPI(values);
      // console.log("resultresult>>>>>>",result);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        dispatch(setLoading(false));
        dispatch(setSession(result?.data));
        dispatch(GetUserProfile());
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const OTPResendSignIn = createAsyncThunk(
  "OTPResendSignIn",
  async (values, { dispatch }) => {
    try {
      const result = await OTPResendSignInAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const OTPVerifySignIn = createAsyncThunk(
  "OTPVerifySignIn",
  async (values, { dispatch }) => {
    const fcmToken = await GetFirbaseToken();
    // console.log("fcmToke222222222222222222222222222",fcmToken);
    if (fcmToken) {
      values["device_token"] = fcmToken;
    }
    try {
      const result = await OTPVerifySignInAPI(values);
      // console.log("result111",result);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const ForgotPassword = createAsyncThunk(
  "ForgotPassword",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ForgotPasswordAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        dispatch(toggleVerifyForgotModal(true));
        dispatch(setLoading(false));
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const OTPResendForgot = createAsyncThunk(
  "OTPResendForgot",
  async (values, { dispatch }) => {
    try {
      const result = await OTPResendForgotAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const OTPVerifyForgot = createAsyncThunk(
  "OTPVerifyForgot",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await OTPVerifyForgotAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
        dispatch(toggleVerifyForgotModal(false));
        dispatch(toggleResetModal(true));
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const ResetPassword = createAsyncThunk(
  "ResetPassword",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ResetPasswordAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        dispatch(toggleForgotModal(false));
        dispatch(toggleVerifyForgotModal(false));
        dispatch(toggleResetModal(false));
        dispatch(toggleSuccessModal(true));
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const VerifySession = createAsyncThunk(
  "VerifySession",
  async (values, { dispatch }) => {
    try {
      const result = await VerifySessionAPI(values);
      if (result?.success) {
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const DeleteAccount = createAsyncThunk(
  "DeleteAccount",
  async (values, { dispatch }) => {
    try {
      const result = await DeleteAccountAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            type: AlertEnum.Success,
            text: result.message,
          })
        );
        setTimeout(() => {
          dispatch(removeSession());
        }, 2000);
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const GetMedkartToken = createAsyncThunk(
  "GetMedkartToken",
  async (values, { dispatch }) => {
    try {
      const result = await GetMedKartTokenAPI({
        client_id: MK_CLIENT,
        app_id: MK_APPID,
        secret: MK_SECRET,
      });
      if (result) {
        localStorage.setItem(MK_TOKEN, result?.data?.token);
        return result;
      } else {
        throw result;
      }
    } catch (error) {
      dispatch(
        setMessage({
          text: error?.message,
          type: AlertEnum.Error,
        })
      );
      return error;
    }
  }
);
export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action?.payload;
      state.token = action?.payload?.token;
      localStorage.setItem(SESSION, JSON.stringify(action?.payload));
      localStorage.setItem(TOKEN, action?.payload?.token);
    },
    removeSession: (state) => {
      localStorage.removeItem(SESSION);
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(MK_TOKEN);
      localStorage.removeItem(AGORA);
      state.session = "";
      state.token = "";
    },
    toggleOTPModal: (state, action) => {
      state.otpModal = action.payload;
    },
    toggleForgotModal: (state, action) => {
      state.forgotModal = action.payload;
    },
    toggleVerifyForgotModal: (state, action) => {
      state.verifyForgot = action.payload;
    },
    toggleResetModal: (state, action) => {
      state.resetModal = action.payload;
    },
    toggleSuccessModal: (state, action) => {
      state.successModal = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSession,
  removeSession,
  toggleVerifyForgotModal,
  toggleForgotModal,
  toggleOTPModal,
  toggleResetModal,
  toggleSuccessModal,
} = AuthSlice.actions;

export default AuthSlice.reducer;
