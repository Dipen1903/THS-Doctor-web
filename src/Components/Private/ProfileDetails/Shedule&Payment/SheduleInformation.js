import React, { useEffect } from "react";

import Form from "react-bootstrap/Form";
import { useFormikContext } from "formik";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import { Icon } from "../../../../Utilities/Icons.js";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { toggleFee } from "../../../../Store/Reducers/ProfileReducer.js";
import { SubSpecialityList } from "../../../../Store/Reducers/CommonReducer.js";
import FormControl from "../../../Common/Forms/FormControl.js";

function SheduleInformation() {
  const { values, setFieldValue, handleBlur, handleChange } =
    useFormikContext();
  const dispatch = useDispatch();
  const { feeModal, userProfile } = useSelector(
    ({ ProfileSlice }) => ProfileSlice
  );
  const { subSpecialityList } = useSelector(({ CommonSlice }) => CommonSlice);

  const getFee = () => {
    return (
      subSpecialityList?.length &&
      subSpecialityList?.find(
        (item) => item?.id === userProfile?.sub_speciality_id
      )?.consulting_fee
    );
  };
  const compareTime = (time1, time2) => {
    const [hours1, minutes1, seconds1] = time1.split(":");
    const [hours2, minutes2, seconds2] = time2.split(":");

    const date1 = new Date(2022, 0, 1, +hours1, +minutes1, +seconds1 || "00");
    const date2 = new Date(2022, 0, 1, +hours2, +minutes2, +seconds2 || "00");

    return date1.getTime() > date2.getTime();
  };
  return (
    <>
      <FeeCardModal show={feeModal} onHide={() => dispatch(toggleFee(false))} />
      <div class="basic_info_form_box">
        <div class="row mt_20">
          <div class="col-md-9 col-sm-8">
            <label className="sign_title">Consultation Fee (Rs)</label>
            <div class="input_box">
              <div class="form_group">
                <input
                  type="text"
                  disabled
                  name=""
                  placeholder=""
                  value={userProfile?.consultation_fee?.consulting_fee}
                  required
                />
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-4">
            <button class="fee_card" onClick={() => dispatch(toggleFee(true))}>
              Fee Card
            </button>
          </div>
        </div>
        <div class="row mt_10">
          <div class="col-md-12">
            <span class="consult_fee_subtext">
              You will get 70% of the consultation fees and 30% is THS Platform
              Fees.{" "}
            </span>
          </div>
        </div>
        <hr className="bottom_border mt_30 mb_30" />
        <div class="row">
          <div class="col-md-12">
            <h3 class="time_slot">Online Time Slot Managment</h3>
          </div>
        </div>
        <div class="row mt_20">
          <div class="col-md-12">
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Weekdays" className="tab_inner_box">
                <div class="weekdays_box">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="day_box">
                        <FormControl
                          control="checkbox"
                          name="weekdays.days"
                          options={[
                            { value: "sudisable", key: "S", disabled: true },
                            { value: "monday", key: "M" },
                            { value: "tuesday", key: "T" },
                            { value: "wednsday", key: "W" },
                            { value: "thursday", key: "T" },
                            { value: "friday", key: "F" },
                            { value: "sadisable", key: "S", disabled: true },
                          ]}
                          values={values.weekdays.days}
                        />
                      </div>
                      <Accordion defaultActiveKey={["1"]} alwaysOpen>
                        {Object.keys(values.weekdays.time_period).map(
                          (item, index) => (
                            <Accordion.Item eventKey={index}>
                              <Accordion.Header>{item}</Accordion.Header>
                              <Accordion.Body>
                                <div class="row">
                                  <div class=" col-md-6">
                                    <h5 class="start_at">Start at</h5>
                                    <FormControl
                                      control="select"
                                      options={
                                        values.weekdays.time_period[item].slots
                                      }
                                      name={`weekdays.time_period[${item}].start_time`}
                                      id={`weekdays.time_period[${item}].start_time`}
                                      value={
                                        values.weekdays.time_period[item]
                                          .start_time
                                      }
                                      isSearchable={false}
                                      iconHide={true}
                                      setFieldValue={setFieldValue}
                                      onChange={() => {}}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                  <div class=" col-md-6">
                                    <h5 class="end_at">End at</h5>
                                    <FormControl
                                      control="select"
                                      options={values.weekdays.time_period[
                                        item
                                      ].slots?.filter((s) =>
                                        compareTime(
                                          s.value,
                                          values.weekdays.time_period[item]
                                            .start_time
                                        )
                                      )}
                                      name={`weekdays.time_period[${item}].end_time`}
                                      id={`weekdays.time_period[${item}].end_time`}
                                      value={
                                        values.weekdays.time_period[item]
                                          .end_time
                                      }
                                      isSearchable={false}
                                      iconHide={true}
                                      setFieldValue={setFieldValue}
                                      onChange={() => {}}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          )
                        )}
                      </Accordion>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="second" title="Weekends" className="tab_inner_box">
                <div class="weekends_box">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="day_box">
                        <FormControl
                          control="checkbox"
                          name="weekends.days"
                          options={[
                            { value: "sunday", key: "S" },
                            { value: "mondisable", key: "M", disabled: true },
                            { value: "tuesdisable", key: "T", disabled: true },
                            { value: "wednsdisable", key: "W", disabled: true },
                            { value: "thursdisable", key: "T", disabled: true },
                            { value: "fridisable", key: "F", disabled: true },
                            { value: "saturday", key: "S" },
                          ]}
                          values={values.weekends.days}
                        />
                      </div>
                      <Accordion defaultActiveKey={["1"]} alwaysOpen>
                        {Object.keys(values.weekends.time_period).map(
                          (item, index) => (
                            <Accordion.Item eventKey={index}>
                              <Accordion.Header>{item}</Accordion.Header>
                              <Accordion.Body>
                                <div class="row">
                                  <div class="col-md-6">
                                    <h5 class="start_at">Start at</h5>
                                    <FormControl
                                      control="select"
                                      options={
                                        values.weekends.time_period[item].slots
                                      }
                                      isSearchable={false}
                                      iconHide={true}
                                      name={`weekends.time_period[${item}].start_time`}
                                      id={`weekends.time_period[${item}].start_time`}
                                      value={
                                        values.weekends.time_period[item]
                                          .start_time
                                      }
                                      setFieldValue={setFieldValue}
                                      onChange={() => {}}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                  <div class="col-md-6">
                                    <h5 class="end_at">End at</h5>
                                    <FormControl
                                      control="select"
                                      options={values.weekends.time_period[
                                        item
                                      ].slots?.filter((s) =>
                                        compareTime(
                                          s.value,
                                          values.weekends.time_period[item]
                                            .start_time
                                        )
                                      )}
                                      name={`weekends.time_period[${item}].end_time`}
                                      id={`weekends.time_period[${item}].end_time`}
                                      value={
                                        values.weekends.time_period[item]
                                          .end_time
                                      }
                                      isSearchable={false}
                                      iconHide={true}
                                      setFieldValue={setFieldValue}
                                      onChange={() => {}}
                                      onBlur={handleBlur}
                                    />
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          )
                        )}
                      </Accordion>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>

            <div class="row mt_20">
              <div class="col-md-12">
                <FormControl
                  control="checkbox"
                  name="emergency_call"
                  options={[
                    { value: "emergency_call", key: "Emergency calls" },
                  ]}
                  value={values.emergency_call}
                  className="checkbox_icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SheduleInformation;

const FeeCardModal = (props) => {
  const { subSpecialityList } = useSelector(({ CommonSlice }) => CommonSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SubSpecialityList({ isFeeCard: true }));
    return () => {};
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="" closeButton>
        <h5 class="fee_card_title">Fee Card</h5>
      </Modal.Header>
      <Modal.Body>
        <table className="width_100">
          <tr>
            <td class="fee_card_table_head">Speciality</td>
            <td class="fee_card_table_head">Consultation Fee (Rs)</td>
            <td class="fee_card_table_head">Follow up Fee (Rs)</td>
          </tr>
          {subSpecialityList?.length ? (
            subSpecialityList.map((item) => (
              <tr key={item?.id}>
                <td class="table_text">{item?.sub_speciality}</td>
                <td class="table_text">{item?.consulting_fee}</td>
                <td class="table_text">{item?.follow_up_fee}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </table>
      </Modal.Body>
    </Modal>
  );
};
