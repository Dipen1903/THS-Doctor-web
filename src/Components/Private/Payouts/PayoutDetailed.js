import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetConsultDetails } from "../../../Store/Reducers/ConsultationsReducer";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { GetPayoutDetails } from "../../../Store/Reducers/PayoutReducer";
import { AlertEnum } from "../../../Utilities/Enums";
import { Icon } from "../../../Utilities/Icons";
import Table from "../../Common/Layouts/Table";
import { ConsultDetails } from "../Consultations/PastConsultation";

function PayoutDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, hide] = useState(false);
  const [filteredData, setFilterData] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { PayoutSlice } = useSelector((state) => state);
  const { payoutDetails } = PayoutSlice;

  const columns = [
    {
      Header: "Appointment ID",
      accessor: "id", // accessor is the "key" in the data
    },
    {
      Header: "Patient",
      accessor: "patient_details.name", // accessor is the "key" in the data
      // Cell: ({ cell: { value } }) => {
      //   return <></>;
      // },
    },
    {
      Header: "Date-Time",
      accessor: "appointment_date_time",
      Cell: ({ cell: { value } }) => {
        return <>{moment(value).format("DD MMM hh:mm A")}</>;
      },
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
          <img
            src={Icon.Eye}
            alt="view"
            className="p-2"
            onClick={() => {
              dispatch(GetConsultDetails({ appointment_id: original?.id }));
              hide(true);
            }}
          />
        );
      },
    },
  ];
  const handleFilter = (text) => {
    try {
      let tempPayouts;
      tempPayouts = payoutDetails?.appointment_list.filter(
        (item) =>
          item?.patient_details?.name
            ?.toUpperCase()
            .includes(text.toUpperCase()) == 1
      );
      if (tempPayouts?.length) {
        setFilterData(tempPayouts);
      }
      if (!tempPayouts?.length) {
        dispatch(
          setMessage({
            type: AlertEnum.Info,
            text: `No consultation found for ${text}`,
          })
        );
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (payoutDetails?.appointment_list?.length) {
      setAppointments(payoutDetails?.appointment_list);
    }
    return () => {};
  }, [payoutDetails]);
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
      <h2 className="payout_title mt_10">
        Payout ID: #{payoutDetails?.payout_id}
      </h2>
      <h5 className="payout_date mb_20">
        {moment(payoutDetails?.created_at).format("DD MMM,YYYY hh:mm A")}
      </h5>
      <div className="d-flex justify-content-between flex-wrap payouts_buttons">
        <div className="payout_search_box">
          <form class="form-inline d-flex justify-content-start align-items-center">
            <img src={Icon.Search} className="payout_search"></img>
            <input
              class="form-control mr-sm-2 border-0 ml_5 pl_35"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => handleFilter(e?.target?.value)}
            />
          </form>
        </div>
        <div className="d-flex justify-content-between button-spaces">
          <div className="withdraw_balance_card">
            <h3 className="withdraw_balance_text">
              Earning from {payoutDetails?.appointment_list?.length}{" "}
              Consultations:{" "}
              <span class="withdraw_balance_amount">
                Rs.{payoutDetails?.withdrawable_balance}
              </span>
            </h3>
          </div>
        </div>
      </div>
      {/* <div className="payout_card_box mt_20"> */}
      <Table
        data={filteredData.length ? filteredData : appointments}
        columns={columns}
        pagination={true}
      />
      <ConsultDetails
        show={show}
        onHide={(e) => {
          hide(false);
        }}
      />
      {/* </div> */}
    </Container>
  );
}

export default PayoutDetailed;
