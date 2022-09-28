import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDetails } from "../../../Store/Reducers/ChatReducer";
import { Icon } from "../../../Utilities/Icons";

function UserDetails() {
  const dispatch = useDispatch();
  const { ChatSlice, ProfileSlice } = useSelector((state) => state);
  const { isDetails, snapShot, chat, room } = ChatSlice;
  const { userProfile } = ProfileSlice;
  return isDetails ? (
    <div className="col-md-3 padding_left_0">
      <div class="chatprofile_name_box">
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
              <img alt="myImg" src={Icon.userimg} className="chatuserimg"></img>
              <h3 className="userprofile_name_title">{room?.name}</h3>
              <h5 className="userprofile_name_subtitle">
                {room?.age} |{" "}
                {room?.gender.toLowerCase() === "male" ? "M" : "F"}
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
            <h3 className="userprofile_data_value">{room?.blood_group}</h3>
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
        <hr className="userprofile_section_hr_bottom" />
        <div className="row">
          <div className="col-md-12">
            <h3 className="share_file_title">Shared Files</h3>
          </div>
        </div>
        <div className="row mt_10">
          <div className="col-md-8">
            <div className="share_file_box">
              <img
                alt="myImg"
                src={Icon.shareimg}
                className="share_file_icon"
              ></img>
              <div>
                <h3 className="share_file_name">thisfile.pdf</h3>
                <h4 className="share_file_date">Oct 21, 12:56</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3 className="share_file_size">2 MB</h3>
          </div>
        </div>
        <div className="row mt_20">
          <div className="col-md-8">
            <div className="share_file_box">
              <img
                alt="myImg"
                src={Icon.shareimg}
                className="share_file_icon"
              ></img>
              <div>
                <h3 className="share_file_name">word.doc</h3>
                <h4 className="share_file_date">Oct 21, 12:56</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3 className="share_file_size">2 MB</h3>
          </div>
        </div>
        <hr className="userprofile_section_hr_bottom" />
        <div className="row">
          <div className="col-md-12">
            <h3 className="share_img_title">Shared Images</h3>
          </div>
        </div>
        <div className="share_img_box mt_15">
          <img
            alt="myImg"
            src={Icon.sharefileimg1}
            className="share_img_size"
          ></img>
          <img
            alt="myImg"
            src={Icon.sharefileimg2}
            className="share_img_size"
          ></img>
          <img
            alt="myImg"
            src={Icon.sharefileimg3}
            className="share_img_size"
          ></img>
          <img
            alt="myImg"
            src={Icon.sharefileimg4}
            className="share_img_size"
          ></img>
          <img
            alt="myImg"
            src={Icon.sharefileimg5}
            className="share_img_size"
          ></img>
          <img
            alt="myImg"
            src={Icon.sharefileimg6}
            className="share_img_size"
          ></img>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default UserDetails;
