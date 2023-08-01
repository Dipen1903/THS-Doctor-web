import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  StateListAPI,
  CityListAPI,
  SpecialityListAPI,
  SubSpecialityListAPI,
  LanguageListAPI,
  QualificationListAPI,
  DocumentListAPI,
  TermsAndConditionsAPI,
  HelpsAndSupportsAPI,
  PrivacyAndPolicyAPI,
  UploadFileAPI,
  SearchMedicineAPI,
} from "../../Components/Common/Service";
import { AnalyticsAPI, DoctorFee, DoctorFeeUpdate, DoctorFetachNumber, DoctorLink, ShareLinkAPI } from "../../Routes/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  medicines: "",
  cityList: [],
  stateList: [],
  specialityList: [],
  subSpecialityList: [],
  languageList: [],
  qualification: [],
  documentList: [],
  analytics: "",
  doctorFees: "",
  doctorLinks: "",
  doctorfeesUpdate: "",
  doctorFetachNumbers:"",
};
export const GetMedicine = createAsyncThunk(
  "GetMedicine",
  async (values, { dispatch }) => {
    try {
      const result = await SearchMedicineAPI(values);
      if (result) {
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
export const StateList = createAsyncThunk(
  "StateList",
  async (values, { dispatch }) => {
    try {
      const result = await StateListAPI(values);

      if (result?.success) {
        let stateArr = result?.data?.map((item) => ({
          label: item?.name,
          value: item?.id,
        }));
        return stateArr;
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
export const CityList = createAsyncThunk(
  "CityList",
  async (values, { dispatch }) => {
    try {
      const result = await CityListAPI(values);
      if (result?.success) {
        let cityArr = result?.data?.map((item) => ({
          label: item?.name,
          value: item?.id,
          state_id: item?.state_id,
        }));
        return cityArr;
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
export const SpecialityList = createAsyncThunk(
  "SpecialityList",
  async (values, { dispatch }) => {
    try {
      const result = await SpecialityListAPI(values);
      if (result?.success) {
        if (values?.isFeeCard) {
          return result?.data;
        }
        let specialtyArr = result?.data?.map((item) => ({
          label: item?.speciality,
          value: item?.id,
        }));
        return specialtyArr;
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
export const SubSpecialityList = createAsyncThunk(
  "SubSpecialityList",
  async (values, { dispatch }) => {
    try {
      const result = await SubSpecialityListAPI(values);
      if (result?.success) {
        if (values?.isFeeCard) {
          return result?.data;
        }
        let specialtyArr = result?.data?.map((item) => ({
          label: item?.sub_speciality,
          value: item?.id,
        }));
        return specialtyArr;
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
export const LanguageList = createAsyncThunk(
  "LanguageList",
  async (values, { dispatch }) => {
    try {
      const result = await LanguageListAPI(values);
      if (result?.success) {
        let languageArr = result?.data?.map((item) => ({
          label: item?.name,
          value: item?.id,
        }));
        return languageArr;
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
export const QualificationList = createAsyncThunk(
  "QualificationList",
  async (values, { dispatch }) => {
    try {
      const result = await QualificationListAPI(values);
      if (result?.success) {
        let qualificationArr = result?.data?.map((item) => ({
          label: item?.name,
          value: item?.id,
        }));
        return qualificationArr;
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
export const DocumentList = createAsyncThunk(
  "DocumentList",
  async (values, { dispatch }) => {
    try {
      const result = await DocumentListAPI(values);
      if (result?.success) {
        let documentArr = result?.data?.map((item) => ({
          label: item?.name,
          isBackSide: item?.is_back_side,
          value: item?.id,
        }));
        return documentArr;
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
export const PrivacyAndPolicy = createAsyncThunk(
  "ProvacyAndPolicy",
  async (values, { dispatch }) => {
    try {
      const result = await PrivacyAndPolicyAPI();
      if (result?.success) {
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
export const TermsConditions = createAsyncThunk(
  "TermsAndConditions",
  async (values, { dispatch }) => {
    try {
      const result = await TermsAndConditionsAPI();
      if (result?.success) {
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
export const HelpsSupports = createAsyncThunk(
  "HelpsAndSupports",
  async (values, { dispatch }) => {
    try {
      const result = await HelpsAndSupportsAPI();
      if (result?.success) {
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
export const ShareLink = createAsyncThunk(
  "ShareLink",
  async (values, { dispatch }) => {
    try {
      const result = await ShareLinkAPI(values);
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
export const UploadFile = createAsyncThunk(
  "UploadFile",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await UploadFileAPI(values);
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
export const DoctorFees = createAsyncThunk(
  "doctorFees",
  async (values, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await DoctorFee(values);
      console.log("result", result);
      return result?.data;

    } catch (error) {
      // dispatch(setLoading(false));
      return error;
    }
  }
);
export const DoctorFeesUpdate = createAsyncThunk(
  "doctorFeesUpdate",
  async (values, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await DoctorFeeUpdate(values);
      console.log("result", result);
      return result?.data;

    } catch (error) {
      // dispatch(setLoading(false));
      return error;
    }
  }
);
export const DoctorLinks = createAsyncThunk(
  "doctorLinks",
  async (values, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await DoctorLink({ consultation_type: values });
      console.log("result", result);
      return result?.data;

    } catch (error) {
      // dispatch(setLoading(false));
      return error;
    }
  }
);
export const DoctorFetachNumbers = createAsyncThunk(
  "doctorFetachNumbers",
  async (values, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await DoctorFetachNumber(values);
      console.log("result", result);
      return result?.data;

    } catch (error) {
      // dispatch(setLoading(false));
      return error;
    }
  }
);
export const GetAnalytics = createAsyncThunk(
  "GetAnalytics",
  async (values, { dispatch }) => {
    try {
      const result = await AnalyticsAPI(values);
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

export const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {
    clearMedicines: (state, action) => {
      state.medicines = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMedicine.fulfilled, (state, action) => {
      state.medicines = action.payload;
    });
    builder.addCase(StateList.fulfilled, (state, action) => {
      state.stateList = action.payload;
    });
    builder.addCase(CityList.fulfilled, (state, action) => {
      state.cityList = action.payload;
    });
    builder.addCase(SpecialityList.fulfilled, (state, action) => {
      state.specialityList = action.payload;
    });
    builder.addCase(SubSpecialityList.fulfilled, (state, action) => {
      state.subSpecialityList = action.payload;
    });
    builder.addCase(LanguageList.fulfilled, (state, action) => {
      state.languageList = action.payload;
    });
    builder.addCase(QualificationList.fulfilled, (state, action) => {
      state.qualification = action.payload;
    });
    builder.addCase(DocumentList.fulfilled, (state, action) => {
      state.documentList = action.payload;
    });
    builder.addCase(GetAnalytics.fulfilled, (state, action) => {
      state.analytics = action.payload;
    });
    builder.addCase(DoctorFees.fulfilled, (state, action) => {
      state.doctorFees = action.payload;
    });
    builder.addCase(DoctorLinks.fulfilled, (state, action) => {
      state.doctorLinks = action.payload;
    });
    builder.addCase(DoctorFetachNumbers.fulfilled, (state, action) => {
      state.doctorFetachNumbers = action.payload;
    });
   
  },
});

export const { clearMedicines } = CommonSlice.actions;

export default CommonSlice.reducer;
