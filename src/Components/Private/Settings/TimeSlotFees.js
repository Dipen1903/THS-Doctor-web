import React, { memo, useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Formik, useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";
import { Icon } from "../../../Utilities/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  EditSchedule,
  GetUserProfile,
} from "../../../Store/Reducers/ProfileReducer";
import FormControl from "../../Common/Forms/FormControl";
import { compareTime } from "../../../Utilities/Functions";
import { ScheduleEnum } from "../../../Utilities/Enums";

function Timeslotfees() {
  const [scheduleData, setScheduleData] = useState({ ...ScheduleEnum });
  const dispatch = useDispatch();
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const [chkValue, setChkValue] = useState(false);
  const [edit, setEdit] = useState(false);

  const initialLoad = () => {
    let tempData = { ...scheduleData };
    if (userProfile?.availibility) {
      if (userProfile?.availibility?.weekdays) {
        tempData.weekdays.days = userProfile?.availibility?.weekdays?.days;
        if (userProfile?.availibility?.weekdays?.slot) {
          Object.keys(userProfile?.availibility?.weekdays?.slot)?.map(
            (item) => {
              let tempSlot = userProfile?.availibility?.weekdays?.slot[item];
              tempData.weekdays.time_period[item] = {
                start_time: tempSlot?.start_time,
                end_time: tempSlot?.end_time,
                slots: ScheduleEnum.weekdays.time_period[item].slots,
              };
            }
          );
        }
      }
      if (userProfile?.availibility?.weekends) {
        tempData.weekends.days = userProfile?.availibility?.weekends?.days;
        if (userProfile?.availibility?.weekends?.slot) {
          Object.keys(userProfile?.availibility?.weekends?.slot)?.map(
            (item) => {
              let tempSlot = userProfile?.availibility?.weekends?.slot[item];
              tempData.weekends.time_period[item] = {
                start_time: tempSlot?.start_time,
                end_time: tempSlot?.end_time,
                slots: ScheduleEnum.weekdays.time_period[item].slots,
              };
            }
          );
        }
      }
    }
    tempData.emergency_call = userProfile?.is_emergency_call ? true : false;

    setScheduleData(tempData);
  };

  useEffect(() => {
    !userProfile && dispatch(GetUserProfile());
    initialLoad();
    return () => {};
  }, [userProfile]);

  return (
    <>
      <Container fluid>
        <div className="row timeslots_box">
          <div className="col-md-12">
            <div className="setting_profile_card_head">
              <div className="d-flex">
                <div className="col-md-6">
                  <h3 className="setting_profile_title">Time Slot & Fees</h3>
                </div>
                <div className="col-md-6">
                  {!edit && (
                    <Button
                      onClick={() => setEdit(true)}
                      variant="primary"
                      className="setting_profile_btn float_right"
                    >
                      <img src={Icon.Pencil} />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="setting_profile_card_body">
              <div className="row">
                <Formik
                  initialValues={scheduleData}
                  enableReinitialize
                  onSubmit={(values) => {
                    let tempValues = { ...values };
                    tempValues.weekdays = JSON.stringify(values.weekdays);
                    tempValues.weekends = JSON.stringify(values.weekends);
                    tempValues.emergency_call = values.emergency_call ? 1 : 0;
                    dispatch(EditSchedule(tempValues)).then((res) => {
                      if (res?.payload?.success) {
                        dispatch(GetUserProfile());
                      }
                    });
                  }}
                >
                  {({ values, setFieldValue, handleBlur, handleSubmit }) => {
                    return (
                      <form onSubmit={handleSubmit} id="myForm">
                        <div className="col-md-6">
                          <div className="row mt_20">
                            <div className="col-md-12 col-sm-12">
                              <label className="setting_form_title">
                                Consultation Fee (Rs)
                              </label>
                              <div className="input_box">
                                <div className="form_group">
                                  <input
                                    type="text"
                                    name=""
                                    placeholder=""
                                    value={userProfile?.consulting_fee}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt_10">
                            <div className="col-md-12">
                              <span className="setting_consult_fee_subtext">
                                You will get net Rs. 400 after THS charge 10% +
                                GST 18% deduction.
                              </span>
                            </div>
                          </div>
                          <hr className="bottom_border mt_30 mb_30" />
                          <div className="row">
                            <div className="col-md-12">
                              <h3 className="setting_time_slot_title">
                                Online Time Slot Managment
                              </h3>
                            </div>
                          </div>
                          <div className="row mt_20">
                            <div className="col-md-12">
                              <Tabs defaultActiveKey="first">
                                <Tab
                                  eventKey="first"
                                  title="Weekdays"
                                  className="tab_inner_box"
                                >
                                  <div class="weekdays_box">
                                    <div class="row">
                                      <div class="col-md-12">
                                        <div class="day_box">
                                          <FormControl
                                            control="checkbox"
                                            name="weekdays.days"
                                            options={[
                                              {
                                                value: "sudisable",
                                                key: "S",
                                                disabled: true,
                                              },
                                              {
                                                value: "monday",
                                                key: "M",
                                                disabled: !edit,
                                              },
                                              {
                                                value: "tuesday",
                                                key: "T",
                                                disabled: !edit,
                                              },
                                              {
                                                value: "wednsday",
                                                key: "W",
                                                disabled: !edit,
                                              },
                                              {
                                                value: "thursday",
                                                key: "T",
                                                disabled: !edit,
                                              },
                                              {
                                                value: "friday",
                                                key: "F",
                                                disabled: !edit,
                                              },
                                              {
                                                value: "sadisable",
                                                key: "S",
                                                disabled: true,
                                              },
                                            ]}
                                            values={values.weekdays.days}
                                          />
                                        </div>
                                        <Accordion
                                          defaultActiveKey={["1"]}
                                          alwaysOpen
                                        >
                                          {Object.keys(
                                            values.weekdays.time_period
                                          ).map((item, index) => (
                                            <Accordion.Item
                                              key={item + index}
                                              eventKey={index}
                                            >
                                              <Accordion.Header>
                                                {item}
                                              </Accordion.Header>
                                              <Accordion.Body>
                                                <div class="row">
                                                  <div class=" col-md-6">
                                                    <h5 class="start_at">
                                                      Start at
                                                    </h5>
                                                    <FormControl
                                                      control="select"
                                                      customIcon={
                                                        Icon.ClockBlue
                                                      }
                                                      options={
                                                        values.weekdays
                                                          .time_period[item]
                                                          .slots
                                                      }
                                                      name={`weekdays.time_period[${item}].start_time`}
                                                      id={`weekdays.time_period[${item}].start_time`}
                                                      value={
                                                        values.weekdays
                                                          .time_period[item]
                                                          .start_time
                                                      }
                                                      isSearchable={false}
                                                      iconHide={false}
                                                      setFieldValue={
                                                        setFieldValue
                                                      }
                                                      onChange={() => {}}
                                                      onBlur={handleBlur}
                                                    />
                                                  </div>
                                                  <div class=" col-md-6">
                                                    <h5 class="end_at">
                                                      End at
                                                    </h5>

                                                    <FormControl
                                                      control="select"
                                                      options={values.weekdays.time_period[
                                                        item
                                                      ].slots?.filter((s) =>
                                                        compareTime(
                                                          s.value,
                                                          values.weekdays
                                                            .time_period[item]
                                                            .start_time
                                                        )
                                                      )}
                                                      customIcon={
                                                        Icon.ClockBlue
                                                      }
                                                      name={`weekdays.time_period[${item}].end_time`}
                                                      id={`weekdays.time_period[${item}].end_time`}
                                                      value={
                                                        values.weekdays
                                                          .time_period[item]
                                                          .end_time
                                                      }
                                                      isSearchable={false}
                                                      iconHide={false}
                                                      setFieldValue={
                                                        setFieldValue
                                                      }
                                                      onChange={() => {}}
                                                      onBlur={handleBlur}
                                                    />
                                                  </div>
                                                </div>
                                              </Accordion.Body>
                                            </Accordion.Item>
                                          ))}
                                        </Accordion>
                                      </div>
                                    </div>
                                  </div>
                                </Tab>
                                <Tab
                                  eventKey="second"
                                  title="Weekends"
                                  className="tab_inner_box"
                                >
                                  <div class="weekends_box">
                                    <div class="row">
                                      <div class="col-md-12">
                                        <div class="day_box">
                                          <FormControl
                                            control="checkbox"
                                            name="weekends.days"
                                            options={[
                                              {
                                                value: "sunday",
                                                key: "S",
                                                disabled: !edit,
                                              },
                                              {
                                                value: "mondisable",
                                                key: "M",
                                                disabled: true,
                                              },
                                              {
                                                value: "tuesdisable",
                                                key: "T",
                                                disabled: true,
                                              },
                                              {
                                                value: "wednsdisable",
                                                key: "W",
                                                disabled: true,
                                              },
                                              {
                                                value: "thursdisable",
                                                key: "T",
                                                disabled: true,
                                              },
                                              {
                                                value: "fridisable",
                                                key: "F",
                                                disabled: true,
                                              },
                                              {
                                                value: "saturday",
                                                key: "S",
                                                disabled: !edit,
                                              },
                                            ]}
                                            values={values.weekends.days}
                                          />
                                        </div>
                                        <Accordion
                                          defaultActiveKey={["1"]}
                                          alwaysOpen
                                        >
                                          {Object.keys(
                                            values.weekends.time_period
                                          ).map((item, index) => (
                                            <Accordion.Item eventKey={index}>
                                              <Accordion.Header>
                                                {item}
                                              </Accordion.Header>
                                              <Accordion.Body>
                                                <div class="row">
                                                  <div class="col-md-6">
                                                    <h5 class="start_at">
                                                      Start at
                                                    </h5>
                                                    <FormControl
                                                      control="select"
                                                      options={
                                                        values.weekends
                                                          .time_period[item]
                                                          .slots
                                                      }
                                                      customIcon={
                                                        Icon.ClockBlue
                                                      }
                                                      isSearchable={false}
                                                      iconHide={false}
                                                      name={`weekends.time_period[${item}].start_time`}
                                                      id={`weekends.time_period[${item}].start_time`}
                                                      value={
                                                        values.weekends
                                                          .time_period[item]
                                                          .start_time
                                                      }
                                                      setFieldValue={
                                                        setFieldValue
                                                      }
                                                      onChange={() => {}}
                                                      onBlur={handleBlur}
                                                    />
                                                  </div>
                                                  <div class="col-md-6">
                                                    <h5 class="end_at">
                                                      End at
                                                    </h5>
                                                    <FormControl
                                                      control="select"
                                                      options={values.weekends.time_period[
                                                        item
                                                      ].slots?.filter((s) =>
                                                        compareTime(
                                                          s.value,
                                                          values.weekends
                                                            .time_period[item]
                                                            .start_time
                                                        )
                                                      )}
                                                      customIcon={
                                                        Icon.ClockBlue
                                                      }
                                                      name={`weekends.time_period[${item}].end_time`}
                                                      id={`weekends.time_period[${item}].end_time`}
                                                      value={
                                                        values.weekends
                                                          .time_period[item]
                                                          .end_time
                                                      }
                                                      isSearchable={false}
                                                      iconHide={false}
                                                      setFieldValue={
                                                        setFieldValue
                                                      }
                                                      onChange={() => {}}
                                                      onBlur={handleBlur}
                                                    />
                                                  </div>
                                                </div>
                                              </Accordion.Body>
                                            </Accordion.Item>
                                          ))}
                                        </Accordion>
                                      </div>
                                    </div>
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>
                          </div>
                          <div class="row mt_20">
                            <div class="col-md-12">
                              <FormControl
                                control="checkbox"
                                name="emergency_call"
                                options={[
                                  {
                                    value: "emergency_call",
                                    key: "Emergency calls",
                                  },
                                ]}
                                value={values.emergency_call}
                                className="checkbox_icon"
                              />
                            </div>
                          </div>
                          <div className="row mt_50">
                            {edit && (
                              <div className="col-md-4">
                                <button
                                  type="submit"
                                  class="continue_btn"
                                  variant="primary"
                                >
                                  Save
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Timeslotfees;
