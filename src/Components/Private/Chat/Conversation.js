import { serverTimestamp, Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSnapShot,
  SendMessage,
  toggleDetails,
} from "../../../Store/Reducers/ChatReducer";
import { MessageEnum } from "../../../Utilities/Enums";
import { Icon } from "../../../Utilities/Icons";

function Conversation() {
  const dispatch = useDispatch();
  const { ChatSlice, ProfileSlice } = useSelector((state) => state);
  const { isDetails, snapShot, chat, room } = ChatSlice;
  const { userProfile } = ProfileSlice;
  const chatSetup = () => {
    let chatBot = room?.json_data && JSON.parse(room?.json_data);
  };
  useEffect(() => {
    chatSetup();
    return () => {
      snapShot();
    };
  }, []);

  useEffect(() => {
    if (room) {
      dispatch(
        GetSnapShot({
          doctor_id: userProfile?.id,
          patient_id: room?.user_id || room?.userId,
        })
      );
    }
    return () => {};
  }, [room]);

  return (
    <div className={`${isDetails ? "col-md-6" : "col-md-9"} padding_left_0`}>
      <div className="upcomming_consult_chat_message_box">
        <div class="profile_name_box">
          <div className="row">
            <div className="col-md-3">
              <div className="profile_namesubtitle_box">
                <h3 className="profile_card_name">
                  {room?.userName || room?.name}
                </h3>
                <h5 className="profile_name_subtitle">23 | F</h5>
              </div>
              <h5 className="online_text">Online</h5>
            </div>
            <div className="col-md-9">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="attach-dropdown more_info_btn"
                >
                  <img src={Icon.Dots}></img>
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
                <img src={Icon.Video}></img>
              </Button>
              <Button className="call_btn">
                <img src={Icon.Phone}></img>
              </Button>
              <Button variant="primary" className="mark_complete">
                Mark Complete
              </Button>
            </div>
          </div>
        </div>
        <div id="chat-message-list">
          <div className="chat-message-list-inner">
            <div className="created-date">08.24 Today</div>
            <div className="message-row other-message">
              <div className="message-content">
                <div className="sender_msg_box">
                  <h3 className="sender_name_title">Chief Complaints</h3>
                  <h5 className="sender_name_subtitle">
                    Fever, Cold, Vomiting
                  </h5>
                </div>
                <div className="sender_message_time">08.24</div>
              </div>
            </div>
            <div className="message-row other-message">
              <div className="message-content">
                <div className="sender_msg_box">
                  <h3 className="sender_name_title">Patients History</h3>
                  <h5 className="sender_name_subtitle">
                    Blood Presure Problem
                  </h5>
                </div>
                <div className="sender_message_time">08.24</div>
              </div>
            </div>
            {chat?.map((item, index) => (
              <ChatItem
                key={(item?.sizeOfDocument || 0) + index}
                type={item?.documentType}
                index={index}
                rest={item}
              />
            ))}
          </div>
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

const ChatItem = ({ type, index, rest }) => {
  console.log(type);
  switch (parseInt(type)) {
    case 1: //Image
      return (
        <div
          className={`message-row ${
            rest?.userType === 1 ? "other-message" : "you-message"
          }`}
        >
          <div className="message-content">
            <img className="msg-image" src={rest?.imageUrl} />
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
                <img src={Icon.Doc} className="file_icon" />
                <div>
                  <h4 className="attach_file_name">{rest?.imageName}</h4>
                  <h5 className="attach_file_size">
                    {rest?.extension} - {rest?.sizeOfDocument}
                  </h5>
                </div>
                <img src={Icon.Download} className="file_download_icon" />
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

const ChatInput = () => {
  const dispatch = useDispatch();
  const { ChatSlice, ProfileSlice } = useSelector((state) => state);
  const [text, setText] = useState();
  const [message, setMessage] = useState(MessageEnum);
  const [localFile, setLocalFile] = useState({});

  const { isDetails, snapShot, chat, room } = ChatSlice;
  const { userProfile } = ProfileSlice;

  const prepareMessage = (data, type) => {
    try {
      let tempMessage = { ...message };
      tempMessage.dateTime = Timestamp.now();
      if (type === 0) {
        tempMessage.message = data;
      } else if (type === 1) {
        tempMessage.sizeOfDocument = localFile?.size;
        tempMessage.extension = localFile?.type;
        tempMessage.imageName = localFile?.filename;
        tempMessage.documentType = type;
      } else if (type === 2) {
        tempMessage.sizeOfDocument = localFile?.size;
        tempMessage.extension = localFile?.type;
        tempMessage.imageName = localFile?.filename;
        tempMessage.documentType = type;
      }
      setMessage(tempMessage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content__footer">
      <div className="sendNewMessage">
        <input
          type="text"
          placeholder="Write your message..."
          value={text}
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
            prepareMessage(e.target.value, 0);
          }}
        />

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="attach-dropdown">
            <img src={Icon.Clip}></img>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <img src={Icon.Doc} alt="Avatar" className=" mr_10"></img>
              Documents
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <img src={Icon.Gallary} alt="Avatar" className=" mr_10"></img>
              Photos and videos
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {text && (
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(SendMessage(message)).then((res) => {
                setText("");
                setMessage(MessageEnum);
              });
            }}
          >
            <img src={Icon.Send} alt="send" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Conversation;
