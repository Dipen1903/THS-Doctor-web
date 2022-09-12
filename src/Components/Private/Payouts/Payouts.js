import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  GetPayouts,
  RequestWithdraw,
} from "../../../Store/Reducers/PayoutReducer";
import { Icon } from "../../../Utilities/Icons";
import Table from "../../Common/Layouts/Table";

function Payouts() {
  const dispatch = useDispatch();
  const [filteredData, setFilterData] = useState([]);
  const { PayoutSlice, ProfileSlice } = useSelector((state) => state);
  const { payouts } = PayoutSlice;
  const { userProfile } = ProfileSlice;

  const columns = [
    {
      Header: "Payout ID",
      accessor: "id", // accessor is the "key" in the data
    },
    {
      Header: "Date-Time",
      accessor: "created_at", // accessor is the "key" in the data
      Cell: ({ cell: { value } }) => {
        return <>{moment(value).format("DD MMM hh:mm A")}</>;
      },
    },
    {
      Header: "Amount (Rs)",
      accessor: "withdrawable_balance",
    },
    {
      Header: "Account/Upi id",
      accessor: "bank_details.account_number",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({
        cell: {
          value,
          row: { original },
        },
      }) => {
        return parseInt(value) ? (
          parseInt(value > 1) ? (
            <span class="failed_tag">Cancelled</span>
          ) : (
            <span class="paid_tag">Completed</span>
          )
        ) : (
          <span class="in_prcoess">In Process</span>
        );
      },
    },
    {
      Header: "Consultations",
      accessor: "action",
      Cell: ({
        cell: {
          value,
          row: { original },
        },
      }) => {
        return (
          <center>
            <Link to={`/payouts/${original?.id}`}>
              <img src={Icon.Eye} alt="view" />
            </Link>
          </center>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(GetPayouts());
    return () => {};
  }, []);

  return (
    <Container fluid className="payout_container">
      <h2 className="payout_title mb_10 mt_20">Payouts</h2>
      <div className="d-flex justify-content-between flex-wrap mb_20 payouts_buttons">
        <div className="payout_search_box">
          <form class="form-inline d-flex justify-content-start align-items-center ">
            <img src={Icon.Search} className="payout_search"></img>
            <input
              class="form-control mr-sm-2 border-0 ml_5 pl_35"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="d-flex justify-content-between button-spaces ">
          <div className="withdraw_balance_card">
            <h3 className="withdraw_balance_text">
              Withdrawable balance:{" "}
              <span class="withdraw_balance_amount">
                Rs.{userProfile?.wallet}
              </span>
            </h3>
          </div>
          <div>
            <Button
              variant="primary"
              disabled={!parseInt(userProfile?.wallet)}
              className="withdraw_btn"
              onClick={(e) => {
                e.preventDefault();
                dispatch(RequestWithdraw({ amount: userProfile?.wallet || 0 }));
              }}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>
      <Table
        data={payouts.length ? payouts : filteredData}
        columns={columns}
        pagination={true}
      />
    </Container>
  );
}

export default Payouts;
