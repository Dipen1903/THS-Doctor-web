import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import {
  GetPayouts,
  RequestWithdraw,
} from "../../../Store/Reducers/PayoutReducer";
import { AlertEnum } from "../../../Utilities/Enums";
import { Icon } from "../../../Utilities/Icons";
import Table from "../../Common/Layouts/Table";

function Payouts() {
  const dispatch = useDispatch();
  const [isRequested, setIsRequested] = useState();
  const [filteredData, setFilterData] = useState([]);
  const { PayoutSlice, ProfileSlice } = useSelector((state) => state);
  const { payouts } = PayoutSlice;
  const { userProfile } = ProfileSlice;

  const columns = useMemo(
    () => [
      {
        Header: "Payout ID",
        accessor: "payout_id", // accessor is the "key" in the data
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
              <span className="failed_tag">Cancelled</span>
            ) : (
              <span className="paid_tag">Completed</span>
            )
          ) : (
            <span className="in_prcoess">In Process</span>
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
     
              <Link to={original?.status == 1 && `/payouts/${original?.id}`}>
                <img src={Icon.Eye} alt="view" />
              </Link>
            </center>
          );
        },
      },
    ],
    []
  );

  const handleFilter = (text) => {
    try {
      let tempPayouts;
      tempPayouts = payouts.filter(
        (item) => item?.payout_id?.includes(text) == 1
      );
      if (tempPayouts?.length) {
        setFilterData(tempPayouts);
      }
      if (!tempPayouts?.length) {
        setFilterData(payouts);
        dispatch(
          setMessage({
            type: AlertEnum.Info,
            text: `No payout found for ${text}`,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (payouts?.length) {
      setFilterData(payouts);
      let temp = payouts[0];
      if (parseInt(temp?.status) === 0) {
        setIsRequested(temp);
      }
    }
    return () => {};
  }, [payouts]);

  useEffect(() => {
    dispatch(GetPayouts());
    return () => {};
  }, [dispatch]);

  return (
    <Container fluid className="payout_container">
      <h2 className="payout_title mb_10 mt_20">Payouts</h2>
      <div className="d-flex justify-content-between flex-wrap mb_20 payouts_buttons">
        <div className="payout_search_box">
          <form className="form-inline d-flex justify-content-start align-items-center ">
            <img alt="myImg" src={Icon.Search} className="payout_search"></img>
            <input
              className="form-control mr-sm-2 border-0 ml_5 pl_35"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => handleFilter(e?.target?.value)}
            />
          </form>
        </div>
        <div className="d-flex justify-content-between button-spaces ">
          <div className="withdraw_balance_card">
            <h3 className="withdraw_balance_text">
              Withdrawable balance:{" "}
              <span className="withdraw_balance_amount">
                Rs.{userProfile?.wallet}
              </span>
            </h3>
          </div>
          <div>
            <Button
              disabled={!parseInt(userProfile?.wallet) || isRequested}
              className={isRequested ? "requiest_btn" : "withdraw_btn"}
              onClick={(e) => {
                e.preventDefault();
                dispatch(RequestWithdraw({ amount: userProfile?.wallet || 0 }));
              }}
            >
              {isRequested ? (
                <>
                  Request sent for payouts{" "}
                  {moment(isRequested?.created_at).format("DD MMM YYYY")}
                </>
              ) : (
                "Withdraw"
              )}
            </Button>
          </div>
        </div>
      </div>
      <Table data={filteredData} columns={columns} pagination={true} />
    </Container>
  );
}

export default Payouts;
