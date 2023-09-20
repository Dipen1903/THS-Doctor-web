import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  GetSnapShot,
  SendMessage,
  toggleDetails,
  UpdateRoom,
} from "../../../Store/Reducers/ChatReducer";
import { UploadFile } from "../../../Store/Reducers/CommonReducer";
import { MessageEnum } from "../../../Utilities/Enums";
import { BackGround, Icon } from "../../../Utilities/Icons";
import { useNavigate } from "react-router-dom";
import VideoCall from "./VideoCall";

import AudioCall from "./AudioCall";
import {
  CompleteConsult,
  GetPrescDetails,
  toggleReview,
} from "../../../Store/Reducers/ConsultationsReducer";
import PresciptionDetails from "../Prescription/PresciptionDetails";
import { GetToken } from "../../../Store/Reducers/CallingReducer";

function Conversation({ roomData }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { ChatSlice, ProfileSlice, ConsultSlice } = useSelector(
    (state) => state
  );
  const { isReview, prescDetails, constDetails  , complete} = useSelector(
    ({ ConsultSlice }) => ConsultSlice
  );
  const navigate = useNavigate();
  const { isDetails, snapShot, chat, room } = ChatSlice;
  const { userProfile } = ProfileSlice;
  const { consultDetails } = ConsultSlice;

  const [videocall, setVideocall] = useState(false);
  const [audiocall, setAudiocall] = useState(false);
  const [chatBot, setChatBot] = useState([]);
  const [localFile, setLocalFile] = useState();
  const messagesEndRef = useRef(null);
  const inputRef = useRef();
  const audioRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  console.log("complete",complete);
  useEffect(() => {
    scrollToBottom();
  }, [chat]);
  useEffect(() => {
    // {console.log("location",location)}
    if (location.state) {
      if (location.state?.incomming_call_type == 0) {
        setAudiocall(true);
        audioRef.current.join();
      }
      if (location.state?.incomming_call_type == 1) {
        setVideocall(true);
      }
    }

    return () => { };
  }, [location.state]);

  useEffect(() => {
    if (roomData) {
      dispatch(
        GetSnapShot({
          doctor_id: userProfile?.id,
          user_id: roomData?.user_id || roomData?.userId,
          booking_id: roomData?.lastBookingId || roomData?.id,
        })
      );
    }
    return () => {
      snapShot();
    };
  }, [roomData]);
  useEffect(() => {
    let tempData = JSON.parse(consultDetails?.json_data || "{}");
    // console.log("tempDatatempData", tempData);
    setChatBot(tempData?.data);
    return () => { };
  }, [consultDetails]);


  // console.log("consultDetailsconsultDetails", consultDetails);
  const [show, setShow] = useState(false);
  const [markCompleteButtonShown, setMarkCompleteButtonShown] = useState(false);
  // console.log("show", show)
  return room ? (
    <>
      <MarkModal
        show={show}
        onHide={() => {
          navigate("/dashboard");
          setShow(false);
        }}
      />
      <div className={`${isDetails ? "col-md-6" : "col-md-9"} padding_left_0`}>
        <PresciptionDetails />
        <div className="upcomming_consult_chat_message_box">
          <div className="profile_name_box">
            {/* {console.log("room", room)} */}
            <div className="row">
              <div className="col-md-6">
                <div className="profile_namesubtitle_box">
                  <h3 className="profile_card_name">
                    {room?.userName || room?.name}
                  </h3>
                  <h5 className="profile_name_subtitle">
                    {room?.age} |{" "}
                    {room?.gender && room?.gender?.toLowerCase() === "male"
                      ? "M"
                      : "F"}
                  </h5>
                </div>
                <h5
                  className={
                    !parseInt(room?.userOnlineStatus)
                      ? "online_text"
                      : "offline_text"
                  }
                >
                  {!parseInt(room?.userOnlineStatus) ? "Online" : "Offline"}
                </h5>
              </div>

              <div className="col-md-6 chat-head-right">
                <div className="d-flex">
                  {console.log(" val?.documentType",chat)}
                  {chat.some((val) => val?.documentType === 4) && (
                    <Button
                      key="markCompleteButton"
                      variant="primary"
                      className="mark_complete"
                      onClick={() => {
                        setShow(true);
                    
                      }}
                    >
                      Mark Complete
                    </Button>
                  )}
                  <Button
                    className="call_btn"
                    disabled={audiocall || videocall}
                    onClick={() => {
                      dispatch(UpdateRoom({ isCallingStatus: 1 })).then((res) => {
                        setAudiocall(true);
                        audioRef?.current?.join();
                        // dispatch(
                        //   GetToken({
                        //     user_id: userProfile?.id,
                        //     channel_name: `Channel_${userProfile?.id}_${room?.userId}`,
                        //   })
                        // );
                      });
                    }}

                  >
                    <img alt="myImg" src={Icon.Phone} />
                  </Button>
                  <Button
                    className="call_btn"
                    disabled={audiocall || videocall}
                    onClick={() => {
                      dispatch(UpdateRoom({ isCallingStatus: 1 })).then((res) => {
                        setVideocall(true);
                      });
                    }}
                  >
                    <img alt="myImg" src={Icon.Video} />
                  </Button>
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="attach-dropdown more_info_btn"
                    >
                      <img alt="myImg" src={Icon.Dots}></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          dispatch(toggleDetails(true));
                        }}
                      >
                        Patient info
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>

          {videocall ? (
            <VideoCall
              endCall={() => {
                setVideocall(false);
              }}
            />
          ) : audiocall ? (
            <AudioCall
              ref={audioRef}
              endCall={() => {
                setAudiocall(false);
              }}
            />
          ) : (
            <div id="chat-message-list">
              {/* <div className="created-date">08.24 Today</div> */}
              {localFile ? (
                <div className="attach_items_box">
                  <div className="row">
                    <div className="col-md-12">
                      <img
                        alt="myImg"
                        src={Icon.Cross}
                        onClick={(e) => {
                          e.preventDefault();
                          setLocalFile("");
                          scrollToBottom();
                          inputRef.current.clearMessage("");
                        }}
                        className="attach_cross"
                      />
                    </div>
                    <div className="col-md-12">
                      <div className="attach_img_box">
                        <center>
                          {localFile?.type?.includes("image") ? (
                            <img
                              src={URL.createObjectURL(localFile)}
                              alt="file"
                            />
                          ) : (
                            <div className="attach_doc_img_box">
                              <img
                                src={Icon.Doc}
                                className="attch_doc_img"
                                alt="doc"
                              />
                              <h5 className="attch_doc_title">
                                {localFile?.name}
                              </h5>
                              <h6 className="attach_doc_size">
                                {localFile?.type?.split("/")[1].toUpperCase()} -{" "}
                                {localFile?.size} mb
                              </h6>
                            </div>
                          )}
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat-message-list-inner">
                  {chatBot?.length &&
                    chatBot?.map(
                      ({ chatBoatQuestionsWithOptions }, index) =>
                        chatBoatQuestionsWithOptions && (
                          <>
                            <ChatItem
                              key={
                                chatBoatQuestionsWithOptions?.finalAnswer + index
                              }
                              index={index}
                              type={0}
                              rest={{
                                userType: 1,
                                question:
                                  chatBoatQuestionsWithOptions?.messageList
                                    ?.length &&
                                  chatBoatQuestionsWithOptions?.messageList[0],
                                answer: chatBoatQuestionsWithOptions?.finalAnswer,
                              }}
                            />
                          </>
                        )
                    )}
               
                  {chat?.map((item, index) => (
                    <ChatItem
                      key={(item?.sizeOfDocument || 0) + index}
                      type={item?.documentType}
                      index={index}
                      rest={item}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
              <ChatInput
                ref={inputRef}
                localFile={localFile}
                setLocalFile={setLocalFile}
              />
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

const MarkModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ChatSlice, ProfileSlice, ConsultSlice } = useSelector(
    (state) => state
  );
  const { isDetails, snapShot, chat, room } = ChatSlice;
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <center>
          {/* <img alt="myImg" src={BackGround.Succcess}></img>
          <h3 className="welcome_ths">Welcome to THS</h3> */}
          <p className="please_fill_out_profile">
            Are you sure you want to Complete ?
          </p>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex" style={{ gap: "10px" }}>
          <Button
            className="my_work_profile_btn"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                CompleteConsult({
                  appointment_id: room?.lastBookingId || room?.id,
                })
              ).then((res) => {
                window.location='/doctor/dashboard';
              });
            }}
          >
            yes
          </Button>
          <Button
            className="my_work_profile_btn"
            onClick={() => {
              props.onHide();
            }}
          >
            No
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const ChatItem = ({ type, index, rest }) => {
  const dispatch = useDispatch();

  switch (parseInt(type)) {
    case 1: //Image

      return (
        <div
          className={`message-row ${rest?.userType === 1 ? "other-message" : "you-message"
            }`}
        >
          <div className="message-content">
            <div
              className={`${rest?.message &&
                (rest?.userType === 1 ? "sender_msg_box" : "client_msg_box")
                }`}
            >
              <img alt="myImg" className="msg-image" src={rest?.imageUrl} />
       
              {rest?.message && (
                <h3
                  className={`${rest?.userType === 1
                    ? "sender_text_title"
                    : "client_text_title"
                    }`}
                >
                  {rest?.message}
                </h3>
              )}
            </div>
            <div
              className={`${rest?.userType === 1
                ? "sender_message_time"
                : "client_message_time"
                }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
    case 2: //Video
  
      return (
        <div
          className={`message-row ${rest?.userType === 1 ? "other-message" : "you-message"
            }`}
        >
          <div className="message-content">
            <div
              className={`${rest?.message &&
                (rest?.userType === 1 ? "sender_msg_box" : "client_msg_box")
                }`}
            >
              <iframe
                // ref={videoRef}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                autoSave="false"
                width="200px"
                height="200px"
                src={rest?.imageUrl}
              ></iframe>
              {rest?.message && (
                <h3
                  className={`${rest?.userType === 1
                    ? "sender_text_title"
                    : "client_text_title"
                    }`}
                >
                  {rest?.message}
                </h3>
              )}
            </div>
            <div
              className={`${rest?.userType === 1
                ? "sender_message_time"
                : "client_message_time"
                }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
    case 3: //Document
      return (
        <div
          className={`message-row ${rest?.userType === 1 ? "other-message" : "you-message"
            }`}
        >
          <div className="message-content">
            <div
              className={`${rest?.userType === 1 ? "sender_msg_box" : "client_msg_box"
                }`}
            >
              <div className="attach_file_box">
                <img alt="myImg" src={Icon.Doc} className="file_icon" />
                <div>
                  <h4 className="attach_file_name">{rest?.imageName}</h4>
                  <h5 className="attach_file_size">
                    {rest?.extension} - {rest?.sizeOfDocument}
                  </h5>
                </div>
                {rest?.userType === 1 && (
                  <a
                    href={rest?.imageUrl}
                    download={rest?.imageName}
                    target="_blank"
                  >
                    <img
                      alt="myImg"
                      src={Icon.DownloadWhite}
                      className="file_download_icon"
                    />
                  </a>
                )}
              </div>
              {rest?.message && (
                <h3
                  className={`${rest?.userType === 1
                    ? "sender_text_title"
                    : "client_text_title"
                    }`}
                >
                  {rest?.message}
                </h3>
              )}
            </div>
            <div
              className={`${rest?.userType === 1
                ? "sender_message_time"
                : "client_message_time"
                }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
    case 4: //Prescription

      return (
        <div
          className={`message-row ${rest?.userType === 1 ? "other-message" : "you-message"
            }`}
        >
     
          <div className="message-content">
            <div
              className={`${rest?.userType === 1 ? "sender_msg_box" : "client_msg_box"
                }`}
            >
              <div className="msg_view_box">
                <div>
                  <h3 className="sender_name_subtitle">Prescription</h3>
                  <h5 className="sender_name_subtitle">
                    Appointment : {rest?.imageName}
                  </h5>
                </div>
                {rest?.imageName && (
                  <button
                    variant="primary"
                    className="msg_view_btn"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        GetPrescDetails({ booking_id: rest?.imageName })
                      );
                      dispatch(toggleReview(true));
                    }}
                  >
                    View
                  </button>
                )}
              </div>
            </div>
            <div
              className={`${rest?.userType === 1
                ? "sender_message_time"
                : "client_message_time"
                }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div
          className={`message-row ${rest?.userType === 1 ? "other-message" : "you-message"
            }`}
        >
          <div className="message-content">
            <div
              className={`${rest?.userType === 1 ? "sender_msg_box" : "client_msg_box"
                }`}
            >
              {rest?.question ? (
                <>
                  <h3 className="sender_name_title yellow">{rest?.question}</h3>
                  <h5 className="sender_name_subtitle yellow">
                    {rest?.answer}
                  </h5>
                </>
              ) : (
                <h3
                  className={`${rest?.userType === 1
                    ? "sender_text_title"
                    : "client_text_title"
                    }`}
                >
                  {rest?.message}
                </h3>
              )}
            </div>
            <div
              className={`${rest?.userType === 1
                ? "sender_message_time"
                : "client_message_time"
                }`}
            >
              {rest?.dateTime &&
                moment(rest?.dateTime?.toDate()).format("hh:mm")}
            </div>
          </div>
        </div>
      );
  }
};

const ChatInput = React.forwardRef(({ localFile, setLocalFile }, ref) => {
  const dispatch = useDispatch();
  const { ChatSlice } = useSelector((state) => state);
  const { room } = ChatSlice;
  const [text, setText] = useState();
  const [message, setMessage] = useState(MessageEnum);

  const docRef = useRef();
  const mediaRef = useRef();

  const prepareMessage = (data, type) => {
    try {
      let tempMessage = { ...message };
      tempMessage.dateTime = Timestamp.now();
      if (typeof data === "string") tempMessage.message = data;
      if (type !== 0) {
        tempMessage.sizeOfDocument = data?.size;
        tempMessage.extension = data?.type;
        tempMessage.imageName = data?.name;
        tempMessage.documentType = type;
      }
      setMessage(tempMessage);
    } catch (error) {
      // console.error(error);
    }
  };

  const handleDoc = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setLocalFile(e.target.files[0]);
    prepareMessage(file, 3);
  };
  const handleMedia = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let type = file?.type.includes("image") ? 1 : 2;
    setLocalFile(e.target.files[0]);
    prepareMessage(file, type);
  };

  const send = async (e) => {
    e.preventDefault();
    if (!localFile) {
      dispatch(SendMessage(message));
    } else {
      dispatch(UploadFile({ file: localFile })).then(({ payload }) => {
        let tempMessage = { ...message };
        tempMessage.imageUrl = payload?.data;
        dispatch(SendMessage(tempMessage));
      });
    }
    setText("");
    setMessage(MessageEnum);
    setLocalFile(undefined);
  };
  useImperativeHandle(
    ref,
    () => ({
      clearMessage: () => {
        return setMessage({ ...MessageEnum });
      },
    }),
    [localFile]
  );

  return (
    <div className="content__footer">
      <div className="sendNewMessage">
        <input
          type="text"
          placeholder="Write your message..."
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (text || localFile)) {
              send(e);
            }
          }}
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
            prepareMessage(e.target.value, 0);
          }}
        />

        {!localFile && (
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="attach-dropdown">
              <img alt="myImg" src={Icon.Clip}></img>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <input
                ref={docRef}
                onChange={handleDoc}
                type="file"
                accept={`application/pdf`}
                hidden
              />
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  docRef?.current?.click();
                }}
              >
                <img src={Icon.Doc} alt="Avatar" className=" mr_10" />
                Documents
              </Dropdown.Item>
              <input
                ref={mediaRef}
                onChange={handleMedia}
                type="file"
                accept={`image/png, image/gif, image/jpeg, video/mp4, video/x-m4v, video/*`}
                hidden
              />
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  mediaRef?.current?.click();
                }}
              >
                <img src={Icon.Gallary} alt="Avatar" className=" mr_10" />
                Photos and Videos
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {(text || localFile) && (
          <button onClick={send}>
            <img src={Icon.Send} alt="send" />
          </button>
        )}
      </div>
      <Link to={`/prescription/${room?.id || room?.lastBookingId}`}>
        <button className="prescription">
          <img alt="myImg" src={BackGround.Prescription} />
        </button>
      </Link>
    </div>
  );
});

export default Conversation;
