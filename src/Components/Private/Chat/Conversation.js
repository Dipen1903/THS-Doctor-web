import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSnapShot,
  toggleDetails,
} from "../../../Store/Reducers/ChatReducer";
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
          patient_id: room?.user_id,
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
                <h3 className="profile_card_name">Juli</h3>
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
            {console.log(chat)}
            {chat?.map((item, index) => (
              <div
                key={item?.sizeOfDocument + index}
                className={`message-row ${
                  item?.userType === 1 ? "other-message" : "you-message"
                }`}
              >
                <div className="message-content">
                  <div
                    className={`${
                      item?.userType === 1 ? "sender_msg_box" : "client_msg_box"
                    }`}
                  >
                    <h3
                      class={`${
                        item?.userType === 1
                          ? "sender_text_title"
                          : "client_text_title"
                      }`}
                    >
                      {item?.message}
                    </h3>
                  </div>
                  <div
                    className={`${
                      item?.userType === 1
                        ? "sender_message_time"
                        : "client_message_time"
                    }`}
                  >
                    {moment(new Timestamp(item?.dateTime).toDate()).format(
                      "hh:mm"
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="content__footer">
            <div className="sendNewMessage">
              <input type="text" placeholder="Write your message..." />

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="attach-dropdown"
                >
                  <img src={Icon.chatattach}></img>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <img
                      src={Icon.chatdoc}
                      alt="Avatar"
                      className=" mr_10"
                    ></img>
                    Documents
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <img
                      src={Icon.chatphotovideo}
                      alt="Avatar"
                      className=" mr_10"
                    ></img>
                    Photos and videos
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
