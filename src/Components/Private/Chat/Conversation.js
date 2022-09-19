import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Icon } from "../../../Utilities/Icons";

function Conversation() {
  return (
    <div className="col-md-6 padding_left_0 padding_right_0">
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
              <Button variant="primary" className="chat_video_btn">
                <img src={Icon.chatvideo}></img>
              </Button>
              <Button variant="primary" className="chat_call_btn">
                <img src={Icon.chatcall}></img>
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
            <div className="message-row you-message">
              <div className="message-content">
                <div className="client_msg_box">
                  <h3 class="client_text_title">Lorem Ipsum is simply dummy</h3>
                </div>
                <div className="client_message_time">08.24</div>
              </div>
            </div>
            <div className="message-row other-message">
              <div className="message-content">
                <div className="sender_msg_box">
                  <h3 className="sender_text_title">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </h3>
                </div>
                <div className="sender_message_time">08.24</div>
              </div>
            </div>
            <div className="message-row you-message">
              <div className="message-content">
                <div className="client_msg_box">
                  <h3 class="client_text_title">
                    It is a long established fact that a reader will be
                    distracted by the readable content
                  </h3>
                </div>
                <div className="client_message_time">08.24</div>
              </div>
            </div>
            <div className="message-row you-message">
              <div className="message-content">
                <img src={Icon.presciption}></img>
              </div>
            </div>
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
