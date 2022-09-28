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
import { useDispatch, useSelector } from "react-redux";
import { GetToken } from "../../../Store/Reducers/CallingReducer";
const appId = "28a539781ef8461784c6debcf0723aca"; //ENTER APP ID HERE
const token = null;
const config = {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
};

const useClient = createClient(config);
const useMicroPhone = createMicrophoneAudioTrack();
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const Call = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
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
