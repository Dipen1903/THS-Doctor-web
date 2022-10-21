import React, { useEffect } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../Utilities/Enums";
import AgoraRTC from "agora-rtc-react";
function VideoCall({ endCall }) {
  const dispatch = useDispatch();
  const { CallingSlice, ProfileSlice } = useSelector((state) => state);
  const { rtcProps } = CallingSlice;
  const { userProfile } = ProfileSlice;
  // const getDeviceState = async () => {
  //   try {
  //     await AgoraRTC.createMicrophoneAndCameraTracks();
  //   } catch (error) {
  //     dispatch(
  //       setMessage({
  //         text: "Please connect camera/mirophone device",
  //         type: AlertEnum.Error,
  //       })
  //     );
  //     endCall(false);
  //   }
  // };

  useEffect(() => {
    // getDeviceState();
    return () => {};
  }, []);
  return (
    <div style={{ height: "75vh" }}>
      <AgoraUIKit
        styleProps={{
          gridVideoContainer: { height: "75vh" },
          pinnedVideoContainer: { height: "75vh" },
        }}
        rtmCallbacks={{
          channel: {
            MemberJoined: (member) => {
              alert(member);
            },
          },
        }}
        rtcProps={rtcProps}
        rtmProps={{
          ...rtcProps,
          username: userProfile?.name,
          displayUsername: true,
        }}
        callbacks={{
          EndCall: () => endCall(false),
        }}
      />
    </div>
  );
}

export default VideoCall;
