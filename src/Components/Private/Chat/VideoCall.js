import React, { useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import { useDispatch, useSelector } from "react-redux";

import { AlertEnum, NotifyEnum } from "../../../Utilities/Enums";
import { SendNotification } from "../../../Store/Reducers/CallingReducer";
import AgoraRTC from "agora-rtc-react";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";

function VideoCall({ endCall }) {
  const dispatch = useDispatch();
  const { CallingSlice, ProfileSlice, ChatSlice } = useSelector(
    (state) => state
  );
  const { rtcProps } = CallingSlice;
  const { userProfile } = ProfileSlice;
  const { room, chatDoc } = ChatSlice;
  const getDeviceState = async () => {
    try {
      await AgoraRTC.createMicrophoneAndCameraTracks();
    } catch (error) {
      dispatch(
        setMessage({
          text: "Please connect camera/mirophone device",
          type: AlertEnum.Error,
        })
      );
      endCall(false);
    }
  };

  useEffect(() => {
    getDeviceState();
    dispatch(
      SendNotification({
        ...NotifyEnum,
        user_id: room?.userId || room?.user_id,
        booking_id: room?.lastBookingId || room?.id,
        channel_name: rtcProps?.channel,
        uuid: userProfile?.id,
        agora_user_id: rtcProps?.uid,
        incomming_call_type: 1,
        title: userProfile?.name,
        message: "Incoming Call",
        user_name: userProfile?.name,
        caller_user_id: userProfile?.id,
        chat_id: chatDoc?.id,
        age: room?.age,
        gender: room?.gender,
      })
    );
    return () => { };
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
