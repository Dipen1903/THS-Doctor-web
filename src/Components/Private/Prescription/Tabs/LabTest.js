import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackGround, Icon } from "../../../../Utilities/Icons";
import { LabtestLabs } from "../../../../Store/Reducers/LabtestSlice";
import GridLayout from "../../../Common/Layouts/GridLayout";
import { FieldArray, useFormikContext } from "formik";
function LabTest() {
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  const { labTestList } = useSelector(({ LabtestSlice }) => LabtestSlice);

  const [searchParams, setSearchParams] = useState({
    q: "",
    page: 1,
  });
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (searchParams.page && searchParams.q) {
      dispatch(LabtestLabs({ search: searchParams?.q })).then((res) => {
        setShow(true);
      });
    } else {
      setShow(false);
      //   dispatch(clearMedicines());
    }
    return () => {};
  }, [searchParams]);

  const onChangeText = (e) => {
    let q = e?.target?.value;
    setText(q);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setSearchParams((state) => ({ ...state, q }));
    }, 500);
    setTimer(newTimer);
  };
  return (
    <>
      <FieldArray
        name="lab_test"
        render={(arrayHelpers) => {
          return (
            <>
              <div className="medicine_search_box d-flex ">
                <span className="medicine_text">Add Lab test:</span>
                <div className="prescription-search ">
                  <form className="form-inline d-flex justify-content-start align-items-center">
                    <img
                      alt="myImg"
                      src={Icon.Search}
                      className="payout_search"
                    ></img>
                    <input
                      className="form-control mr-sm-2 border-0 ml_5 pl_35 pt_10 pb_10"
                      type="search"
                      value={text}
                      onChange={onChangeText}
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </form>
                  {labTestList?.length && show ? (
                    <div className="list">
                      <img></img>
                      <GridLayout
                        data={labTestList}
                        component={({ data, index }) => {
                          return (
                            <div
                              className="list-item"
                              onClick={(e) => {

                                if (values?.lab_test?.find(e => e.test_id === data?.id)) {
                                  /* same result as above, but a different function return type */
                                }else{
                                  arrayHelpers.push({
                                    // booking_id: 12344,
                                    // user_id: 12,
                                    test_id: data?.id,
                                    test_name: data?.test_name,
                                    notes: data?.test_preparation,
                                  });
                                }
                               
                                setShow(false);
                                setText("");
                              }}
                              key={data?.id}
                            >
                              {data?.test_name}
                            </div>
                          );
                        }}
                        // page={{
                        //   total: medicines?.meta?.total,
                        //   pageSize: medicines?.meta?.per_page,
                        //   onPageChange: (page) =>
                        //     setSearchParams((state) => ({ ...state, page })),
                        // }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="table-responsive">
                <table className="table prescription_table">
                  <thead></thead>
                  <tbody>
                    {values?.lab_test?.length > 0 &&
                      values?.lab_test.map((item, index) => (
                        <tr className="prescription_table_body_row  lab-radiology-text-td-center">
                          <td className="prescription_table_body_text">
                            {item?.test_name}
                          </td>
                          <td className="prescription_table_body_text">
                            <input
                              type="text"
                              name="firstname"
                              className="float_right"
                              value={item?.notes}
                              placeholder="Enter Note"
                            />
                          </td>
                          {/* <td>
                            <img
                              src={BackGround.CrossImg}
                              alt="Avatar"
                              className="ml_5 mt_10 mb_5 float_right"
                            ></img>
                          </td> */}
                          <td>
                            <center>
                              <img
                                onClick={(e) => {
                                  e.preventDefault();
                                  arrayHelpers.remove(index);
                                }}
                                src={Icon.CrossRed}
                                alt="Avatar"
                                className="ml_15 mt_15 mb_5"
                              />
                            </center>
                          </td>
                        </tr>
                      ))}

                    {/* <tr className="prescription_table_body_row">
              <td className="prescription_table_body_text">FBG</td>
              <td className="prescription_table_body_text">
                <input
                  type="text"
                  className="float_right"
                  name="firstname"
                  placeholder="Enter Note"
                />
              </td>
              <td>
                <img
                  src={BackGround.CrossImg}
                  alt="Avatar"
                  className="ml_5 mt_10 mb_5 float_right"
                ></img>
              </td>
            </tr> */}
                  </tbody>
                </table>
              </div>
            </>
          );
        }}
      />
    </>
  );
}

export default LabTest;
