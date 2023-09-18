import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Reducers/AuthSlice";
import CommonSlice from "./Reducers/CommonReducer";
import ConsultSlice from "./Reducers/ConsultationsReducer";
import LayoutSlice from "./Reducers/LayoutSlice";
import ProfileSlice from "./Reducers/ProfileReducer";
import RegisterSlice from "./Reducers/RegiserSlice";
import PayoutSlice from "./Reducers/PayoutReducer";
import ChatSlice from "./Reducers/ChatReducer";
import CallingSlice from "./Reducers/CallingReducer";
import LabtestSlice from "./Reducers/LabtestSlice";
import RadiologySlice from "./Reducers/RadiologySlice";
import callReducer from './Reducers/callReducer';
export const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice,
    LayoutSlice: LayoutSlice,
    RegisterSlice: RegisterSlice,
    ProfileSlice: ProfileSlice,
    CommonSlice: CommonSlice,
    ConsultSlice: ConsultSlice,
    PayoutSlice: PayoutSlice,
    ChatSlice: ChatSlice,
    CallingSlice: CallingSlice,
    LabtestSlice: LabtestSlice,
    RadiologySlice: RadiologySlice,
    call: callReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["ChatSlice.GetConversation"],
        ignoreState: ["ChatSlice.conversation"],
      },
    }),
});
