import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  addDoc,
  doc,
  getDoc,
  where,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { ChatRoomEnum } from "../../Utilities/Enums";
import { FirebaseDB } from "../../Utilities/Firebase.config";
import { GetConsultDetails } from "./ConsultationsReducer";
import { setLoading } from "./LayoutSlice";

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
      return error;
    }
  }
);

export const createRoom = createAsyncThunk(
  "createRoom",
  async (values, { getState, dispatch }) => {
    try {
      const { ProfileSlice } = getState();
      const { userProfile } = ProfileSlice;

      const path = `Doctors_${userProfile?.id}`;
      const ref = collection(FirebaseDB, path);

      await addDoc(ref, {
        ...ChatRoomEnum,
        userId: values?.user_id?.toString(),
        userName: values?.name,
        doctorOnlineStatus: 1,
        doctorOnlineLastTime: Timestamp.now(),
        lastBookingId: values?.id?.toString(),
      }).then((res) => {
        dispatch(SetUpRoom(values));
      });
    } catch (error) {
      dispatch(setLoading(false));
      return error;
    }
  }
);
export const GetRoom = createAsyncThunk(
  "GetRoom",
  async (values, { getState, dispatch }) => {
    try {
      const { ProfileSlice } = getState();
      const { userProfile } = ProfileSlice;
      const path = `Doctors_${userProfile?.id}`;
      const ref = collection(FirebaseDB, path);
      const q = query(
        ref,
        where("userId", "==", `${values?.user_id || values?.userId}`)
      );
      const result = await getDocs(q);
      if (!result?.empty) {
        return result?.docs[0]?.data();
      } else {
        return false;
      }
    } catch (error) {
      dispatch(setLoading(false));
      return error;
    }
  }
);
export const SetUpRoom = createAsyncThunk(
  "SetUpRoom",
  async (values, { getState, dispatch }) => {
    try {
      const { userProfile } = getState().ProfileSlice;
      return dispatch(GetRoom(values)).then((res) => {
        if (!res?.payload?.hasError) {
          let tempRoom = res?.payload;
          debugger;
          if (tempRoom) {
            dispatch(toggleRoom(tempRoom));
            dispatch(UpdateRoom({ unreadMessageOfDoctor: 0 }));
          } else {
            dispatch(createRoom(values));
          }
          return true;
        }
      });
    } catch (error) {
      dispatch(setLoading(false));
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

      let roomRef = "";
      const path = `Doctors_${userProfile?.id}`;
      const ref = collection(FirebaseDB, path);
      const q = query(ref, where("userId", "==", `${room?.userId}`));
      const result = await getDocs(q);
      if (!result?.empty) {
        roomRef = result?.docs[0].ref;
        return await setDoc(roomRef, values, { merge: true });
      } else {
        return null;
      }
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
      const { conversations } = getState().ChatSlice;
      if (values?.doctor_id) {
        const path = `Doctors_${values?.doctor_id}`;
        const ref = collection(FirebaseDB, path);
        const q = query(ref, orderBy("lastMessageTime", "desc"));
        let tempArr = [];
        const result = await getDocs(q);
        result.forEach((doc) => tempArr.push(doc?.data()));
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
              let tempConversation = [];
              if (tempArr.length) {
                tempConversation = [...tempArr];
              } else {
                tempConversation = [...conversations];
              }
              let temp = change.doc.data();
              let index = tempConversation?.findIndex(
                (item) => parseInt(item?.userId) === parseInt(temp?.userId)
              );
              if (parseInt(index) > -1) {
                tempConversation[index] = temp;
              }
              dispatch(setUpConvertations(tempConversation));
            }
          });
        });
        return tempArr;
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
      const room = getState().ChatSlice.room;
      const userProfile = getState().ProfileSlice.userProfile;
      let user_id = room?.user_id || room?.userId;
      const path = `Chat_${userProfile?.id}_${user_id}`;
      const collectionRef = collection(FirebaseDB, path);
      const docRef = await addDoc(collectionRef, values);
      dispatch(
        UpdateRoom({
          lastMessage:
            values?.message || values?.extension?.split("/")[1]?.toUpperCase(),
          lastMessageTime: Timestamp.now(),
          lastMessageType: values?.documentType,
          unreadMessageOfUser: parseInt(room?.unreadMessageOfUser || 0) + 1,
        })
      );
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
    setUpConvertations: (state, action) => {
      state.conversations = [...action.payload];
    },
    clearChat: (state) => {
      state.chat = [];
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

export const {
  setUpChat,
  toggleDetails,
  toggleRoom,
  clearChat,
  setUpConvertations,
} = ChatSlice.actions;

export default ChatSlice.reducer;
