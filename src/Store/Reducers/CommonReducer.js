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
} from "../../Components/Common/Service";
import { ShareLinkAPI } from "../../Routes/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  cityList: [],
  stateList: [],
  specialityList: [],
  subSpecialityList: [],
  languageList: [],
  qualification: [],
  documentList: [],
};
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

export const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export const {} = CommonSlice.actions;

export default CommonSlice.reducer;
