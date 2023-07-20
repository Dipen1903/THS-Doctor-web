import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LabtestLabsAPI } from "../../Components/Common/Service";
import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  labTestList: [],
};

export const LabtestLabs = createAsyncThunk(
  "LabtestLabs",
  async (values, { dispatch }) => {
    try {
      const result = await LabtestLabsAPI(values);
      if (result) {
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

export const LabtestSlice = createSlice({
  name: "LabtestSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(LabtestLabs.fulfilled, (state, action) => {
      state.labTestList = action.payload;
    });
  },
});

export const {
  addToCart,
  SelectedMember,
  removeItem,
  SelectedCancelReasons,
  clearCartItem,
} = LabtestSlice.actions;
export default LabtestSlice.reducer;
