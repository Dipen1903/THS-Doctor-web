import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  OTPResendSignInAPI,
  OTPSignInAPI,
  OTPVerifySignInAPI,
  SignInAPI,
} from "../../Routes/Service";
import { AlertEnum, SESSION, TOKEN } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";
import { GetUserProfile } from "./ProfileReducer";

const initialState = {
  token: `${localStorage.getItem(TOKEN) || ""}`,
  session: JSON.parse(localStorage.getItem(SESSION)) || "",
  otpModal: false,
};
export const SignIn = createAsyncThunk(
  "SignIn",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const result = await SignInAPI(values);
      if (result?.success) {
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
export const OTPSignIn = createAsyncThunk(
  "SignIn",
  async (values, { dispatch }) => {
    try {
      const result = await OTPSignInAPI(values);
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
    try {
      const result = await OTPVerifySignInAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        dispatch(setSession(result?.data));
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
// export const VerifySession = createAsyncThunk(
//   "VerifySession",
//   async (values, { dispatch }) => {
//     try {
//       const result = await AuthenticateAPI(values);
//       if (result?.success) {
//         return result?.data;
//       } else {
//         throw result;
//       }
//     } catch (error) {
//       dispatch(
//         setMessage({
//           text: error?.message,
//           type: AlertEnum.Error,
//         })
//       );
//       return error;
//     }
//   }
// );
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
      state.session = "";
      state.token = "";
    },
    toggleOTPModal: (state, action) => {
      state.otpModal = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const GetToken = (state) => {
  return state?.Authenticate?.token;
};
export const { setSession, removeSession, toggleOTPModal } = AuthSlice.actions;

export default AuthSlice.reducer;
