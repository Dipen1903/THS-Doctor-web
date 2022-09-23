import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PayoutDetailsAPI,
  PayoutsAPI,
  RequestWithdrawAPI,
} from "../../Routes/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  payouts: [],
  payoutDetails: "",
};

export const GetPayouts = createAsyncThunk(
  "GetPayouts",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await PayoutsAPI(values);
      if (result?.success) {
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
export const GetPayoutDetails = createAsyncThunk(
  "GetPayoutDetails",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await PayoutDetailsAPI(values);
      if (result?.success) {
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
export const RequestWithdraw = createAsyncThunk(
  "GetPayoutDetails",
  async (values, { dispatch }) => {
    try {
      const result = await RequestWithdrawAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
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
export const PayoutSlice = createSlice({
  name: "PayoutSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetPayouts.fulfilled, (state, action) => {
      state.payouts = action.payload;
    });
    builder.addCase(GetPayoutDetails.fulfilled, (state, action) => {
      state.payoutDetails = action.payload;
    });
  },
});

export const {} = PayoutSlice.actions;

export default PayoutSlice.reducer;
