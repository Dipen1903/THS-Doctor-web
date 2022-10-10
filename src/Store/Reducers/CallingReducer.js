import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAgoraToken } from "../../Components/Common/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  agora_token: localStorage.getItem("agora_token") || "",
};

export const GetToken = createAsyncThunk(
  "GetToken",
  async (values, { dispatch }) => {
    try {
      dispatch(removeAgoraToken());
      dispatch(setLoading(true));
      const result = await GetAgoraToken(values);
      if (result?.success) {
        dispatch(setAgoraToken(result?.data));
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

export const CallingSlice = createSlice({
  name: "CallingSlice",
  initialState,
  reducers: {
    setAgoraToken: (state, action) => {
      localStorage.setItem("agora_token", action?.payload);
      state.agora_token = action?.payload;
    },
    removeAgoraToken: (state, action) => {
      localStorage.removeItem("agora_token");
      state.agora_token = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { setAgoraToken, removeAgoraToken } = CallingSlice.actions;

export default CallingSlice.reducer;
