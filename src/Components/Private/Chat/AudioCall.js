import AgoraRTC from "agora-rtc-sdk-ng";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotifyAPI } from "../../../Routes/Service";
import { SendNotification } from "../../../Store/Reducers/CallingReducer";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { AlertEnum, NotifyEnum } from "../../../Utilities/Enums";
import { Icon } from "../../../Utilities/Icons";
const agoraEngine = AgoraRTC.createClient({
  mode: "rtc",
  role: "host",
  codec: "vp8",
});
let channelParameters = {
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold the remote user id.
  remoteUid: null,
};

const AudioCall = forwardRef(({ endCall }, ref) => {
  const dispatch = useDispatch();
  const [remoteUser, setRemoteUser] = useState();
  const [isMute, setIsMute] = useState(false);
  const { CallingSlice, ChatSlice, ProfileSlice } = useSelector(
    (state) => state
  );
  const { rtcProps } = CallingSlice;
  const { room, chatDoc } = ChatSlice;
  const { userProfile } = ProfileSlice;
  async function startBasicCall() {
    // {console.log("hhhhhhhh")}
    agoraEngine.on("user-published", async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await agoraEngine.subscribe(user, mediaType);
      // Subscribe and play the remote audio track.
      if (mediaType == "audio") {
        channelParameters.remoteUid = user.uid;
        // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track.
        channelParameters.remoteAudioTrack.play();
      }
      // Listen for the "user-unpublished" event.
      agoraEngine.on("user-unpublished", (user) => {
        endCall();
      });
    });

    agoraEngine.on("user-joined", (user) => {
      // console.log("user",user);
      setRemoteUser(user);
    });
  }

  const JoinCall = async function () {
    try {
      // Join a channel.
      await agoraEngine.join(
        rtcProps?.appId,
        rtcProps?.channel,
        rtcProps?.token,
        rtcProps?.uid
      );
      // Create a local audio track from the microphone audio.
      channelParameters.localAudioTrack =
        await AgoraRTC.createMicrophoneAudioTrack();
      // Publish the local audio track in the channel.
      await agoraEngine.publish(channelParameters.localAudioTrack);
    } catch (error) {
      dispatch(
        setMessage({
          text: "Please connect mirophone device",
          type: AlertEnum.Error,
        })
      );
      endCall(false);
    }
  };
  const EndCall = async function () {
    try {
      // Destroy the local audio track.
      channelParameters?.localAudioTrack?.close();
      // Leave the channel
      await agoraEngine.leave();
      endCall();
    } catch (error) {
      dispatch(
        setMessage({
          text: error,
          type: AlertEnum.Error,
        })
      );
    }
  };
  const toggleMute = () => {
    channelParameters.localAudioTrack.setEnabled(isMute ? true : false);
    setIsMute(!isMute);
  };

  useImperativeHandle(
    ref,
    () => ({
      join: () => {
        return JoinCall();
      },
    }),
    [room]
  );
  // console.log("roooooooooooooooooo", room);

  useEffect(() => {
    startBasicCall();
    dispatch(
      SendNotification({
        ...NotifyEnum,
        user_id: room?.userId || room?.user_id,
        booking_id: room?.lastBookingId || room?.id,
        channel_name: rtcProps?.channel,
        uuid: userProfile?.id,
        agora_user_id: rtcProps?.uid,
        incomming_call_type: 0,
        title: userProfile?.name,
        message: "incoming Call",
        user_name: userProfile?.name,
        caller_user_id: userProfile?.id,
        chat_id: chatDoc?.id,
        age: room?.age ? room?.age : 1,
        gender: room?.gender,
      })
    );
    // console.log("NotifyEnum",userProfile);
    // console.log("room",room);
    // console.log("rtcProps",rtcProps);
    // console.log("chatDoc",chatDoc);
    return () => { };
  }, []);
  return (
    <div className="audio-call-container">
      <div className="user-container">
        {remoteUser ? (
          <h3>User Joined {remoteUser?.uid}</h3>
        ) : (
          <h3>Waiting to Join</h3>
        )}
      </div>
      <div className="action-container">
        <button
          className="btn-call-mute"
          onClick={(e) => {
            e.preventDefault();
            toggleMute();
          }}
        >
          {isMute ? (
            <img height={20} width={20} src={Icon.Mute} />
          ) : (
            <img height={20} width={20} src={Icon.Mic} />
          )}
        </button>
        <button
          className="btn-call-end"
          onClick={(e) => {
            e.preventDefault();
            EndCall();
          }}
        >
          <img height={26} width={26} src={Icon.CallEnd} />
        </button>
      </div>
    </div>
  );
});

export default AudioCall;
