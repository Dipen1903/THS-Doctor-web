import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  GetRejectionDetails,
  GetUserProfile,
  nextStep,
} from "../../../Store/Reducers/ProfileReducer";
import { BackGround } from "../../../Utilities/Icons";

function DoctorStatus() {
  const { userProfile, rejectionDetails } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isProfileNotCompleted = () =>
    parseInt(userProfile?.basic_information_done) &&
    parseInt(userProfile?.work_profile_done) &&
    parseInt(userProfile?.qualification_documents_done);
  const isSchedulePaymentCompleted = () =>
    parseInt(userProfile?.doctor_availablity_done) &&
    parseInt(userProfile?.bank_details_done);

  useEffect(() => {
    dispatch(GetUserProfile()).then((res) => {
      if (parseInt(res?.payload?.is_active) === 2) {
        dispatch(GetRejectionDetails());
      }
    });
    return () => {};
  }, []);
  return (
    <>
      {/* Payment and Schedule Profile not submitted */}
      {!isProfileNotCompleted() ? (
        //Personal and Work Profile not submitted
        <div className="admin-bottom-content">
          <img src="" alt="" />
          <div className="row text-center">
            <div className="col-md-12">
              <center>
                {" "}
                <img
                  src={BackGround.Caution}
                  alt="Avatar"
                  className="avatar3 mt_60"
                ></img>
              </center>
              <h4 className="welcome-text mt_20 joincommnity">
                Join THS's Growing Doctors Community
              </h4>
            </div>
          </div>
          <div className="row mt_10">
            <div className="col-md-12">
              <center>
                <h3 className="medical-text  pleasefill">
                  Please fill out your profile and verify your identity before
                  starting. Thanks!
                </h3>
                <h3 className="profile-bottom-text mt_10">
                  Once profile verificatin completed, you will get online
                  consultaion requests.
                </h3>
                <button
                  className="profile_btn mb_40"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/details/personal-work");
                    dispatch(nextStep(1));
                  }}
                >
                  Fill Out My Profile
                </button>
              </center>
            </div>
          </div>
        </div>
      ) : !isSchedulePaymentCompleted() ? (
        <div className="admin-bottom-content">
          <img src="" alt="" />
          <div className="row text-center">
            <div className="col-md-12">
              <center>
                {" "}
                <img
                  src={BackGround.Caution}
                  alt="Avatar"
                  className="avatar3 mt_60 mb_30"
                ></img>
              </center>
              <h4 className="welcome-text mt_20 joincommnity">
                Join THS's Growing Doctors Community
              </h4>
            </div>
          </div>
          <div className="row mt_10">
            <div className="col-md-12">
              <center>
                <h3 className="medical-text  pleasefill">
                  Please fill out your profile and verify your identity before
                  starting. Thanks!
                </h3>
                <h3 className="profile-bottom-text mt_10 mb_30">
                  Once profile verificatin completed, you will get online
                  consultaion requests.
                </h3>

                <button
                  className="profile_btn mb_40"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/details/schedule-payment");
                    dispatch(nextStep(1));
                  }}
                >
                  Set up Schedule & Payment
                </button>
              </center>
            </div>
          </div>
        </div>
      ) : userProfile?.is_active === 2 ? (
        //* Verification Failed
        <div className="admin-bottom-content">
          <img src="" alt="" />
          <div className="row text-center">
            <div className="col-md-12">
              <center>
                {" "}
                <img
                  src={BackGround.Stop}
                  alt="Avatar"
                  className="avatar3 mt_60"
                ></img>
              </center>
              <h4 className="welcome-text mt_20 joincommnity">
                Verification on hold!
              </h4>
            </div>
          </div>
          <div className="row mt_10">
            <div className="col-md-12">
              <center>
                <h3 className="medical-text  pleasefill">
                  Please fill out required detail again. Thanks!
                </h3>
                <h3 className="id_proof">Note: {rejectionDetails?.reason}</h3>

                <h3 className="profile-bottom-text mt_10">
                  Please fill Profile details to get verified and start
                  consulting online on THS
                </h3>
                <Link to="/reverify">
                  <button className="profile_btn mb_40">Edit My Profile</button>
                </Link>
              </center>
            </div>
          </div>
        </div>
      ) : (
        userProfile?.is_active === 0 && (
          //* Verification Pending
          <div className="admin-bottom-content">
            <div class="d-block justify-content-center text-center">
              <img
                src={BackGround.Email}
                alt="Avatar"
                class="avatar2 mt_100 mb_5"
              ></img>
              <h4 class="welcome-text mt_20">
                Welcome to <br />
                THS’s growing Doctors Community
              </h4>
            </div>
            <div className="row mt_20">
              <div className="col-md-12">
                <center>
                  <h3 className="medical-text mt_20">
                    Our Medical Expert will check and confirm
                    <br />
                    about your profile within 2-3 business days.
                  </h3>
                  <h3 className="profile-bottom-text mt_15 mb_20">
                    Once profile verificatin completed, you will get online
                    consultaion requests.
                  </h3>
                </center>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default DoctorStatus;
