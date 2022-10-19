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
  try {
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
            "user-published": ({ uid }) => {},
            "user-joined": ({ uid }) => {},

            "crypt-error": (error) => {
              console.log("ERROR AGORA", error);
            },
            EndCall: () => endCall(false),
          }}
        />
      </div>
    );
  } catch (error) {
    return endCall(false);
  }
}

export default AudioVideoCall;
