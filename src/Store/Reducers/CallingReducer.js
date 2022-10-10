import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { layout } from "agora-react-uikit";
import { GetAgoraToken } from "../../Components/Common/Service";

import { AGORA, AGORA_APP, AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  rtcProps: {
    appId: AGORA_APP,
    uid: "",
    channel: "",
    token: "",
    role: "host",
    layout: layout.grid,
  },
  callData: {
    snapShot: () => {},
    isCalling: false,
  },
};

export const GetToken = createAsyncThunk(
  "GetToken",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await GetAgoraToken(values);
      if (result?.success) {
        dispatch(
          setAgoraSession({
            uid: values?.user_id,
            channel: values?.channel_name,
            token: result?.data,
          })
        );
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
    setCallData: (state, action) => {
      state.callData = { ...state.callData, ...action.payload };
    },
    setAgoraSession: (state, action) => {
      localStorage.setItem(
        AGORA,
        JSON.stringify({ ...state.rtcProps, ...action?.payload })
      );
      state.rtcProps = { ...state.rtcProps, ...action?.payload };
    },
    removeAgoraSession: (state, action) => {
      localStorage.removeItem(AGORA);
      state.rtcProps = {
        appId: AGORA_APP,
        uid: "",
        channel: "",
        token: "",
        role: "host",
        layout: layout.grid,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setCallData, setAgoraSession, removeAgoraSession } =
  CallingSlice.actions;

export default CallingSlice.reducer;
