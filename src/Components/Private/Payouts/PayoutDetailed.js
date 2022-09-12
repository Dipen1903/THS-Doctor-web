import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetPayoutDetails } from "../../../Store/Reducers/PayoutReducer";
import { Icon } from "../../../Utilities/Icons";
import Table from "../../Common/Layouts/Table";

function PayoutDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [filteredData, setFilterData] = useState([]);
  const { PayoutSlice, ProfileSlice } = useSelector((state) => state);
  const { payouts, payoutDetails } = PayoutSlice;
  const { userProfile } = ProfileSlice;

  const columns = [
    {
      Header: "Appointment ID",
      accessor: "id", // accessor is the "key" in the data
    },
    {
      Header: "Patient",
      accessor: "created_at", // accessor is the "key" in the data
      Cell: ({ cell: { value } }) => {
        return <></>;
      },
    },
    {
      Header: "Date-Time",
      accessor: "withdrawable_balance",
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
          <span class="failed_tag">Cancelled</span>
        ) : (
          <span class="paid_tag">Completed</span>
        );
      },
    },
    {
      Header: "View",
      accessor: "action",
      Cell: ({
        cell: {
          value,
          row: { original },
        },
      }) => {
        return (
          <center>
            {/* <Link to={`/payouts/${original?.id}`}> */}
            <img src={Icon.Eye} alt="view" />
            {/* </Link> */}
          </center>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(GetPayoutDetails({ payout_id: id }));

    return () => {};
  }, [id]);

  return (
    <Container fluid className="payout_container">
      <div className="payout_back">
        <Link to="/payouts">
          <Button variant="primary" className="payout_back_btn">
            <img src={Icon.Back} className="back_btn_icon"></img> Back
          </Button>
        </Link>
      </div>
      <h2 className="payout_title mt_10">Payout ID: #{id}</h2>
      <h5 className="payout_date mb_20">22 Apr. 2022 6:00 PM</h5>
      <div className="d-flex justify-content-between flex-wrap payouts_buttons">
        <div className="payout_search_box">
          <form class="form-inline d-flex justify-content-start align-items-center">
            <img src={Icon.Search} className="payout_search"></img>
            <input
              class="form-control mr-sm-2 border-0 ml_5 pl_35"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="d-flex justify-content-between button-spaces">
          <div className="withdraw_balance_card">
            <h3 className="withdraw_balance_text">
              Earning from 3 Consultations:{" "}
              <span class="withdraw_balance_amount">Rs.1200</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="payout_card_box mt_20">
        <Table
          data={payouts.length ? payouts : filteredData}
          columns={columns}
          pagination={true}
        />
      </div>
    </Container>
  );
}

export default PayoutDetailed;
