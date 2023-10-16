import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDetails } from "../../../Store/Reducers/ChatReducer";
import { BackGround, Icon } from "../../../Utilities/Icons";

function UserDetails() {
  const dispatch = useDispatch();
  const { ChatSlice, ProfileSlice } = useSelector((state) => state);
  const { isDetails, chat, room } = ChatSlice;
  const [documents, setDocuments] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const tempDoc = [];
    const tempImg = [];
    chat?.map((item) => {
      if (parseInt(item?.documentType) === 3) {
        tempDoc.push(item);
      }
      if (parseInt(item?.documentType) === 1) {
        tempImg.push(item);
      }
      setDocuments(tempDoc);
      setImages(tempImg);
    });

    return () => { };
  }, [chat]);

  return isDetails ? (
    <div className="col-md-3 padding_left_0">
      <div className="chatprofile_name_box">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-6 col-6">
            <div className="profile_namesubtitle_box">
              <h3 className="userinfo_title">User Info</h3>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-6 col-6">
            <div className="user_info_close">
              <img
                alt="myImg"
                src={Icon.Cross}
                onClick={() => {
                  dispatch(toggleDetails(false));
                }}
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="userinfo_box">
        <div className="row">
          <div className="col-md-12">
            <center>
              <img
                alt="myImg"
                src={room?.userImage || BackGround.Profile}
                className="chatuserimg"
              />
              <h3 className="userprofile_name_title">{room?.userName}</h3>

              <h5 className="userprofile_name_subtitle">
                {room?.age} |{" "}
                {room?.gender?.toLowerCase() === "male" ? "M" : "F"}
              </h5>
            </center>
            <hr className="userprofile_hr_bottom" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="userinfo_profile_title">Info</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h3 className="userprofile_data_title">Blood Group</h3>
          </div>
          <div className="col-md-6">
            <h3 className="userprofile_data_value">{room?.bloodGroup}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h3 className="userprofile_data_title">Height</h3>
          </div>
          <div className="col-md-6">
            <h3 className="userprofile_data_value">{room?.height}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h3 className="userprofile_data_title">Weight</h3>
          </div>
          <div className="col-md-6">
            <h3 className="userprofile_data_value">{room?.weight}</h3>
          </div>
        </div>
        {documents?.length ? (
          <>
            <hr className="userprofile_section_hr_bottom" />
            <div className="row">
              <div className="col-md-12">
                <h3 className="share_file_title">Shared Files</h3>
              </div>
            </div>
            {documents?.map((item, index) => (
              <div key={item?.dateTime} className="row mt_10">
                <div className="col-md-8">
                  <div className="share_file_box">
                    <img
                      alt="myImg"
                      src={Icon.Doc}
                      className="share_file_icon"
                    ></img>
                    <div>
                      <h3 className="share_file_name">{item?.imageName}</h3>
                      <h4 className="share_file_date">
                        {item?.dateTime &&
                          moment(item?.dateTime?.toDate()).format(
                            "DD MMM, YYYY hh:mm A"
                          )}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <h3 className="share_file_size">{item?.sizeOfDocument} MB</h3>
                </div>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}

        {images?.length ? (
          <>
            <hr className="userprofile_section_hr_bottom" />
            <div className="row">
              <div className="col-md-12">
                <h3 className="share_img_title">Shared Images</h3>
              </div>
            </div>
            <div className="share_img_box mt_15">
              {images?.map((item, index) => (
                <img
                  key={item?.dateTime}
                  alt="myImg"
                  src={item?.imageUrl}
                  className="share_img_size"
                />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default UserDetails;
