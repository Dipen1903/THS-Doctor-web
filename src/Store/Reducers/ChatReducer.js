import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore/lite";

import { AlertEnum } from "../../Utilities/Enums";
import { FirebaseDB } from "../../Utilities/Firebsae.config";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  patient: "",
  room: "",
  isDetails: false,
};

export const GetConversation = createAsyncThunk(
  "GetConversation",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const chat = collection(
        FirebaseDB,
        `Chat_${values?.doctor_id}_${values?.patient_id}`
      );
      const result = await getDocs(chat);
      if (result.empty) {
        throw { hasError: true, message: "" };
      } else {
        return result.docs;
      }
    } catch (error) {
      dispatch(setLoading(false));
      return error;
    }
  }
);

export const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    toggleDetails: (state, action) => {
      state.isDetails = action.payload;
    },
    toggleRoom: (state, action) => {
      state.room = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(GetNewConsults.fulfilled, (state, action) => {
    //   state.upcomingConsults = action.payload;
    // });
  },
});

export const { toggleDetails, toggleRoom } = ChatSlice.actions;

export default ChatSlice.reducer;
