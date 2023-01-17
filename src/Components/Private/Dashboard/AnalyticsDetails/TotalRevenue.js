import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { TotalRevenueAPI } from "../../../../Routes/Service";
import { GetConsultDetails } from "../../../../Store/Reducers/ConsultationsReducer";
import { setMessage } from "../../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../../Utilities/Enums";
import { Icon } from "../../../../Utilities/Icons";
import Table from "../../../Common/Layouts/Table";

function TotalRevenue({ show, onHide }) {
  const [revenue, setRevenue] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      Header: "Month",
      accessor: "month", // accessor is the "key" in the data
    },
    {
      Header: "Consultations",
      accessor: "total_consulation", // accessor is the "key" in the data
    },
    {
      Header: "Revenue",
      accessor: "total_revenue",
    },
  ];
  const initialLoad = async () => {
    try {
      const result = await TotalRevenueAPI();
      if (result?.data) {
        setRevenue(result?.data);
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
          <Modal.Title>Total Revenue</Modal.Title>
        </Modal.Header>

        <Table data={revenue} columns={columns} pagination={true} />
      </Modal.Body>
    </Modal>
  );
}

export default TotalRevenue;
