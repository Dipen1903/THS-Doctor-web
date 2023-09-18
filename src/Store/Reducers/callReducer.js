// callReducer.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rtcProps: null,
  isCalling: false,
};

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    setRtcProps: (state, action) => {
      state.rtcProps = action.payload;
    },
    setIsCalling: (state, action) => {
      state.isCalling = action.payload;
    },
  },
});

export const { setRtcProps, setIsCalling } = callSlice.actions;
export default callSlice.reducer;
