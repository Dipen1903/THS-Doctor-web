import React from "react";
import { Link } from "react-router-dom";
import { Icon, BackGround } from "../../../../Utilities/Icons";

function ReferDoctor() {
  return (
    <>
      <div className="medicine_search_box d-flex ">
        <span className="medicine_text">Add Speciality:</span>
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
              <td className="prescription_table_body_text">Orthopedic</td>
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
            <tr className="prescription_table_body_row ">
              <td className="prescription_table_body_text">Orthopedic</td>
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

export default ReferDoctor;
