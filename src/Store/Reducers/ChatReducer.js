import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  addDoc,
  where,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { ChatRoomEnum } from "../../Utilities/Enums";
import { FirebaseDB } from "../../Utilities/Firebase.config";
import { GetToken, setCallData } from "./CallingReducer";
import { setLoading } from "./LayoutSlice";

const initialState = {
  patient: "",
  room: "",
  chat: [],
  chatDoc: "",
  conversations: [],
  snapShot: () => { },
  isDetails: false,
};

export const GetSnapShot = createAsyncThunk(
  "GetSnapShot",
  async (values, { dispatch }) => {
    try {
      const path = `Chat_${values?.doctor_id}_${values?.user_id}_${values?.booking_id}`;
      // console.log("vcxvxv", `Chat_${values?.doctor_id}_${values?.user_id}_${values?.booking_id}`);
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
      // console.log("valuesvaluesvalues", values);
      const { ProfileSlice } = getState();
      const { userProfile } = ProfileSlice;

      const path = `Doctors_${userProfile?.id}`;
      const ref = collection(FirebaseDB, path);
      const q = query(
        ref,
        where(
          "lastBookingId",
          "==",
          `${values?.id?.toString() || values?.lastBookingId}`
        )
      );
      const result = await getDocs(q);
      if (!result?.empty) {
        dispatch(SetUpRoom(result?.docs[0]?.data()));
      } else {
        await addDoc(ref, {
          ...ChatRoomEnum,
          userId: values?.user_id?.toString(),
          userName: values?.name,
          age: values?.age,
          gender: values?.gender,
          doctorImage: userProfile?.image,
          doctorOnlineStatus: 1,
          doctorOnlineLastTime: Timestamp.now(),
          lastBookingId: values?.id?.toString(),
        }).then((res) => {
          dispatch(SetUpRoom(values));
        });
      }
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
        where("lastBookingId", "==", `${values?.lastBookingId || values?.id}`)
      );
      let snapShot;
      const result = await getDocs(q);
      snapShot = onSnapshot(q, { includeMetadataChanges: true }, (doc) => {
        let data = doc?.docChanges()[0]?.doc?.data();
        dispatch(setCallData({ snapShot, isCalling: data?.isCallingStatus }));
      });

      if (!result?.empty) {
        dispatch(setUpChatDoc(result?.docs[0]));
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
      const { ProfileSlice, CallingSlice, ChatSlice } = getState();
      const { userProfile } = ProfileSlice;
      const { room } = ChatSlice;
      const { callData } = CallingSlice;
      callData?.snapShot();
      if (room?.lastBookingId !== (values?.id || values?.lastBookingId)) {
        return dispatch(GetRoom(values)).then((res) => {
          if (!res?.payload?.hasError) {
            let tempRoom = res?.payload;

            if (tempRoom) {
              dispatch(
                UpdateRoom({
                  channelName: `Channel_${userProfile?.id}_${tempRoom?.userId}`,
                  unreadMessageOfDoctor: 0,
                })
              );
              dispatch(
                GetToken({
                  user_id: userProfile?.id,
                  channel_name: `Channel_${userProfile?.id}_${tempRoom?.userId}`,
                })
              );
              dispatch(toggleRoom(tempRoom));
            } else {
              dispatch(createRoom(values));
            }
            return true;
          }
        });
      }
    } catch (error) {
      dispatch(setLoading(false));
      // console.log("errrrrr", error);
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
      const q = query(
        ref,
        where("lastBookingId", "==", `${room?.lastBookingId || room?.id}`)
      );
      const result = await getDocs(q);
      if (!result?.empty) {
        roomRef = result?.docs[0].ref;
        return await setDoc(roomRef, values, { merge: true });
      } else {
        return null;
      }
    } catch (error) {
      dispatch(setLoading(false));
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
        // console.log("values?.doctor_id", values?.doctor_id);
        const path = `Doctors_${values?.doctor_id}`;
        const ref = collection(FirebaseDB, path);
        const q = query(ref, orderBy("lastMessageTime", "desc"));
        let tempArr = [];
        const result = await getDocs(q);
        result.forEach((doc) => tempArr.push(doc?.data()));
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            // console.log("change", change);
            if (change.type === "modified") {
              // let tempConversation = [];

              // if (tempArr.length) {
              //   tempConversation = [...tempArr];
              // } else {
              //   tempConversation = [...conversations];
              // }
              let temp = change.doc.data();
              console.log("temp", temp);
              dispatch(updateConversation(temp));
              // let index = tempConversation?.findIndex(
              //   (item) =>
              //     parseInt(item?.lastBookingId) ===
              //     parseInt(temp?.lastBookingId)
              // );
              // if (parseInt(index) > -1) {
              //   tempConversation[index] = temp;
              // }
              // dispatch(setUpConvertations(tempConversation));
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
      let booking_id = room?.lastBookingId || room?.id;
      const path = `Chat_${userProfile?.id}_${user_id}_${booking_id}`;
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
      console.log("docRef",docRef);
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
    setUpChatDoc: (state, action) => {
      state.chatDoc = action.payload;
    },
    setUpChat: (state, action) => {
      state.chat.push(action.payload);
    },
    setUpConvertations: (state, action) => {
      state.conversations = [...action.payload];
    },
    updateConversation: (state, action) => {
      let tempConversation = state.conversations;
      let index = tempConversation.findIndex(
        (item) => item?.lastBookingId === action?.payload?.lastBookingId
      );

      if (index > -1) {
        tempConversation[index] = action?.payload;
      }
      tempConversation.sort(
        (a, b) => b?.lastMessageTime?.toDate() - a?.lastMessageTime?.toDate()
      );
      state.conversations = [...tempConversation];
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
  setUpChatDoc,
  setUpConvertations,
  updateConversation,
} = ChatSlice.actions;

export default ChatSlice.reducer;
