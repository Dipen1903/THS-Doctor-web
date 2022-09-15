import React from "react";
import { Link } from "react-router-dom";
import { BackGround, Icon } from "../../../../Utilities/Icons";

function LabTest() {
  return (
    <>
      <div className="medicine_search_box d-flex ">
        <span className="medicine_text">Add Lab test:</span>
        <div className="prescription-search ">
          <form class="form-inline d-flex justify-content-start align-items-center">
            <img src={Icon.Search} className="payout_search"></img>
            <input
              class="form-control mr-sm-2 border-0 ml_5 pl_35 pt_10 pb_10"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table prescription_table">
          <thead></thead>
          <tbody>
            <tr className="prescription_table_body_row ">
              <td className="prescription_table_body_text">Covid-19</td>
              <td className="prescription_table_body_text">
                <input
                  type="text"
                  name="firstname"
                  className="float_right"
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
            </tr>
            <tr className="prescription_table_body_row">
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
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LabTest;
