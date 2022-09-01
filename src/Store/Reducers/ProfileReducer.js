import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PrivacyPolicy from "../../Components/Private/Privacy/Privacy";
import {
  EditBankAPI,
  EditScheduleAPI,
  EditUserProfileAPI,
  GetUserProfileAPI,
  RejectionDetailsAPI,
  ChangePasswordAPI,
  PrivacyAndPolicyAPI,
  TermsAndConditionsAPI,
  HelpsAndSupportsAPI,
  SendOTPOnCurrentMobileNumberAPI,
  VerifyOTPOnCurrentMobileNumberAPI,
  SendOTPOnNewMobileNumberAPI,
  VerifyOTPOnNewMobileNumberAPI,
  TimeSlotAPI,
  AvailibilityCreateAPI
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
  rejectionDetails: "",
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


// Change mobile number in setting part
export const SendOTPOnCurrentMobileNumber = createAsyncThunk(
  "SendOTPOnCurrentMobileNumber",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await SendOTPOnCurrentMobileNumberAPI(values);
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

export const VerifyOTPOnCurrentMobileNumber = createAsyncThunk(
  "VerifyOTPOnCurrentMobileNumber",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await VerifyOTPOnCurrentMobileNumberAPI(values);
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

export const SendOTPOnNewMobileNumber = createAsyncThunk(
  "SendOTPOnNewMobileNumber",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await SendOTPOnNewMobileNumberAPI(values);
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

export const VerifyOTPOnNewMobileNumber = createAsyncThunk(
  "VerifyOTPOnNewMobileNumber",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await VerifyOTPOnNewMobileNumberAPI(values);
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



// Change Mobile Number Start.......................

export const EditBankDetail = createAsyncThunk(
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

// ....Privacy & PrivacyPolicy....
export const PrivacyAndPolicy = createAsyncThunk(
  "ProvacyAndPolicy",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await PrivacyAndPolicyAPI();
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

// ....Terms & Conditions....
export const TermsConditions = createAsyncThunk(
  "TermsAndConditions",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await TermsAndConditionsAPI();
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


// ....Helps & Supports....
export const HelpsSupports = createAsyncThunk(
  "HelpsAndSupports",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await HelpsAndSupportsAPI();
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


// ....Time SLot API...
export const TimeSlot = createAsyncThunk(
  "ProvacyAndPolicy",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await TimeSlotAPI();
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

//Create Time SLot.......


export const AvailibilityCreate = createAsyncThunk(
  "EditSchedule",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await AvailibilityCreateAPI(values);
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
    builder.addCase(GetRejectionDetails.fulfilled, (state, action) => {
      state.rejectionDetails = action.payload;
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
