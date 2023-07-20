import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RadiologyDataApi } from "../../Components/Common/Service";
import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  radiologyData: [],
};

export const GetRadioLogyData = createAsyncThunk(
  "GetRadioLogyData",
  async (values, { dispatch }) => {
    try {
      const result = await RadiologyDataApi(values);
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

export const RadiologySlice = createSlice({
  name: "RadiologySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetRadioLogyData.fulfilled, (state, action) => {
      state.radiologyData = action.payload;
    });
  },
});
export const {
  addToCart,
  removeItem,

  clearRadiologyCartItem,
} = RadiologySlice.actions;
export default RadiologySlice.reducer;
