import { serverTimestamp, Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  GetSnapShot,
  SendMessage,
  toggleDetails,
} from "../../../Store/Reducers/ChatReducer";
import { UploadFile } from "../../../Store/Reducers/CommonReducer";
import { MessageEnum } from "../../../Utilities/Enums";
import { BackGround, Icon } from "../../../Utilities/Icons";
import Call from "./AudioVideoCall";

function Conversation({ roomData }) {
  const dispatch = useDispatch();
  const { ChatSlice, ProfileSlice } = useSelector((state) => state);
  const { isDetails, snapShot, chat, room } = ChatSlice;
  const { userProfile } = ProfileSlice;
  const [localFile, setLocalFile] = useState();
  const messagesEndRef = useRef(null);
  const inputRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    if (roomData) {
      dispatch(
        GetSnapShot({
          doctor_id: userProfile?.id,
          user_id: roomData?.user_id,
        })
      );
    }
    return () => {
      snapShot();
    };
  }, [roomData]);

  return room ? (
    <div className={`${isDetails ? "col-md-6" : "col-md-9"} padding_left_0`}>
      <div className="upcomming_consult_chat_message_box">
        <div class="profile_name_box">
          <div className="row">
            <div className="col-md-3">
              <div className="profile_namesubtitle_box">
                <h3 className="profile_card_name">
                  {room?.userName || room?.name}
                </h3>
                <h5 className="profile_name_subtitle">
                  {room?.age} |{" "}
                  {room?.gender.toLowerCase() === "male" ? "M" : "F"}
                </h5>
              </div>
              <h5 className="online_text">Online</h5>
            </div>
            <div className="col-md-9">
              <Call />
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="attach-dropdown more_info_btn"
                >
                  <img alt="myImg" src={Icon.Dots}></img>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(toggleDetails(true));
                    }}
                  >
                    Patient info
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button className="call_btn">
                <img alt="myImg" src={Icon.Video}></img>
              </Button>
              <Button className="call_btn">
                <img alt="myImg" src={Icon.Phone}></img>
              </Button>
              <Button variant="primary" className="mark_complete">
                Mark Complete
              </Button>
            </div>
          </div>
        </div>
        <div id="chat-message-list">
          {/* <div className="created-date">08.24 Today</div> */}
          {localFile ? (
            <div className="attach_items_box">
              <div className="row">
                <div className="col-md-12">
                  <img
                    alt="myImg"
                    src={Icon.Cross}
                    onClick={(e) => {
                      e.preventDefault();
                      setLocalFile("");
                      scrollToBottom();
                      inputRef.current.clearMessage("");
                    }}
                    className="attach_cross"
                  />
                </div>
                <div className="col-md-12">
                  <div className="attach_img_box">
                    <center>
                      {localFile?.type?.includes("image") ? (
                        <img src={URL.createObjectURL(localFile)} alt="file" />
                      ) : (
                        <div className="attach_doc_img_box">
                          <img
                            src={Icon.Doc}
                            className="attch_doc_img"
                            alt="doc"
                          />
                          <h5 className="attch_doc_title">{localFile?.name}</h5>
                          <h6 className="attach_doc_size">
                            {localFile?.type.split("/")[1].toUpperCase()} -{" "}
                            {localFile?.size} mb
                          </h6>
                        </div>
                      )}
                    </center>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="chat-message-list-inner">
              {chat?.map((item, index) => (
                <ChatItem
                  key={(item?.sizeOfDocument || 0) + index}
                  type={item?.documentType}
                  index={index}
                  rest={item}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
          <ChatInput
            ref={inputRef}
            localFile={localFile}
            setLocalFile={setLocalFile}
          />
          <Link to={`/prescription/${room?.id || room?.lastBookingId}`}>
            <button className="prescription">
              <img alt="myImg" src={BackGround.Prescription} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

const ChatItem = ({ type, index, rest }) => {
  switch (parseInt(type)) {
    case 1: //Image
      return (
        <div
          className={`message-row ${
            rest?.userType === 1 ? "other-message" : "you-message"
          }`}
        >
          <div className="message-content">
            <img alt="myImg" className="msg-image" src={rest?.imageUrl} />
            <div
              className={`${
                rest?.userType === 1
                  ? "sender_message_time"
                  : "client_message_time"
              }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
    case 3: //Document
      return (
        <div
          className={`message-row ${
            rest?.userType === 1 ? "other-message" : "you-message"
          }`}
        >
          <div className="message-content">
            <div
              className={`${
                rest?.userType === 1 ? "sender_msg_box" : "client_msg_box"
              }`}
            >
              <div className="attach_file_box">
                <img alt="myImg" src={Icon.Doc} className="file_icon" />
                <div>
                  <h4 className="attach_file_name">{rest?.imageName}</h4>
                  <h5 className="attach_file_size">
                    {rest?.extension} - {rest?.sizeOfDocument}
                  </h5>
                </div>
                <a
                  href={rest?.imageUrl}
                  download={rest?.imageName}
                  target="_blank"
                >
                  <img
                    alt="myImg"
                    src={
                      rest?.userType === 1
                        ? Icon.DownloadWhite
                        : Icon.DownloadGrey
                    }
                    className="file_download_icon"
                  />
                </a>
              </div>
            </div>
            <div
              className={`${
                rest?.userType === 1
                  ? "sender_message_time"
                  : "client_message_time"
              }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
    case 4: //Document
      return (
        <div
          className={`message-row ${
            rest?.userType === 1 ? "other-message" : "you-message"
          }`}
        >
          <div className="message-content">
            <div
              className={`${
                rest?.userType === 1 ? "sender_msg_box" : "client_msg_box"
              }`}
            >
              <div className="msg_view_box">
                <div>
                  <h3 className="sender_name_title">Prescription</h3>
                  <h5 className="sender_name_subtitle">
                    Appointment : {rest?.imageName}
                  </h5>
                </div>
                <a
                  target="_blank"
                  href={rest?.imageUrl}
                  variant="primary"
                  className="msg_view_btn"
                >
                  View
                </a>
              </div>
            </div>
            <div
              className={`${
                rest?.userType === 1
                  ? "sender_message_time"
                  : "client_message_time"
              }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div
          className={`message-row ${
            rest?.userType === 1 ? "other-message" : "you-message"
          }`}
        >
          <div className="message-content">
            <div
              className={`${
                rest?.userType === 1 ? "sender_msg_box" : "client_msg_box"
              }`}
            >
              <h3
                class={`${
                  rest?.userType === 1
                    ? "sender_text_title"
                    : "client_text_title"
                }`}
              >
                {rest?.message}
              </h3>
            </div>
            <div
              className={`${
                rest?.userType === 1
                  ? "sender_message_time"
                  : "client_message_time"
              }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
  }
};

const ChatInput = React.forwardRef(({ localFile, setLocalFile }, ref) => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [message, setMessage] = useState(MessageEnum);

  const docRef = useRef();
  const mediaRef = useRef();

  const prepareMessage = (data, type) => {
    try {
      let tempMessage = { ...message };
      tempMessage.dateTime = Timestamp.now();
      if (typeof data === "string") tempMessage.message = data;
      if (type === 1 || type === 2) {
        tempMessage.sizeOfDocument = data?.size;
        tempMessage.extension = data?.type;
        tempMessage.imageName = data?.name;
        tempMessage.documentType = type;
      }
      setMessage(tempMessage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoc = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setLocalFile(e.target.files[0]);
    prepareMessage(file, 3);
  };
  const handleMedia = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let type = file?.type.includes("image") ? 1 : 2;
    setLocalFile(e.target.files[0]);
    prepareMessage(file, type);
  };

  const send = async (e) => {
    e.preventDefault();
    if (!localFile) {
      dispatch(SendMessage(message));
    } else {
      dispatch(UploadFile({ file: localFile })).then(({ payload }) => {
        let tempMessage = { ...message };
        tempMessage.imageUrl = payload?.data;
        dispatch(SendMessage(tempMessage));
      });
    }
    setText("");
    setMessage(MessageEnum);
    setLocalFile(undefined);
  };
  useImperativeHandle(
    ref,
    () => ({
      clearMessage: () => {
        return setMessage({ ...MessageEnum });
      },
    }),
    [localFile]
  );

  return (
    <div className="content__footer">
      <div className="sendNewMessage">
        <input
          type="text"
          placeholder="Write your message..."
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              dispatch(SendMessage(message));
              setText("");
              setMessage(MessageEnum);
            }
          }}
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
            prepareMessage(e.target.value, 0);
          }}
        />

        {!localFile && (
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="attach-dropdown">
              <img alt="myImg" src={Icon.Clip}></img>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <input
                ref={docRef}
                onChange={handleDoc}
                type="file"
                accept={`application/pdf`}
                hidden
              />
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  docRef?.current?.click();
                }}
              >
                <img src={Icon.Doc} alt="Avatar" className=" mr_10" />
                Documents
              </Dropdown.Item>
              <input
                ref={mediaRef}
                onChange={handleMedia}
                type="file"
                accept={`image/png, image/gif, image/jpeg, video/mp4, video/x-m4v, video/*`}
                hidden
              />
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  mediaRef?.current?.click();
                }}
              >
                <img src={Icon.Gallary} alt="Avatar" className=" mr_10" />
                Photos and Videos
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {(text || localFile) && (
          <button onClick={send}>
            <img src={Icon.Send} alt="send" />
          </button>
        )}
      </div>
    </div>
  );
});

export default Conversation;
