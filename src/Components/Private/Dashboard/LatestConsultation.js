import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearChat, SetUpRoom } from "../../../Store/Reducers/ChatReducer";
import {
  GetConsultDetails,
  GetNewConsults,
} from "../../../Store/Reducers/ConsultationsReducer";
import { ConvertHMS } from "../../../Utilities/Functions";
import TimeLeft from "../../Common/Layouts/TimeLeft";
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
        // dispatch(SetUpRoom(tempList[0]));
      }
    } catch (error) {}
  };
  let interval = () =>
    setInterval(() => {
      dispatch(GetNewConsults());
    }, 15 * 60000);

  const isActive = (item) => {
    try {
      if (item?.status === 1) {
        return true;
      } else if (item?.status === 0) {
        var duration = moment.duration(
          moment(item?.appointment_date_time).diff(moment.now())
        );
        var minutes = duration.asMinutes();
        return parseInt(minutes) > 10 ? false : true;
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (!upcomingConsults?.length) {
      dispatch(GetNewConsults());
    } else {
      intialLoad();
      interval();
    }
    return () => {
      snapShot();
      dispatch(clearChat());
      clearInterval(interval());
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
                    return (
                      <div
                        className={`chat_list_box ${
                          isActive(item) && "chat_list_box_active"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();

                          isActive(item) &&
                            parseInt(room?.lastBookingId) !==
                              parseInt(item?.id) &&
                            dispatch(
                              GetConsultDetails({ appointment_id: item?.id })
                            ).then((res) => {
                              dispatch(SetUpRoom(item));
                            });
                        }}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <h6 className="chat_list_id">
                              ID #{item?.appointment_id}
                            </h6>
                            <div className="chat_title_box">
                              <h4 className="chat_list_title">{item?.name}</h4>
                              <h5 className="chat_list_subtitle">
                                {item?.age}|
                                {item?.gender?.toLowerCase() === "male"
                                  ? "M"
                                  : "F"}
                              </h5>
                            </div>
                          </div>
                          <div className="col-md-6">
                            {item?.status === 1 ? (
                              <div className="in-process-box">
                                <span className="inprocess_tag">
                                  In Process
                                </span>
                              </div>
                            ) : (
                              <div className="time_left_box">
                                <TimeLeft
                                  occuringDate={item?.appointment_date_time}
                                  hide={true}
                                />
                              </div>
                            )}
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
