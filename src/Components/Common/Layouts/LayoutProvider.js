import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../Utilities/Enums";
import Lottie from "react-lottie";
import animationData from "../../../Assets/json/loader.json";
const LayoutContext = createContext({ isLoading: false });

function LayoutProvider({ children }) {
  return (
    <LayoutContext.Provider value={{}}>
      <Loader />
      <SnackBar />
      {children}
    </LayoutContext.Provider>
  );
}

export function Loader() {
  const { isLoading } = useSelector(({ LayoutSlice }) => LayoutSlice);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };
  return isLoading ? (
    <div className="loader-container">
      <div className="loader-item">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  ) : (
    <></>
  );
}

function SnackBar() {
  const { type, show, text, subText } = useSelector(
    ({ LayoutSlice }) => LayoutSlice.message
  );
  const dispatch = useDispatch();
  useEffect(() => {
    show &&
      type !== AlertEnum.Call &&
      setTimeout(() => {
        dispatch(setMessage({ type: "", text: "", subText: "", show: false }));
      }, 3000);
  });

  switch (type) {
    case AlertEnum.Success:
      return (
        <div
          className={`alert alert-success ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text.toString()}
        </div>
      );
    case AlertEnum.Error:
      return (
        <div
          className={`alert alert-danger ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text.toString()}
        </div>
      );
    case AlertEnum.Warning:
      return (
        <div
          className={`alert alert-warning ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text.toString()}
        </div>
      );
    case AlertEnum.Booking:
      return (
        <div
          className={`alert alert-primary ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text.toString()}
          <p>{subText.toString()}</p>
        </div>
      );
    case AlertEnum.Message:
      return (
        <div
          className={`alert alert-primary ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text.toString()}
          <p>{subText.toString()}</p>
        </div>
      );
    case AlertEnum.Call:
      return (
        <div
          className={`alert alert-primary ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text.toString()}
          <div className="">
            <button className="button-accept">Accept</button>
            <button className="button-decline">Decline</button>
          </div>
        </div>
      );
    default:
      return (
        <div
          className={`alert alert-primary ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text.toString()}
        </div>
      );
  }
}

export default LayoutProvider;
