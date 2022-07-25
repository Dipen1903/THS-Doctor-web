import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OwlCarousel from "react-owl-carousel";
import "../Components/Progress bar/Progress_bar.js";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressBar from "../Components/Progress bar/Progress_bar";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";

export default function UserProfile() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <MyModal show={modalShow} onHide={() => setModalShow(false)} />

      <div class="sub_section_2">
        <div class="row">
          <div class="col-md-12">
            <div class="display_t js-fullheight">
              <div class="row">
                <div class="col-md-12">
                  <div class="basic_info_box">
                    <div class="row">
                      <div class="col-md-6"></div>
                      <div class="col-md-6">
                        <span
                          className="skip"
                          onClick={() => setModalShow(true)}
                        >
                          SKIP
                        </span>
                      </div>
                    </div>
                    <h5 class="steps mt_50">Step 1 of 3</h5>
                    <h3 class="info_title">Basic Information</h3>
                    <div class="progress_box">
                      <div class="row">
                        <div class="col-md-3">
                          <h5 class="profile_milestone">Profile Milestone</h5>
                        </div>
                        <div class="col-md-8">
                          <ProgressBar
                            isLoading={false}
                            percent={10}
                            size={"large"}
                            showInfo={true}
                          />
                          <h6 class="progress_bar_subtext">
                            Complete your profile for connect with patients{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div class="basic_info_form_box">
                      <Formik
                        initialValues={{
                          gender: "",
                          // date:Date.now()
                        }}
                        onSubmit={(values) => {
                          console.log("values", values);
                        }}
                      >
                        {({ values, setFieldValue, handleSubmit }) => (
                          <form onSubmit={handleSubmit} id="myForm">
                            <div class="row">
                              <div class="col-md-3">
                                <center>
                                  <img
                                    src={require("../Assets/img/profile.png")}
                                    class="upload_avatar_img"
                                  ></img>
                                </center>
                              </div>
                              <div class="col-md-9">
                                <div class="wrapper">
                                  <label htmlFor="">
                                    <Button
                                      variant="contained"
                                      className="upload_avatar_btn"
                                    >
                                      Upload Your Avatar
                                    </Button>
                                    <input
                                      type="file"
                                      id="upload_avatar"
                                      accept="image/png, image/gif, image/jpeg"
                                      required
                                    />
                                  </label>
                                </div>
                                <div
                                  class="custom-file-container"
                                  data-upload-id="myFirstImage"
                                ></div>
                                <p className="upload_avatar_subtitle">
                                  Your avatar should is a friendly and inviting
                                  head shot. Clearly indentifiable as you.
                                </p>
                              </div>
                            </div>
                            <div class="row mt_20">
                              <div class="col-md-12">
                                <label className="sign_title form-label">
                                  Birthday
                                </label>
                                <div class="input_box">
                                  <div class="form_group">
                                    <input
                                      type="date"
                                      name="date"
                                      placeholder=""
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row mt_20">
                              <div class="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label className="sign_title">
                                    State
                                  </Form.Label>
                                  <Form.Select>
                                    <option>Select</option>
                                  </Form.Select>
                                </Form.Group>
                              </div>
                              <div class="col-md-6">
                                <Form.Group className="mb-3">
                                  <Form.Label className="sign_title">
                                    City
                                  </Form.Label>
                                  <Form.Select>
                                    <option>Select</option>
                                  </Form.Select>
                                </Form.Group>
                              </div>
                            </div>
                            <div class="row mt_20">
                              <div class="row">
                                <div class="col-md-12">
                                  <h5 className="sign_title">Gender</h5>
                                </div>
                              </div>
                              <div class="row mt_20 mb_20">
                                <div class="col-md-12">
                                  <div class="radio_box">
                                    {console.log(values)}
                                    <label className="mr_30" htmlFor={"male"}>
                                      {values?.gender == "male" ? (
                                        <label className="lable_bg">
                                          <svg
                                            width="28"
                                            height="32"
                                            class="svg_icon"
                                            viewBox="0 0 28 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fill="#fff"
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M27.9912 19.1381C27.9912 17.5019 26.8275 16.1376 25.2974 15.853V5.7762C25.2974 4.46895 24.6576 3.25701 23.586 2.53426C22.5795 1.85549 21.3299 1.70144 20.2 2.10614L16.4796 0.822528C13.6207 -0.1639 10.6115 -0.265095 7.77718 0.529785C4.06667 1.57042 1.93941 3.77097 1.61104 6.89899C1.32044 7.28856 1.08955 7.72609 0.932666 8.19819L0.644073 9.06641C0.489184 9.53255 0.659925 10.0224 1.06911 10.2853C1.47815 10.5483 1.98681 10.4951 2.33474 10.1529C2.45355 10.036 2.58348 9.93748 2.72022 9.85511V15.8531C1.19015 16.1377 0.0264435 17.5019 0.0264435 19.1382C0.0264435 20.8399 1.28504 22.2475 2.90555 22.4522C3.31252 24.7363 4.38193 26.8433 6.01711 28.5293C8.152 30.7306 10.9901 31.9429 14.0088 31.9429H14.0099C17.0248 31.9426 19.8592 30.749 21.991 28.5821C23.6563 26.8894 24.7372 24.761 25.1307 22.4498C26.7422 22.2366 27.9912 20.8332 27.9912 19.1381ZM22.931 3.53819C23.6819 4.04454 24.1125 4.86028 24.1125 5.77623V13.6587C22.2731 13.3681 20.8609 11.7475 20.8609 9.79769L20.8118 3.17482C21.5354 2.98094 22.29 3.10593 22.931 3.53819ZM2.0559 8.58379L1.94072 8.93021C3.00494 8.19 4.40865 8.15845 5.52213 8.89686C7.80079 10.4083 10.5278 10.9558 13.2009 10.4384C15.8114 9.93313 18.1022 8.46362 19.6729 6.29281L19.6267 3.18038L16.0991 1.96325C13.4658 1.05475 10.6974 0.960558 8.09287 1.69106C5.4699 2.42669 3.80279 3.74117 3.11398 5.60779C3.21642 5.55335 3.3205 5.50132 3.42753 5.45471C4.60331 4.94294 5.94279 4.96425 7.10228 5.51322C8.42457 6.13921 10.0232 5.80084 10.9897 4.69025L11.1365 4.52152C11.3533 4.27237 11.7278 4.2491 11.973 4.46949C12.2181 4.68988 12.2411 5.07056 12.0242 5.31971L11.8774 5.48845C10.5658 6.99553 8.39642 7.45483 6.6019 6.60528C5.74746 6.20073 4.76042 6.18507 3.89405 6.56214C3.02761 6.93921 2.35761 7.67612 2.0559 8.58379ZM1.21163 19.1381C1.21163 18.1696 1.84933 17.3501 2.72022 17.0894V20.3543C2.72022 20.6363 2.73022 20.9168 2.7497 21.1955C1.86385 20.9445 1.21163 20.1175 1.21163 19.1381ZM14.0099 30.738C16.7082 30.7377 19.245 29.6695 21.153 27.7301C23.0613 25.7904 24.1122 23.2114 24.1121 20.4681V14.8732C21.6173 14.574 19.6753 12.4126 19.6753 9.79759V8.16303C18.0075 9.94561 15.8376 11.1543 13.4221 11.6219C10.4464 12.1979 7.41067 11.5884 4.87393 9.90578C4.57407 9.70693 4.24104 9.59655 3.90541 9.5711V20.3542C3.90541 23.1152 4.95511 25.7182 6.86111 27.6835C8.77141 29.6531 11.3101 30.738 14.0088 30.738H14.0099ZM25.2745 21.1935C25.2892 20.953 25.2974 20.7112 25.2974 20.4682V17.0894C26.1683 17.3501 26.806 18.1696 26.806 19.1381C26.806 20.1151 26.1571 20.9404 25.2745 21.1935ZM7.87353 16.1035C7.26768 16.1035 6.69805 16.3433 6.2696 16.7788C6.03812 17.0141 6.03812 17.3954 6.2696 17.6307C6.50109 17.866 6.87627 17.8659 7.1076 17.6307C7.3122 17.4228 7.5842 17.3082 7.87353 17.3082C8.16286 17.3082 8.43486 17.4228 8.63946 17.6307C8.75516 17.7483 8.90679 17.8072 9.05849 17.8071C9.21012 17.8071 9.36183 17.7483 9.47753 17.6307C9.70901 17.3955 9.70901 17.0141 9.47753 16.7788C9.04901 16.3434 8.47938 16.1035 7.87353 16.1035ZM8.9823 19.7192C8.9823 20.3419 8.4857 20.8467 7.87311 20.8467C7.26052 20.8467 6.76393 20.3419 6.76393 19.7192C6.76393 19.0966 7.26052 18.5918 7.87311 18.5918C8.4857 18.5918 8.9823 19.0966 8.9823 19.7192ZM21.2538 19.7192C21.2538 20.3419 20.7572 20.8467 20.1446 20.8467C19.532 20.8467 19.0354 20.3419 19.0354 19.7192C19.0354 19.0966 19.532 18.5918 20.1446 18.5918C20.7572 18.5918 21.2538 19.0966 21.2538 19.7192ZM18.5406 17.6307C18.3091 17.3954 18.3091 17.0141 18.5406 16.7789C19.4251 15.8799 20.8642 15.88 21.7485 16.7789C21.98 17.0142 21.98 17.3955 21.7485 17.6307C21.6328 17.7483 21.4812 17.8071 21.3295 17.8071C21.1778 17.8071 21.0261 17.7483 20.9104 17.6307C20.4881 17.2015 19.8009 17.2014 19.3786 17.6307C19.1472 17.866 18.772 17.866 18.5406 17.6307ZM15.1505 24.5064C14.8456 24.8162 14.4403 24.9869 14.0091 24.9869C13.578 24.9869 13.1727 24.8163 12.8679 24.5064C12.6365 24.2712 12.2613 24.2712 12.0299 24.5064C11.7984 24.7416 11.7984 25.123 12.0299 25.3583C12.5585 25.8957 13.2615 26.1916 14.0092 26.1916C14.7569 26.1916 15.4599 25.8956 15.9885 25.3583C16.22 25.123 16.22 24.7417 15.9885 24.5064C15.757 24.2712 15.3819 24.2712 15.1505 24.5064Z"
                                            />
                                          </svg>
                                        </label>
                                      ) : (
                                        <svg
                                          width="28"
                                          height="32"
                                          class="svg_icon"
                                          viewBox="0 0 28 32"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            class="fill_svg"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M27.9912 19.1381C27.9912 17.5019 26.8275 16.1376 25.2974 15.853V5.7762C25.2974 4.46895 24.6576 3.25701 23.586 2.53426C22.5795 1.85549 21.3299 1.70144 20.2 2.10614L16.4796 0.822528C13.6207 -0.1639 10.6115 -0.265095 7.77718 0.529785C4.06667 1.57042 1.93941 3.77097 1.61104 6.89899C1.32044 7.28856 1.08955 7.72609 0.932666 8.19819L0.644073 9.06641C0.489184 9.53255 0.659925 10.0224 1.06911 10.2853C1.47815 10.5483 1.98681 10.4951 2.33474 10.1529C2.45355 10.036 2.58348 9.93748 2.72022 9.85511V15.8531C1.19015 16.1377 0.0264435 17.5019 0.0264435 19.1382C0.0264435 20.8399 1.28504 22.2475 2.90555 22.4522C3.31252 24.7363 4.38193 26.8433 6.01711 28.5293C8.152 30.7306 10.9901 31.9429 14.0088 31.9429H14.0099C17.0248 31.9426 19.8592 30.749 21.991 28.5821C23.6563 26.8894 24.7372 24.761 25.1307 22.4498C26.7422 22.2366 27.9912 20.8332 27.9912 19.1381ZM22.931 3.53819C23.6819 4.04454 24.1125 4.86028 24.1125 5.77623V13.6587C22.2731 13.3681 20.8609 11.7475 20.8609 9.79769L20.8118 3.17482C21.5354 2.98094 22.29 3.10593 22.931 3.53819ZM2.0559 8.58379L1.94072 8.93021C3.00494 8.19 4.40865 8.15845 5.52213 8.89686C7.80079 10.4083 10.5278 10.9558 13.2009 10.4384C15.8114 9.93313 18.1022 8.46362 19.6729 6.29281L19.6267 3.18038L16.0991 1.96325C13.4658 1.05475 10.6974 0.960558 8.09287 1.69106C5.4699 2.42669 3.80279 3.74117 3.11398 5.60779C3.21642 5.55335 3.3205 5.50132 3.42753 5.45471C4.60331 4.94294 5.94279 4.96425 7.10228 5.51322C8.42457 6.13921 10.0232 5.80084 10.9897 4.69025L11.1365 4.52152C11.3533 4.27237 11.7278 4.2491 11.973 4.46949C12.2181 4.68988 12.2411 5.07056 12.0242 5.31971L11.8774 5.48845C10.5658 6.99553 8.39642 7.45483 6.6019 6.60528C5.74746 6.20073 4.76042 6.18507 3.89405 6.56214C3.02761 6.93921 2.35761 7.67612 2.0559 8.58379ZM1.21163 19.1381C1.21163 18.1696 1.84933 17.3501 2.72022 17.0894V20.3543C2.72022 20.6363 2.73022 20.9168 2.7497 21.1955C1.86385 20.9445 1.21163 20.1175 1.21163 19.1381ZM14.0099 30.738C16.7082 30.7377 19.245 29.6695 21.153 27.7301C23.0613 25.7904 24.1122 23.2114 24.1121 20.4681V14.8732C21.6173 14.574 19.6753 12.4126 19.6753 9.79759V8.16303C18.0075 9.94561 15.8376 11.1543 13.4221 11.6219C10.4464 12.1979 7.41067 11.5884 4.87393 9.90578C4.57407 9.70693 4.24104 9.59655 3.90541 9.5711V20.3542C3.90541 23.1152 4.95511 25.7182 6.86111 27.6835C8.77141 29.6531 11.3101 30.738 14.0088 30.738H14.0099ZM25.2745 21.1935C25.2892 20.953 25.2974 20.7112 25.2974 20.4682V17.0894C26.1683 17.3501 26.806 18.1696 26.806 19.1381C26.806 20.1151 26.1571 20.9404 25.2745 21.1935ZM7.87353 16.1035C7.26768 16.1035 6.69805 16.3433 6.2696 16.7788C6.03812 17.0141 6.03812 17.3954 6.2696 17.6307C6.50109 17.866 6.87627 17.8659 7.1076 17.6307C7.3122 17.4228 7.5842 17.3082 7.87353 17.3082C8.16286 17.3082 8.43486 17.4228 8.63946 17.6307C8.75516 17.7483 8.90679 17.8072 9.05849 17.8071C9.21012 17.8071 9.36183 17.7483 9.47753 17.6307C9.70901 17.3955 9.70901 17.0141 9.47753 16.7788C9.04901 16.3434 8.47938 16.1035 7.87353 16.1035ZM8.9823 19.7192C8.9823 20.3419 8.4857 20.8467 7.87311 20.8467C7.26052 20.8467 6.76393 20.3419 6.76393 19.7192C6.76393 19.0966 7.26052 18.5918 7.87311 18.5918C8.4857 18.5918 8.9823 19.0966 8.9823 19.7192ZM21.2538 19.7192C21.2538 20.3419 20.7572 20.8467 20.1446 20.8467C19.532 20.8467 19.0354 20.3419 19.0354 19.7192C19.0354 19.0966 19.532 18.5918 20.1446 18.5918C20.7572 18.5918 21.2538 19.0966 21.2538 19.7192ZM18.5406 17.6307C18.3091 17.3954 18.3091 17.0141 18.5406 16.7789C19.4251 15.8799 20.8642 15.88 21.7485 16.7789C21.98 17.0142 21.98 17.3955 21.7485 17.6307C21.6328 17.7483 21.4812 17.8071 21.3295 17.8071C21.1778 17.8071 21.0261 17.7483 20.9104 17.6307C20.4881 17.2015 19.8009 17.2014 19.3786 17.6307C19.1472 17.866 18.772 17.866 18.5406 17.6307ZM15.1505 24.5064C14.8456 24.8162 14.4403 24.9869 14.0091 24.9869C13.578 24.9869 13.1727 24.8163 12.8679 24.5064C12.6365 24.2712 12.2613 24.2712 12.0299 24.5064C11.7984 24.7416 11.7984 25.123 12.0299 25.3583C12.5585 25.8957 13.2615 26.1916 14.0092 26.1916C14.7569 26.1916 15.4599 25.8956 15.9885 25.3583C16.22 25.123 16.22 24.7417 15.9885 24.5064C15.757 24.2712 15.3819 24.2712 15.1505 24.5064Z"
                                            fill="white"
                                          />
                                        </svg>
                                      )}
                                    </label>
                                    <span className="male_title">Male</span>
                                    <input
                                      type="radio"
                                      name="gender"
                                      onChange={(e) =>
                                        setFieldValue("gender", e.target.value)
                                      }
                                      id="male"
                                      value="male"
                                      checked={values?.gender === "male"}
                                      placeholder=""
                                    />
                                    <label className="mr_30" htmlFor={"female"}>
                                      {values?.gender == "female" ? (
                                        <label className="lable_bg_2">
                                          <svg
                                            width="28"
                                            height="32"
                                            class="svg_icon"
                                            viewBox="0 0 28 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fill="#fff"
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M26.5131 20.4391C26.3439 24.5879 26.4044 28.5976 27.8341 30.1712C27.9693 30.3201 28.0218 30.5256 27.9743 30.7204C27.9268 30.9154 27.7856 31.0743 27.5969 31.1452C26.4652 31.5702 24.9008 31.9666 23.0028 31.9666C21.8634 31.9666 20.604 31.8238 19.2454 31.4587C17.4759 30.9831 16.2278 30.3157 15.8018 30.0692C15.2224 30.1641 14.628 30.2143 14.0219 30.2143C13.4157 30.2143 12.8211 30.1641 12.2415 30.0691C11.8156 30.3155 10.5674 30.9831 8.7978 31.4587C7.77935 31.7324 6.48204 31.9659 5.02078 31.9659C3.61414 31.9659 2.0556 31.7497 0.446323 31.1454C0.257647 31.0745 0.11635 30.9155 0.068895 30.7206C0.0214399 30.5257 0.0739304 30.32 0.209124 30.1713C1.63888 28.5977 1.69938 24.5877 1.53016 20.4386C0.907674 19.8572 0.517811 19.0325 0.517811 18.1186C0.517811 17.3161 0.818563 16.5826 1.31318 16.022C1.1052 11.7908 0.994955 8.96126 2.3462 6.34689C2.42189 6.20047 2.50253 6.05404 2.58592 5.91163C3.55707 4.25279 5.36212 3.1795 7.34638 3.06219C8.8831 1.20248 11.1116 0.0940788 13.5052 0.00930159C16.2303 -0.0875325 18.9142 0.573245 21.267 1.91937C23.2858 3.0744 24.7766 4.56407 25.6979 6.34697C27.0484 8.9599 26.9381 11.7897 26.7301 16.0213C27.225 16.582 27.5261 17.3158 27.5261 18.1186C27.5261 19.0328 27.1359 19.8577 26.5131 20.4391ZM24.932 16.3593V19.3708C24.932 19.5823 24.9252 19.7921 24.9131 20.0006C25.719 19.7499 26.3053 19.001 26.3053 18.1186C26.3053 17.2431 25.728 16.4995 24.932 16.2429V16.3352C24.9321 16.3433 24.9321 16.3513 24.932 16.3593ZM3.43247 6.90131C3.49847 6.77369 3.56873 6.64599 3.64144 6.52186C4.44536 5.14866 5.98291 4.28391 7.65406 4.26503L7.66253 4.26487C7.84793 4.26101 8.02142 4.17365 8.13426 4.02745C9.45148 2.3197 11.4251 1.29706 13.5492 1.22176C16.0454 1.13327 18.5039 1.73816 20.6583 2.97084C22.47 4.00736 23.8003 5.32975 24.6124 6.90131C25.6933 8.99268 25.7254 11.2676 25.5481 15.1766C25.3519 15.0955 25.1459 15.0336 24.9324 14.9924V14.3755C24.9324 14.0405 24.6591 13.7689 24.3221 13.7689C23.985 13.7689 23.7117 14.0405 23.7117 14.3755V15.7533C15.3042 15.8425 10.7528 11.8176 9.5383 10.5583C9.3954 10.4101 9.18682 10.3438 8.98418 10.382C8.78131 10.4201 8.61163 10.5576 8.53313 10.7474C7.64621 12.8917 6.09659 14.0136 3.65655 14.2779C3.34687 14.3114 3.11234 14.5714 3.11234 14.881V14.9923C2.89864 15.0335 2.69242 15.0955 2.49604 15.1767C2.31873 11.2687 2.351 8.99382 3.43247 6.90131ZM1.73852 18.1186C1.73852 19.0011 2.32484 19.75 3.13066 20.0007C3.11861 19.7921 3.11182 19.5823 3.11182 19.3708V16.243C2.31584 16.4995 1.73852 17.2431 1.73852 18.1186ZM1.63964 30.2667C2.72806 28.4203 2.91681 25.3508 2.77841 21.1623C2.94046 21.212 3.10815 21.2487 3.27997 21.2724C3.97417 25.1569 6.75655 28.3325 10.4284 29.6093C8.66238 30.3646 5.31992 31.3654 1.63964 30.2667ZM4.33252 19.3707C4.33252 24.6809 8.67916 29.0011 14.0219 29.0011C19.3646 29.0011 23.7113 24.681 23.7113 19.3707V16.9667C20.0048 17.0061 16.6023 16.2953 13.5895 14.8543C11.5857 13.8959 10.1638 12.8023 9.28448 12.005C8.25138 13.916 6.62166 15.036 4.3326 15.4104L4.33252 19.3707ZM19.6045 30.2983C18.8218 30.0903 18.1466 29.8391 17.6135 29.6101C21.2865 28.3339 24.0698 25.1578 24.7642 21.2724C24.9358 21.2488 25.1033 21.2122 25.2652 21.1625C25.1267 25.3515 25.3154 28.421 26.4044 30.2674C24.2488 30.9146 21.9653 30.9255 19.6045 30.2983ZM11.9103 24.1529C13.0748 25.3104 14.9696 25.3104 16.1342 24.1529C16.3725 23.916 16.759 23.916 16.9974 24.1529C17.2358 24.3898 17.2358 24.7739 16.9974 25.0108C16.1771 25.826 15.0997 26.2336 14.0223 26.2336C12.9449 26.2336 11.8674 25.826 11.0472 25.0108C10.8088 24.7739 10.8088 24.3898 11.0472 24.1529C11.2855 23.916 11.672 23.916 11.9103 24.1529ZM6.72664 17.573C6.48822 17.8099 6.48822 18.1939 6.72664 18.4308C6.96498 18.6677 7.35141 18.6677 7.58976 18.4308C7.98099 18.0421 8.61744 18.0421 9.00868 18.4308C9.12785 18.5493 9.28402 18.6085 9.44027 18.6085C9.59652 18.6085 9.7527 18.5493 9.87187 18.4308C10.1103 18.1939 10.1103 17.8099 9.87187 17.573C9.00479 16.7111 7.59372 16.711 6.72664 17.573ZM21.3172 17.573C21.5557 17.8099 21.5557 18.1939 21.3172 18.4308C21.1981 18.5493 21.0419 18.6085 20.8856 18.6085C20.7294 18.6085 20.5732 18.5493 20.454 18.4308C20.0629 18.0421 19.4264 18.0421 19.0351 18.4308C18.7968 18.6677 18.4103 18.6677 18.172 18.4308C17.9336 18.1939 17.9336 17.8099 18.172 17.573C19.0391 16.7111 20.4501 16.7111 21.3172 17.573Z"
                                            />
                                          </svg>
                                        </label>
                                      ) : (
                                        <svg
                                          width="28"
                                          height="32"
                                          class="svg_icon"
                                          viewBox="0 0 28 32"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            class="fill_svg"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M26.5131 20.4391C26.3439 24.5879 26.4044 28.5976 27.8341 30.1712C27.9693 30.3201 28.0218 30.5256 27.9743 30.7204C27.9268 30.9154 27.7856 31.0743 27.5969 31.1452C26.4652 31.5702 24.9008 31.9666 23.0028 31.9666C21.8634 31.9666 20.604 31.8238 19.2454 31.4587C17.4759 30.9831 16.2278 30.3157 15.8018 30.0692C15.2224 30.1641 14.628 30.2143 14.0219 30.2143C13.4157 30.2143 12.8211 30.1641 12.2415 30.0691C11.8156 30.3155 10.5674 30.9831 8.7978 31.4587C7.77935 31.7324 6.48204 31.9659 5.02078 31.9659C3.61414 31.9659 2.0556 31.7497 0.446323 31.1454C0.257647 31.0745 0.11635 30.9155 0.068895 30.7206C0.0214399 30.5257 0.0739304 30.32 0.209124 30.1713C1.63888 28.5977 1.69938 24.5877 1.53016 20.4386C0.907674 19.8572 0.517811 19.0325 0.517811 18.1186C0.517811 17.3161 0.818563 16.5826 1.31318 16.022C1.1052 11.7908 0.994955 8.96126 2.3462 6.34689C2.42189 6.20047 2.50253 6.05404 2.58592 5.91163C3.55707 4.25279 5.36212 3.1795 7.34638 3.06219C8.8831 1.20248 11.1116 0.0940788 13.5052 0.00930159C16.2303 -0.0875325 18.9142 0.573245 21.267 1.91937C23.2858 3.0744 24.7766 4.56407 25.6979 6.34697C27.0484 8.9599 26.9381 11.7897 26.7301 16.0213C27.225 16.582 27.5261 17.3158 27.5261 18.1186C27.5261 19.0328 27.1359 19.8577 26.5131 20.4391ZM24.932 16.3593V19.3708C24.932 19.5823 24.9252 19.7921 24.9131 20.0006C25.719 19.7499 26.3053 19.001 26.3053 18.1186C26.3053 17.2431 25.728 16.4995 24.932 16.2429V16.3352C24.9321 16.3433 24.9321 16.3513 24.932 16.3593ZM3.43247 6.90131C3.49847 6.77369 3.56873 6.64599 3.64144 6.52186C4.44536 5.14866 5.98291 4.28391 7.65406 4.26503L7.66253 4.26487C7.84793 4.26101 8.02142 4.17365 8.13426 4.02745C9.45148 2.3197 11.4251 1.29706 13.5492 1.22176C16.0454 1.13327 18.5039 1.73816 20.6583 2.97084C22.47 4.00736 23.8003 5.32975 24.6124 6.90131C25.6933 8.99268 25.7254 11.2676 25.5481 15.1766C25.3519 15.0955 25.1459 15.0336 24.9324 14.9924V14.3755C24.9324 14.0405 24.6591 13.7689 24.3221 13.7689C23.985 13.7689 23.7117 14.0405 23.7117 14.3755V15.7533C15.3042 15.8425 10.7528 11.8176 9.5383 10.5583C9.3954 10.4101 9.18682 10.3438 8.98418 10.382C8.78131 10.4201 8.61163 10.5576 8.53313 10.7474C7.64621 12.8917 6.09659 14.0136 3.65655 14.2779C3.34687 14.3114 3.11234 14.5714 3.11234 14.881V14.9923C2.89864 15.0335 2.69242 15.0955 2.49604 15.1767C2.31873 11.2687 2.351 8.99382 3.43247 6.90131ZM1.73852 18.1186C1.73852 19.0011 2.32484 19.75 3.13066 20.0007C3.11861 19.7921 3.11182 19.5823 3.11182 19.3708V16.243C2.31584 16.4995 1.73852 17.2431 1.73852 18.1186ZM1.63964 30.2667C2.72806 28.4203 2.91681 25.3508 2.77841 21.1623C2.94046 21.212 3.10815 21.2487 3.27997 21.2724C3.97417 25.1569 6.75655 28.3325 10.4284 29.6093C8.66238 30.3646 5.31992 31.3654 1.63964 30.2667ZM4.33252 19.3707C4.33252 24.6809 8.67916 29.0011 14.0219 29.0011C19.3646 29.0011 23.7113 24.681 23.7113 19.3707V16.9667C20.0048 17.0061 16.6023 16.2953 13.5895 14.8543C11.5857 13.8959 10.1638 12.8023 9.28448 12.005C8.25138 13.916 6.62166 15.036 4.3326 15.4104L4.33252 19.3707ZM19.6045 30.2983C18.8218 30.0903 18.1466 29.8391 17.6135 29.6101C21.2865 28.3339 24.0698 25.1578 24.7642 21.2724C24.9358 21.2488 25.1033 21.2122 25.2652 21.1625C25.1267 25.3515 25.3154 28.421 26.4044 30.2674C24.2488 30.9146 21.9653 30.9255 19.6045 30.2983ZM11.9103 24.1529C13.0748 25.3104 14.9696 25.3104 16.1342 24.1529C16.3725 23.916 16.759 23.916 16.9974 24.1529C17.2358 24.3898 17.2358 24.7739 16.9974 25.0108C16.1771 25.826 15.0997 26.2336 14.0223 26.2336C12.9449 26.2336 11.8674 25.826 11.0472 25.0108C10.8088 24.7739 10.8088 24.3898 11.0472 24.1529C11.2855 23.916 11.672 23.916 11.9103 24.1529ZM6.72664 17.573C6.48822 17.8099 6.48822 18.1939 6.72664 18.4308C6.96498 18.6677 7.35141 18.6677 7.58976 18.4308C7.98099 18.0421 8.61744 18.0421 9.00868 18.4308C9.12785 18.5493 9.28402 18.6085 9.44027 18.6085C9.59652 18.6085 9.7527 18.5493 9.87187 18.4308C10.1103 18.1939 10.1103 17.8099 9.87187 17.573C9.00479 16.7111 7.59372 16.711 6.72664 17.573ZM21.3172 17.573C21.5557 17.8099 21.5557 18.1939 21.3172 18.4308C21.1981 18.5493 21.0419 18.6085 20.8856 18.6085C20.7294 18.6085 20.5732 18.5493 20.454 18.4308C20.0629 18.0421 19.4264 18.0421 19.0351 18.4308C18.7968 18.6677 18.4103 18.6677 18.172 18.4308C17.9336 18.1939 17.9336 17.8099 18.172 17.573C19.0391 16.7111 20.4501 16.7111 21.3172 17.573Z"
                                          />
                                        </svg>
                                      )}
                                    </label>
                                    <span className="female_title">Female</span>
                                    <input
                                      type="radio"
                                      name="gender"
                                      onChange={(e) =>
                                        setFieldValue("gender", e.target.value)
                                      }
                                      id="female"
                                      value="female"
                                      checked={values?.gender === "female"}
                                      placeholder=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row mt_20">
                              <button class="login_btn" variant="primary">
                                Continue
                              </button>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const MyModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="display_none"></Modal.Header>
      <Modal.Body>
        <center>
          <img src={require("../Assets/img/img_skip.png")}></img>
          <h3 className="skip_registration_title">
            Are you sure you want to skip the registration?
          </h3>
          <p className="only_verified">
            Only Verified doctors are allowed to consult on THS Platform.
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <div className="">
          <Button className="close_btn_1" onClick={props.onHide}>
            Cancel
          </Button>
          <Button className="skip_btn" variant="primary">
            Skip Anyway
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
