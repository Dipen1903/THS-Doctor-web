import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CancelAllConsultAPI,
  CancelConsultAPI,
  CancelReasonsAPI,
  ConsultDetailsAPI,
  DelayConsultAPI,
  NewConsultAPI,
  PastConsultAPI,
} from "../../Routes/Service";

import { AlertEnum } from "../../Utilities/Enums";
import { setLoading, setMessage } from "./LayoutSlice";

const initialState = {
  consultDetails: "",
  isCancel: false,
  cancelReasons: [],
  isCancelAll: false,
  upcomingConsults: [],
  pastConsults: [],
};

export const GetNewConsults = createAsyncThunk(
  "GetNewConsults",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await NewConsultAPI(values);
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
export const GetPastConsults = createAsyncThunk(
  "GetPastConsults",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await PastConsultAPI(values);

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
export const GetConsultDetails = createAsyncThunk(
  "GetConsultDetails",
  async (values, { dispatch }) => {
    try {
      const result = await ConsultDetailsAPI(values);
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
export const CancelConsult = createAsyncThunk(
  "CancelConsult",
  async (values, { dispatch }) => {
    try {
      const result = await CancelConsultAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        dispatch(toggleCancel(false));
        dispatch(GetNewConsults());
        dispatch(GetPastConsults());
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
export const CancelAllConsult = createAsyncThunk(
  "CancelAllConsult",
  async (values, { dispatch }) => {
    try {
      const result = await CancelAllConsultAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        dispatch(toggleCancelAll(false));
        dispatch(GetNewConsults());
        dispatch(GetPastConsults());
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
export const DelayConsult = createAsyncThunk(
  "DelayConsult",
  async (values, { dispatch }) => {
    try {
      const result = await DelayConsultAPI(values);
      if (result?.success) {
        dispatch(
          setMessage({
            text: result?.message,
            type: AlertEnum.Success,
          })
        );
        dispatch(GetNewConsults());
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
export const CancelReasons = createAsyncThunk(
  "CancelReasons",
  async (values, { dispatch }) => {
    try {
      const result = await CancelReasonsAPI(values);
      if (result?.success) {
        return result?.data;
      } else {
        throw result;
      }
    } catch (error) {
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

export const ConsultSlice = createSlice({
  name: "ConsultSlice",
  initialState,
  reducers: {
    toggleCancel: (state, action) => {
      state.isCancel = action.payload;
    },
    toggleCancelAll: (state, action) => {
      state.isCancelAll = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetNewConsults.fulfilled, (state, action) => {
      state.upcomingConsults = action.payload;
    });
    builder.addCase(GetPastConsults.fulfilled, (state, action) => {
      state.pastConsults = action.payload;
    });
    builder.addCase(GetConsultDetails.fulfilled, (state, action) => {
      state.consultDetails = action.payload;
    });
    builder.addCase(CancelReasons.fulfilled, (state, action) => {
      state.cancelReasons = action.payload;
    });
  },
});

export const { toggleCancel, toggleCancelAll } = ConsultSlice.actions;

export default ConsultSlice.reducer;
