import moment from "moment";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  GetConversations,
  GetSnapShot,
  SetUpRoom,
  toggleRoom,
} from "../../../Store/Reducers/ChatReducer";
import { BackGround, Icon } from "../../../Utilities/Icons";
import Conversation from "./Conversation";
import UserDetails from "./UserDetails";

function ChatIndex() {
  const { booking_id } = useParams();
  const dispatch = useDispatch();
  const { ChatSlice, ProfileSlice } = useSelector((state) => state);
  const { conversations, room } = ChatSlice;
  const { userProfile } = ProfileSlice;

  useEffect(() => {
    if (booking_id) dispatch(SetUpRoom({ booking_id: booking_id }));
    return () => {};
  }, [booking_id]);

  useEffect(() => {
    if (!conversations.length) {
      dispatch(GetConversations({ doctor_id: userProfile?.id }));
    }
    return () => {
      dispatch(toggleRoom(""));
    };
  }, [userProfile]);

  return (
    <Container fluid className="profile_container">
      <h4 className="dashboard_title pt_30 mb_20">Chat</h4>
      <div className="chat_box_bg">
        <div className="row">
          <div className="col-md-3  padding_right_0">
            <div id="search-container">
              <form class="form-inline d-flex justify-content-start align-items-center">
                <img src={Icon.Search} className="chatting_search"></img>
                <input
                  class="form-control mr-sm-2 border-0 ml_5 pl_35"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
            <div id="conversation-list">
              {conversations?.length &&
                conversations?.map((item, index) => (
                  <div
                    key={item?.userId}
                    onClick={() => {
                      dispatch(SetUpRoom({ booking_id: item?.lastBookingId }));
                    }}
                    className={`chat_contact_list_box ${
                      room?.userId?.toString() === item?.userId?.toString() ||
                      room?.user_id?.toString() === item?.userId?.toString()
                        ? "chat_contact_list_box_active"
                        : ""
                    }`}
                  >
                    <div className="row">
                      <div className="col-md-10 padding_right_0 padding_left_0">
                        <div className="chat_list_display_box">
                          <img
                            className="chat_user_img"
                            src={BackGround.Profile}
                            alt="Jane Cooper"
                          />
                          <div>
                            <div className="chat_user_name">
                              {item?.userName}
                            </div>
                            <div className="chat_user_last_msg">
                              {item?.lastMessage}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 padding_left_0 padding_right_0">
                        <div className="chat_time">
                          {moment(item?.lastMessageTime?.toDate()).fromNow()}
                        </div>
                        {parseInt(item?.unreadMessageOfDoctor) ? (
                          <div className="chat_message_count">
                            {item?.unreadMessageOfDoctor}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Conversation />
          <UserDetails />
        </div>
      </div>
    </Container>
  );
}

export default ChatIndex;
