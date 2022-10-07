import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearChat, SetUpRoom } from "../../../Store/Reducers/ChatReducer";
import { GetNewConsults } from "../../../Store/Reducers/ConsultationsReducer";
import { ConvertHMS } from "../../../Utilities/Functions";
import Conversation from "../Chat/Conversation";
import UserDetails from "../Chat/UserDetails";

function LatestConsultation() {
  const dispatch = useDispatch();
  const { ChatSlice, ConsultSlice } = useSelector((state) => state);
  const { room, snapShot } = ChatSlice;
  const { upcomingConsults } = ConsultSlice;
  const [latest, setLatest] = useState([]);
  const intialLoad = () => {
    try {
      let tempList = upcomingConsults.filter(
        (item) =>
          moment(item?.appointment_date).format("DD/MM/YYYY") ==
          moment().format("DD/MM/YYYY")
      );
      if (tempList) {
        setLatest(tempList);
        dispatch(SetUpRoom(tempList[0]));
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (!upcomingConsults?.length) {
      dispatch(GetNewConsults());
    } else {
      intialLoad();
    }
    return () => {
      snapShot();
      dispatch(clearChat());
    };
  }, [upcomingConsults?.length]);

  return (
    <>
      <div className="row mt_30">
        <div className="col-md-12">
          <h3 className="upcomming_consult_title">Upcoming Consultations</h3>
        </div>
      </div>

      <div className="chat_box_bg">
        <div className="row">
          {latest?.length ? (
            <>
              <div className="col-md-3 padding_right_0">
                <div className="upcomming_consult_chat_list">
                  {latest?.map((item, index) => {
                    var duration = moment.duration(
                      moment(item?.appointment_date_time).diff(moment.now())
                    );
                    var seconds = parseInt(duration.asSeconds());
                    return (
                      <div
                        className={`chat_list_box ${
                          item?.status === 1 && "chat_list_box_active"
                        }`}
                        onClick={() => {
                          dispatch(SetUpRoom(item));
                        }}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <h6 class="chat_list_id">
                              ID #{item?.appointment_id}
                            </h6>
                            <div className="chat_title_box">
                              <h4 className="chat_list_title">{item?.name}</h4>
                              <h5 className="chat_list_subtitle">
                                {item?.age}|
                                {item?.gender.toLowerCase() === "male"
                                  ? "M"
                                  : "F"}
                              </h5>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="time_left_box">
                              {ConvertHMS(seconds)} Left
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <h4 className="date_time">
                              {moment(item?.appointment_date_time).format(
                                "DD MMM,YYYY - hh:mm A"
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Conversation roomData={room} />
              <UserDetails />
            </>
          ) : (
            <div className="empty-data-block">
              <span className="empty-text">No Consultations</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LatestConsultation;
