import React from "react";
import { Link } from "react-router-dom";
import { BackGround, Icon } from "../../../../Utilities/Icons";

function Medicine() {
  return (
    <>
      <div className="medicine_search_box d-flex ">
        <span className="medicine_text">Add Medicines:</span>
        <div className="prescription-search">
          <form class="form-inline d-flex justify-content-start align-items-center">
            <img alt="myImg" src={Icon.Search} className="payout_search"></img>

            <input
              class="form-control mr-sm-2 border-0 pl_35 pt_10 pb_10"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table prescription_table">
          <thead>
            <tr className="prescription_table_head">
              <th className="prescription_table_head_text">Medicine</th>
              <th className="prescription_table_head_text">Morning</th>
              <th className="prescription_table_head_text">Afternoon</th>
              <th className="prescription_table_head_text">Evening</th>
              <th className="prescription_table_head_text">Night</th>
              <th className="prescription_table_head_text">Condition</th>
              <th className="prescription_table_head_text">
                <center>Days</center>
              </th>
              <th className="prescription_table_head_text">
                <center>Action</center>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="prescription_table_body_row">
              <td className="prescription_table_body_text">
                <input
                  name="medicinename"
                  type="text"
                  id="medicinename"
                  style={{ width: "120px", border: "none" }}
                />
              </td>
              <td className="prescription_table_body_text">
                <input
                  name="morningmedicine"
                  type="number"
                  id="morningmedicine"
                  style={{ width: "50px", textAlign: "center" }}
                />
              </td>
              <td className="prescription_table_body_text">
                <input
                  name="afternoonmedicine"
                  type="number"
                  id="afternoonmedicine"
                  style={{ width: "50px", textAlign: "center" }}
                />
              </td>
              <td className="prescription_table_body_text">
                <input
                  name="evemedicine"
                  type="number"
                  id="evemedicine"
                  style={{ width: "50px", textAlign: "center" }}
                />
              </td>
              <td className="prescription_table_body_text">
                <input
                  name="nightmedicine"
                  type="number"
                  id="nightmedicine"
                  style={{ width: "50px", textAlign: "center" }}
                />
              </td>
              <td className="prescription_table_body_text">
                <select className="custom-select" style={{ width: "110px" }}>
                  <option value="0">Before Food</option>
                  <option value="1">After Food</option>
                </select>
              </td>
              <td className="prescription_table_body_text">
                <input
                  name="noofdays"
                  type="number"
                  id="noofdays"
                  style={{ width: "40px", textAlign: "center" }}
                />
              </td>

              <td>
                <center>
                  <img
                    src={BackGround.CrossImg}
                    alt="Avatar"
                    className="ml_15 mt_15 mb_5"
                  ></img>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Medicine;
