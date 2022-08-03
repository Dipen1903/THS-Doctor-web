import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  EditBankAPI,
  EditScheduleAPI,
  EditUserProfileAPI,
  GetUserProfileAPI,
} from "../../Routes/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  profileStep: 1,
  skipModal: false,
  successModal: false,
  submittedModal: false,
  feeModal: false,
  userProfile: "",
};

export const GetUserProfile = createAsyncThunk(
  "GetUserProfile",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await GetUserProfileAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
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
export const EditUserProfile = createAsyncThunk(
  "EditUserProfile",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await EditUserProfileAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
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
export const EditBankDetails = createAsyncThunk(
  "EditBankDetails",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await EditBankAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
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
export const EditSchedule = createAsyncThunk(
  "EditSchedule",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await EditScheduleAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
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
export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    nextStep: (state, action) => {
      if (action.payload) {
        state.profileStep = action.payload;
      } else {
        state.profileStep++;
      }
    },
    prevStep: (state, action) => {
      if (action.payload) {
        state.profileStep = action.payload;
      } else {
        state.profileStep--;
      }
    },
    toggleSkip: (state, action) => {
      state.skipModal = action.payload;
    },
    toggleSuccess: (state, action) => {
      state.successModal = action.payload;
    },
    toggleSubmitted: (state, action) => {
      state.submittedModal = action.payload;
    },
    toggleFee: (state, action) => {
      state.feeModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(EditUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload?.data;
    });
    builder.addCase(GetUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
  },
});

export const {
  nextStep,
  prevStep,
  toggleSubmitted,
  toggleSuccess,
  toggleSkip,
  toggleFee,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
