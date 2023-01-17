import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { MonthlyRevenueAPI, TotalRevenueAPI } from "../../../../Routes/Service";
import { GetConsultDetails } from "../../../../Store/Reducers/ConsultationsReducer";
import { setMessage } from "../../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../../Utilities/Enums";
import { Icon } from "../../../../Utilities/Icons";
import Table from "../../../Common/Layouts/Table";

function MonthlyRevenue({ show, onHide }) {
  const [revenue, setRevenue] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      Header: "Date",
      accessor: "date", // accessor is the "key" in the data
    },
    {
      Header: "Revenue",
      accessor: "total_revenue",
    },
  ];
  const initialLoad = async () => {
    try {
      const result = await MonthlyRevenueAPI();
      if (result?.data) {
        setRevenue(result?.data?.revenue_list);
      }
    } catch (error) {
      dispatch(
        setMessage({
          text: error.message,
          type: AlertEnum.Error,
        })
      );
    }
  };
  useEffect(() => {
    show && initialLoad();
    return () => {};
  }, [show]);

  return (
    <Modal show={show} fullscreen={true} onHide={() => onHide()}>
      <Modal.Body
        style={{ padding: "20px 100px", backgroundColor: "rgb(248, 251, 255)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Current Month Revenue</Modal.Title>
        </Modal.Header>

        <Table data={revenue} columns={columns} pagination={true} />
      </Modal.Body>
    </Modal>
  );
}

export default MonthlyRevenue;
