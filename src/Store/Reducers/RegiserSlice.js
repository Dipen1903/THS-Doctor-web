import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  OTPResendSignUpAPI,
  OTPVerifySignUpAPI,
  SignUpAPI,
} from "../../Routes/Service";
import { AlertEnum, SESSION, TOKEN } from "../../Utilities/Enums";
import { setSession } from "./AuthSlice";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  otpVerify: false,
  success: false,
};
export const SignUp = createAsyncThunk(
  "SignUp",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await SignUpAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
        dispatch(toggleOTPverify(true));
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        return result?.data;
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
export const OTPResendSignUp = createAsyncThunk(
  "OTPResendSignUp",
  async (values, { dispatch }) => {
    try {
      const result = await OTPResendSignUpAPI(values);
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
export const OTPVerifySignUp = createAsyncThunk(
  "OTPVerifySignUp",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await OTPVerifySignUpAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
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

export const RegisterSlice = createSlice({
  name: "RegisterSlice",
  initialState,
  reducers: {
    toggleOTPverify: (state, action) => {
      state.otpVerify = action.payload;
    },
    toggleSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { toggleOTPverify, toggleSuccess } = RegisterSlice.actions;

export default RegisterSlice.reducer;
