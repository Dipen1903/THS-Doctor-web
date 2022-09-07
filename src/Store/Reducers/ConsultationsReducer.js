import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ConsultDetailsAPI,
  NewConsultAPI,
  PastConsultAPI,
} from "../../Routes/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  consultDetails: "",
  upcomingConsults: [],
  pastConsults: [],
};

export const GetNewConsults = createAsyncThunk(
  "GetNewConsults",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await NewConsultAPI(values);
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
export const GetPastConsults = createAsyncThunk(
  "GetPastConsults",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await PastConsultAPI(values);
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
export const GetConsultDetails = createAsyncThunk(
  "GetConsultDetails",
  async (values, { dispatch }) => {
    try {
      const result = await ConsultDetailsAPI(values);
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
export const ConsultSlice = createSlice({
  name: "ConsultSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetNewConsults.fulfilled, (state, action) => {
      state.upcomingConsults = action.payload;
    });
    builder.addCase(GetPastConsults.fulfilled, (state, action) => {
      state.pastConsults = action.payload;
    });
    builder.addCase(GetConsultDetails.fulfilled, (state, action) => {
      state.consultDetails = action.payload;
    });
  },
});

export const {} = ConsultSlice.actions;

export default ConsultSlice.reducer;
