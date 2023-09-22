import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  EditBankAPI,
  EditScheduleAPI,
  EditUserProfileAPI,
  GetUserProfileAPI,
  RejectionDetailsAPI,
  ChangePasswordAPI,
  ToggleLiveStatusAPI,
  OTPCurrentAPI,
  OTPNewAPI,
  VerifyOTPNewAPI,
  VerifyOTPCurrentAPI,
  ReverifyUserProfileAPI,
  CreateRPContactAPI,
  ValidateBankAccountAPI,
  SlotList,
} from "../../Routes/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  profileStep: 1,
  skipModal: false,
  profileSuccessModal: false,
  submittedModal: false,
  feeModal: false,
  userProfile: "",
  rejectionDetails: "",
  slotlistdoctor:{},
  slotlistdata:""
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
export const GetRejectionDetails = createAsyncThunk(
  "GetRejectionDetails",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await RejectionDetailsAPI(values);
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
        dispatch(GetUserProfile());
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
export const ReverifyUserProfile = createAsyncThunk(
  "ReverifyUserProfile",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ReverifyUserProfileAPI(values);
      if (result?.success) {
        dispatch(GetUserProfile());
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
  async (values, { getState, dispatch }) => {
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
export const ValidateBank = createAsyncThunk(
  "ValidateBank",
  async (values, { dispatch }) => {
    try {
      const result = await ValidateBankAccountAPI(values);
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
export const GetOTPCurrent = createAsyncThunk(
  "GetOTPCurrent",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await OTPCurrentAPI(values);
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
export const VerifyOTPCurrent = createAsyncThunk(
  "VerifyOTPCurrent",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await VerifyOTPCurrentAPI(values);
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
export const GetOTPNew = createAsyncThunk(
  "GetOTPNew",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await OTPNewAPI(values);
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
export const VerifyOTPNew = createAsyncThunk(
  "VerifyOTPNew",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await VerifyOTPNewAPI(values);
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

// Change Password ..................

export const ChangePassword = createAsyncThunk(
  "ChangePassword",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ChangePasswordAPI(values);
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
export const SlotListDoctor = createAsyncThunk(
  "SlotListDoctor",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await SlotList(values);
      if (result?.success) {
        dispatch(setLoading(false));
        // dispatch(
        //   setMessage({
        //     text: result?.message,
        //     type: AlertEnum.Success,
        //   })
        // );
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
export const ToggleLiveStatus = createAsyncThunk(
  "ToggleLiveStatus",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ToggleLiveStatusAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
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
export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    reset: () => initialState,
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
    toggleProfileSuccess: (state, action) => {
      state.profileSuccessModal = action.payload;
    },
    toggleSubmitted: (state, action) => {
      state.submittedModal = action.payload;
    },
    toggleFee: (state, action) => {
      state.feeModal = action.payload;
    },
    slotdata: (state, action) => {
      console.log("action???????????? ",action.payload);
      state.slotlistdata = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(EditUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload?.data;
    });
    builder.addCase(SlotListDoctor.fulfilled, (state, action) => {
      state.slotlistdoctor = action.payload?.data;
    });
    builder.addCase(GetUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
    builder.addCase(GetRejectionDetails.fulfilled, (state, action) => {
      state.rejectionDetails = action.payload;
    });
  },
});

export const {
  reset,
  nextStep,
  prevStep,
  toggleSubmitted,
  toggleProfileSuccess,
  toggleSkip,
  toggleFee,
  slotdata
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
