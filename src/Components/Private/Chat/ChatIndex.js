import React from "react";
import { Container } from "react-bootstrap";
import { BackGround, Icon } from "../../../Utilities/Icons";

function ChatIndex() {
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
              <div className="chat_contact_list_box chat_contact_list_box_active">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                    <div className="chat_message_count">2</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                    <div className="chat_message_count">2</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
              <div className="chat_contact_list_box">
                <div className="row">
                  <div className="col-md-10 padding_right_0 padding_left_0">
                    <div className="chat_list_display_box">
                      <img
                        className="chat_user_img"
                        src={BackGround.Profile}
                        alt="Jane Cooper"
                      />
                      <div>
                        <div className="chat_user_name">Jane Cooper</div>
                        <div className="chat_user_last_msg">
                          IDK what else is there to do
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 padding_left_0 padding_right_0">
                    <div className="chat_time">1m ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ChatIndex;
