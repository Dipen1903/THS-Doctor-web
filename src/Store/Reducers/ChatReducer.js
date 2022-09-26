import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  addDoc,
  getDoc,
  where,
} from "firebase/firestore";

import { AlertEnum } from "../../Utilities/Enums";
import { FirebaseDB } from "../../Utilities/Firebase.config";
import { GetConsultDetails } from "./ConsultationsReducer";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  patient: "",
  room: "",
  chat: [],
  conversations: [],
  snapShot: () => {},
  isDetails: false,
};

export const GetSnapShot = createAsyncThunk(
  "GetSnapShot",
  async (values, { dispatch }) => {
    try {
      const path = `Chat_${values?.doctor_id}_${values?.user_id}`;
      const q = query(collection(FirebaseDB, path), orderBy("dateTime", "asc"));
      let unsubscribe;
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          dispatch(setUpChat(change.doc.data()));
        });
      });
      return unsubscribe;
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return error;
    }
  }
);

export const SetUpRoom = createAsyncThunk(
  "SetUpRoom",
  async (values, { getState, dispatch }) => {
    try {
      const { userProfile } = getState().ProfileSlice;
      return dispatch(
        GetConsultDetails({ appointment_id: values?.booking_id })
      ).then((res) => {
        if (!res?.payload?.hasError) {
          let tempRoom = res?.payload;
          dispatch(toggleRoom(tempRoom));
          dispatch(
            GetSnapShot({
              doctor_id: userProfile?.id,
              user_id: tempRoom?.user_id,
            })
          );
          dispatch(UpdateRoom({ unreadMessageOfDoctor: 0 }));

          return true;
        }
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return error;
    }
  }
);

export const UpdateRoom = createAsyncThunk(
  "UpdateRoom",
  async (values, { getState, dispatch }) => {
    try {
      const { ProfileSlice, ChatSlice } = getState();
      const { userProfile } = ProfileSlice;
      const { room } = ChatSlice;
      const path = `Doctors_${userProfile?.id}`;
      const ref = collection(FirebaseDB, path);
      const q = query(
        ref,
        where("userId", "==", `${room?.userId || room?.user_id}`)
      );
      const result = await getDocs(q);
      console.log(result);
      return true;
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return error;
    }
  }
);

export const GetConversations = createAsyncThunk(
  "GetConversations",
  async (values, { getState, dispatch }) => {
    try {
      const { room } = getState().ChatSlice;
      if (values?.doctor_id) {
        const path = `Doctors_${values?.doctor_id}`;
        const ref = collection(FirebaseDB, path);
        const q = query(ref, orderBy("lastMessageTime", "desc"));
        const result = await getDocs(q);
        if (!result.empty) {
          let tempArr = [];
          result.docs.map((doc) => tempArr.push(doc.data()));
          if (tempArr.length && !room) {
            dispatch(SetUpRoom({ booking_id: tempArr[0]?.lastBookingId }));
          }
          return tempArr;
        }
      } else {
        return [];
      }
    } catch (error) {
      dispatch(setLoading(false));
      return error;
    }
  }
);

export const SendMessage = createAsyncThunk(
  "SendMessage",
  async (values, { getState, dispatch }) => {
    try {
      debugger;
      const room = getState().ChatSlice.room;
      const userProfile = getState().ProfileSlice.userProfile;
      const path = `Chat_${userProfile?.id}_${room?.userId || room?.user_id}`;
      const collectionRef = collection(FirebaseDB, path);
      const docRef = await addDoc(collectionRef, values);
      return docRef;
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
      state.chat = [];
      state.room = action.payload;
    },
    setUpChat: (state, action) => {
      state.chat = [...state.chat, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetSnapShot.fulfilled, (state, action) => {
      state.snapShot = action.payload;
    });
    builder.addCase(GetConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });
  },
});

export const { setUpChat, toggleDetails, toggleRoom } = ChatSlice.actions;

export default ChatSlice.reducer;
