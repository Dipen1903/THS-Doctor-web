import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { collection, query, onSnapshot } from "firebase/firestore";

import { AlertEnum } from "../../Utilities/Enums";
import { FirebaseDB } from "../../Utilities/Firebase.config";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  patient: "",
  room: "",
  chat: [],
  snapShot: () => {},
  isDetails: false,
};

export const GetSnapShot = createAsyncThunk(
  "GetSnapShot",
  async (values, { getState, dispatch }) => {
    try {
      const path = `Chat_${values?.doctor_id}_${values?.patient_id}`;
      const q = query(
        collection(
          FirebaseDB,
          `Chat_${values?.doctor_id}_${values?.patient_id}`
        )
      );
      let unsubscribe;
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let tempArray = [];
        querySnapshot.forEach((item) => tempArray.push(item.data()));
        dispatch(setUpChat({ type: "firebase", data: tempArray }));
      });
      return unsubscribe;
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return error;
    }
  }
);

export const SendMessage = createAsyncThunk(
  "SendMessage",
  async (values, { getState, dispatch }) => {
    try {
      let room = getState().ChatSlice.room;
      const path = `Chat_${room?.doctor_id}_${room?.patient_id}`;
      const collection = collection(FirebaseDB, path);

      return;
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
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
    setUpChat: (state, action) => {
      let details = action.payload;
      if (details.type === "chatbot") {
        let tempObject = JSON.parse(details.data);
      } else if (details.type === "firebase") {
        state.chat = [...state.chat, ...details.data];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetSnapShot.fulfilled, (state, action) => {
      state.snapShot = action.payload;
    });
  },
});

export const { setUpChat, toggleDetails, toggleRoom } = ChatSlice.actions;

export default ChatSlice.reducer;
