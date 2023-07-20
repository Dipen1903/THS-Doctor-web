import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearChat,
  GetConversations,
  SetUpRoom,
} from "../../../Store/Reducers/ChatReducer";
import { GetConsultDetails } from "../../../Store/Reducers/ConsultationsReducer";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../Utilities/Enums";
import { BackGround, Icon } from "../../../Utilities/Icons";
import Conversation from "./Conversation";
import UserDetails from "./UserDetails";

function ChatIndex() {
  const { booking_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ChatSlice, ProfileSlice } = useSelector((state) => state);
  const { conversations, room } = ChatSlice;
  const { userProfile } = ProfileSlice;
  const [filterData, setFilterData] = useState([]);
  const handleFilter = (text) => {
    try {
      let tempPayouts;
      tempPayouts = conversations?.filter(
        (item) =>
          item?.userName?.toLowerCase()?.includes(text?.toLowerCase()) == 1
      );
      if (tempPayouts?.length) {
        setFilterData(tempPayouts);
      }
      if (!tempPayouts?.length) {
        dispatch(
          setMessage({
            type: AlertEnum.Info,
            text: `No conversation found for ${text}`,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (booking_id) {
      dispatch(GetConsultDetails({ appointment_id: booking_id })).then(
        (res) => {
          if (res?.payload) {
            dispatch(SetUpRoom(res?.payload));
          }
        }
      );
    }
    return () => {};
  }, [booking_id]);

  useEffect(() => {
    if (!conversations?.length) {
      dispatch(GetConversations({ doctor_id: userProfile?.id }));
    }
    return () => {
      dispatch(clearChat());
    };
  }, [userProfile]);

  return (
    <Container fluid className="profile_container">
      <h4 className="dashboard_title pt_30 mb_20">Chat</h4>
      <div className="chat_box_bg">
        <div className="row">
          <div className="col-md-3  padding_right_0">
            <div id="search-container">
              <form className="form-inline d-flex justify-content-start align-items-center">
                <img
                  alt="myImg"
                  src={Icon.Search}
                  className="chatting_search"
                ></img>
                <input
                  className="form-control mr-sm-2 border-0 ml_5 pl_35"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => handleFilter(e?.target?.value)}
                />
              </form>
            </div>
            <div id="conversation-list">
              {conversations.length ? (
                ((filterData.length && filterData) || conversations)?.map(
                  (item, index) => (
                    <div
                      key={"user " + item?.lastMessage + item?.lastBookingId}
                      onClick={() => {
                        navigate(`/chat/${item?.lastBookingId || item?.id}`);
                      }}
                      className={`chat_contact_list_box ${
                        room?.lastBookingId?.toString() ===
                          item?.lastBookingId?.toString() ||
                        room?.id?.toString() === item?.lastBookingId?.toString()
                          ? "chat_contact_list_box_active"
                          : ""
                      }`}
                    >
                      <div className="row">
                        <div className="col-md-10 padding_right_0 padding_left_0">
                          <div className="chat_list_display_box">
                            <img
                              className="chat_user_img"
                              src={item?.userImage || BackGround.Profile}
                              alt="Jane Cooper"
                            />
                            <div>
                              <div className="chat_user_name">
                                {item?.userName}
                              </div>
                              <div className="chat_user_name">
                                #{item?.lastBookingId}
                              </div>
                              <div className="chat_user_last_msg">
                                {item?.lastMessage}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 padding_left_0 padding_right_0">
                          <div className="chat_time">
                            {item?.lastMessageTime &&
                              moment(item?.lastMessageTime?.toDate()).fromNow()}
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
                  )
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <Conversation roomData={room} />
          <UserDetails />
        </div>
      </div>
    </Container>
  );
}

export default ChatIndex;
