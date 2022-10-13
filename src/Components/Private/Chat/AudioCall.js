import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetToken } from "../../../Store/Reducers/CallingReducer";

let channelParameters = {
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold the remote user id.
  remoteUid: null,
};

export default function AudioCall({ endCall }) {
  const dispatch = useDispatch();
  const { rtcProps } = useSelector(({ CallingSlice }) => CallingSlice);
  const callButtonRef = useRef();
  async function startBasicCall() {
    // Create an instance of the Agora Engine
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
    agoraEngine.on("user-published", async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");

      // Subscribe and play the remote audio track.
      if (mediaType == "audio") {
        channelParameters.remoteUid = user.uid;
        // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track.
        channelParameters.remoteAudioTrack.play();
        showMessage("Remote user connected: " + user.uid);
      }

      // Listen for the "user-unpublished" event.
      agoraEngine.on("user-unpublished", (user) => {
        console.log(user.uid + "has left the channel");
        showMessage("Remote user has left the channel");
      });
    });

    window.onload = function () {
      // Listen to the Join button click event.
      document.getElementById("join").onclick = async function () {
        // Join a channel.
        await agoraEngine.join(rtcProps);
        showMessage("Joined channel: " + rtcProps.channel);
        // Create a local audio track from the microphone audio.
        channelParameters.localAudioTrack =
          await AgoraRTC.createMicrophoneAudioTrack();
        // Publish the local audio track in the channel.
        await agoraEngine.publish(channelParameters.localAudioTrack);
        console.log("Publish success!");
      };

      // Listen to the Leave button click event.
      document.getElementById("leave").onclick = async function () {
        // Destroy the local audio track.
        channelParameters.localAudioTrack.close();
        // Leave the channel
        await agoraEngine.leave();
        endCall();
        console.log("You left the channel");
        // Refresh the page for reuse
        window.location.reload();
      };
    };
  }
  useEffect(() => {
    callButtonRef?.current?.click();

    return () => {};
  }, []);

  useEffect(() => {
    startBasicCall();
    return () => {};
  }, []);

  return <button ref={callButtonRef} hidden />;
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}
