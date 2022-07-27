import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  profileStep: 1,
};
export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.profileStep++;
    },
    prevStep: (state) => {
      state.profileStep--;
    },
  },
  extraReducers: (builder) => {},
});

export const { nextStep, prevStep } = ProfileSlice.actions;

export default ProfileSlice.reducer;
