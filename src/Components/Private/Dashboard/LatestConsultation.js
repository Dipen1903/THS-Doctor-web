import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleRoom } from "../../../Store/Reducers/ChatReducer";
import {
  GetConsultDetails,
  GetNewConsults,
} from "../../../Store/Reducers/ConsultationsReducer";
import { ConvertHMS } from "../../../Utilities/Functions";
import Conversation from "../Chat/Conversation";
import UserDetails from "../Chat/UserDetails";

function LatestConsultation() {
  const dispatch = useDispatch();
  const { ChatSlice, ConsultSlice } = useSelector((state) => state);
  const { isDetails } = ChatSlice;
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
        dispatch(GetConsultDetails({ appointment_id: tempList[0]?.id })).then(
          (res) => {
            if (res?.payload) {
              dispatch(toggleRoom(res?.payload));
            }
          }
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (!upcomingConsults?.length) {
      dispatch(GetNewConsults());
    } else {
      intialLoad();
    }
    return () => {};
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
          <div className="col-md-3 padding_right_0">
            <div className="upcomming_consult_chat_list">
              {latest?.length ? (
                latest?.map((item, index) => {
                  var duration = moment.duration(
                    moment(item?.appointment_date_time).diff(moment.now())
                  );
                  var seconds = parseInt(duration.asSeconds());
                  return (
                    <div className="chat_list_box chat_list_box_active">
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
                })
              ) : (
                <div className="empty-data-block">
                  <span className="empty-text">No Consultations</span>
                </div>
              )}
            </div>
          </div>
          <Conversation />
          <UserDetails />
        </div>
      </div>
    </>
  );
}

export default LatestConsultation;
