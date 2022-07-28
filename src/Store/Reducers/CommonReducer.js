import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  StateListAPI,
  CityListAPI,
  SpecialityListAPI,
  SubSpecialityListAPI,
  LanguageListAPI,
} from "../../Components/Common/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  cityList: [],
  stateList: [],
  specialityList: [],
  subSpecialityList: [],
  languageList: [],
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
  },
});

export const {} = CommonSlice.actions;

export default CommonSlice.reducer;
