import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  message: {
    type: "",
    text: "",
    show: false,
  },
};

export const LayoutSlice = createSlice({
  name: "LayoutSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, { payload: { type, text, show = true } }) => {
      state.message = { type, text, show };
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoading, setMessage } = LayoutSlice.actions;

export default LayoutSlice.reducer;
