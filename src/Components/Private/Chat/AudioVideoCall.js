import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  createMicrophoneAudioTrack,
} from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { GetToken } from "../../../Store/Reducers/CallingReducer";
import { async } from "@firebase/util";
const appId = "28a539781ef8461784c6debcf0723aca"; //ENTER APP ID HERE
const token = null;
const config = {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
};
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flex: 1,
    backgroundColor: "#007bff22",
  },
  heading: { textAlign: "center", marginBottom: 0 },
  videoContainer: { display: "flex", flexDirection: "column", flex: 1 },
  nav: { display: "flex", justifyContent: "space-around" },
  btn: {
    backgroundColor: "#007bff",
    cursor: "pointer",
    borderRadius: 5,
    padding: "4px 8px",
    color: "#ffffff",
    fontSize: 20,
  },
  input: { display: "flex", height: 24, alignSelf: "center" },
};
const useClient = createClient(config);
const useMicroPhone = createMicrophoneAudioTrack();
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const Call = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [videocall, setVideocall] = useState(false);
  const [isHost, setHost] = useState(true);
  const [isPinned, setPinned] = useState(false);
  const [username, setUsername] = useState("");
  const rtcProps = {
    appId: "28a539781ef8461784c6debcf0723aca",
    // appId: 'de28854847e140e58f73e2568edca676',
    channel: "test", // your agora channel
    token: "", // use null or skip if using app in testing mode
  };

  let options = {
    // Pass your App ID here.
    appId: rtcProps.appId,
    // Set the channel name.
    channel: rtcProps.channel,
    // Pass your temp token here.
    token: "",
    // Set the user ID.
    uid: 0,
  };

  let channelParameters = {
    // A variable to hold a local audio track.
    localAudioTrack: null,
    // A variable to hold a local video track.
    localVideoTrack: null,
    // A variable to hold a remote audio track.
    remoteAudioTrack: null,
    // A variable to hold a remote video track.
    remoteVideoTrack: null,
    // A variable to hold the remote user id.s
    remoteUid: null,
  };
  async function startBasicCall() {
    // Create an instance of the Agora Engine

    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    // Dynamically create a container in the form of a DIV element to play the remote video track.
    const remotePlayerContainer = document.createElement("div");
    // Dynamically create a container in the form of a DIV element to play the local video track.
    const localPlayerContainer = document.createElement("div");
    // Specify the ID of the DIV container. You can use the uid of the local user.
    localPlayerContainer.id = options.uid;
    // Set the textContent property of the local video container to the local user id.
    localPlayerContainer.textContent = "Local user " + options.uid;
    // Set the local video container size.
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    localPlayerContainer.style.padding = "15px 5px 5px 5px";
    // Set the remote video container size.
    remotePlayerContainer.style.width = "640px";
    remotePlayerContainer.style.height = "480px";
    remotePlayerContainer.style.padding = "15px 5px 5px 5px";
    // Listen for the "user-published" event to retrieve a AgoraRTCRemoteUser object.
    agoraEngine.on("user-published", async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");
      // Subscribe and play the remote video in the container If the remote user publishes a video track.
      if (mediaType == "video") {
        // Retrieve the remote video track.
        channelParameters.remoteVideoTrack = user.videoTrack;
        // Retrieve the remote audio track.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Save the remote user id for reuse.
        channelParameters.remoteUid = user.uid.toString();
        // Specify the ID of the DIV container. You can use the uid of the remote user.
        remotePlayerContainer.id = user.uid.toString();
        channelParameters.remoteUid = user.uid.toString();
        remotePlayerContainer.textContent =
          "Remote user " + user.uid.toString();
        // Append the remote container to the page body.
        document.body.append(remotePlayerContainer);
        // Play the remote video track.
        channelParameters.remoteVideoTrack.play(remotePlayerContainer);
      }
      // Subscribe and play the remote audio track If the remote user publishes the audio track only.
      if (mediaType == "audio") {
        // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track. No need to pass any DOM element.
        channelParameters.remoteAudioTrack.play();
      }
      // Listen for the "user-unpublished" event.
      agoraEngine.on("user-unpublished", (user) => {
        console.log(user.uid + "has left the channel");
      });
    });
    // Listen to the Join button click event.
    document.getElementById("join").onclick = async function () {
      // Join a channel.
      // console.log("Connecting");
      dispatch(
        GetToken({
          user_id: "Doctors_282",
          channel_name: rtcProps.channel,
        })
      ).then(async (res) => {
        console.log("JOINING", res);
        await agoraEngine.join(
          options.appId,
          options.channel,
          "007eJxTYIh+9WVZxdxOhhbh2n2Hjq+0tuFvOByhtTN12jTfa13zd/1XYDCySDQ1tjS3MExNszAxMzS3MEk2S0lNSk4zMDcyTkxOPPzPOtklwDY52iqAiZEBAkF8FoaS1OISBgYAxtohnQ=="
        );
        // Create a local audio track from the audio sampled by a microphone.
        channelParameters.localAudioTrack =
          await AgoraRTC.createMicrophoneAudioTrack();
        // Create a local video track from the video captured by a camera.
        channelParameters.localVideoTrack =
          await AgoraRTC.createCameraVideoTrack();
        // Append the local video container to the page body.
        document.body.append(localPlayerContainer);
        // Publish the local audio and video tracks in the channel.
        await agoraEngine.publish([
          channelParameters.localAudioTrack,
          channelParameters.localVideoTrack,
        ]);
        // Play the local video track.
        channelParameters.localVideoTrack.play(localPlayerContainer);
        console.log("publish success!");
      });
    };
    // Listen to the Leave button click event.
    document.getElementById("leave").onclick = async function () {
      // Destroy the local audio and video tracks.
      channelParameters.localAudioTrack.close();
      channelParameters.localVideoTrack.close();
      // Remove the containers you created for the local video and remote video.
      removeVideoDiv(remotePlayerContainer.id);
      removeVideoDiv(localPlayerContainer.id);
      // Leave the channel
      await agoraEngine.leave();
      console.log("You left the channel");
      // Refresh the page for reuse
      window.location.reload();
    };
  }
  function removeVideoDiv(elementId) {
    console.log("Removing " + elementId + "Div");
    let Div = document.getElementById(elementId);
    if (Div) {
      Div.remove();
    }
  }
  const callbacks = {
    EndCall: () => setVideocall(false),
  };
  useEffect(() => {
    startBasicCall();
    return () => {};
  }, []);

  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <>
          {videocall ? (
            <>
              <div style={styles.nav}>
                <p style={{ fontSize: 20, width: 200 }}>
                  You're {isHost ? "a host" : "an audience"}
                </p>
                <p style={styles.btn} onClick={() => setHost(!isHost)}>
                  Change Role
                </p>
                <p style={styles.btn} onClick={() => setPinned(!isPinned)}>
                  Change Layout
                </p>
              </div>
              <AgoraUIKit
                rtcProps={{
                  appId: "28a539781ef8461784c6debcf0723aca",
                  // appId: 'de28854847e140e58f73e2568edca676',
                  channel: "Channel_Users_173", // your agora channel
                  token: null,
                  //"007eJxTYLAWZGNl2OZgphRRxfaKy4tj/iRe07sToyPXfa5d/6zxRrECg5FFoqmxpbmFYWqahYmZobmFSbJZSmpScpqBuZFxYnJiBqNN8osg22TGOWWMjAwQCOKzMJSkFpcwMAAAK9sdew==", // use null or skip if using app in testing mode
                  role: isHost ? "host" : "audience",
                  layout: isPinned ? layout.pin : layout.grid,
                }}
                rtmProps={{
                  token:
                    "007eJxTYLAWZGNl2OZgphRRxfaKy4tj/iRe07sToyPXfa5d/6zxRrECg5FFoqmxpbmFYWqahYmZobmFSbJZSmpScpqBuZFxYnJiBqNN8osg22TGOWWMjAwQCOKzMJSkFpcwMAAAK9sdew==",
                  username: username || "user",
                  displayUsername: true,
                }}
                callbacks={{
                  EndCall: () => setVideocall(false),
                }}
              />
            </>
          ) : (
            <div style={styles.nav}>
              <input
                style={styles.input}
                placeholder="nickname"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <h3 style={styles.btn} onClick={() => setVideocall(true)}>
                Start Call
              </h3>
            </div>
          )}

          <VideoCall setInCall={setInCall} channelName={channelName} />
        </>
      ) : (
        <ChannelForm
          setInCall={(values) => {
            dispatch(
              GetToken({ user_id: userProfile?.id, channel_name: channelName })
            ).then((res) => {
              setInCall(values);
            });
          }}
          setChannelName={setChannelName}
        />
      )}
    </div>
  );
};

const VideoCall = ({ setInCall, channelName }) => {
  // const { setInCall, channelName } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const { ProfileSlice, CallingSlice } = useSelector((state) => state);
  const { agora_token } = CallingSlice;
  const { userProfile } = ProfileSlice;
  const client = useClient();
  const { ready, tracks, error } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      console.log("init", name);
      client.on("user-joined", async (state) => {
        console.log(state);
      });
      client.on("connection-state-change", async (state) => {
        console.log(state);
      });
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, agora_token, userProfile?.id);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);
  return (
    <div className="App">
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Videos = ({ users, tracks }) => {
  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer
          className="vid"
          videoTrack={tracks}
          style={{ height: "95%", width: "95%" }}
        />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className="vid"
                  videoTrack={user.videoTrack}
                  style={{ height: "95%", width: "95%" }}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export const Controls = ({ tracks, setStart, setInCall }) => {
  const client = useClient();
  // const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};

const ChannelForm = ({ setInCall, setChannelName }) => {
  return (
    <form className="join">
      {config.appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <input
        type="text"
        placeholder="Enter Channel Name"
        required
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();

          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};

export default Call;
