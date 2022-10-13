import React, { useEffect } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import { useSelector } from "react-redux";
function AudioVideoCall({ endCall }) {
  const { CallingSlice, ProfileSlice } = useSelector((state) => state);
  const { rtcProps } = CallingSlice;
  const { userProfile } = ProfileSlice;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <AgoraUIKit
        styleProps={{
          gridVideoContainer: { height: "100vh" },
          pinnedVideoContainer: { height: "100vh" },
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
          "user-published": ({ uid }) => {},
          "user-joined": ({ uid }) => {},

          EndCall: () => endCall(false),
        }}
      />
    </div>
  );
}

export default AudioVideoCall;
