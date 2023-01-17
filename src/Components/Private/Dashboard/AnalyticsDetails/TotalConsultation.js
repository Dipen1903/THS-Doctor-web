import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { TotalConsulationAPI } from "../../../../Routes/Service";
import { GetConsultDetails } from "../../../../Store/Reducers/ConsultationsReducer";
import { setMessage } from "../../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../../Utilities/Enums";
import { Icon } from "../../../../Utilities/Icons";
import Table from "../../../Common/Layouts/Table";
import { ConsultDetails } from "../../Consultations/PastConsultation";

function TotalConsultation({ show, onHide }) {
  const [consultation, setConsultation] = useState([]);
  const [detailsModal, setDetailsModal] = useState(false);
  const dispatch = useDispatch();
  const columns = [
    {
      Header: "Appointment ID",
      accessor: "appointment_id", // accessor is the "key" in the data
    },
    {
      Header: "Patient",
      accessor: "name", // accessor is the "key" in the data
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Gender",
      accessor: "gender",
      Cell: ({ cell: { value } }) => {
        return <>{value?.toUpperCase() === "MALE" ? "M" : "F"}</>;
      },
    },
    {
      Header: "Date-Time",
      accessor: "appointment_date_time",
      Cell: ({ cell: { value } }) => {
        return <>{moment(value).format("DD MMM hh:mm A")}</>;
      },
    },
    {
      Header: "Type",
      accessor: "booking_type",
      Cell: ({ cell: { value } }) => {
        return <span style={{ textTransform: "capitalize" }}>{value}</span>;
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell: { value } }) => {
        return (
          <>
            {value === 3 && <span className="failed_tag mx-2">Cancelled</span>}
            {value === 2 && <span className="paid_tag mx-2">Completed</span>}
          </>
        );
      },
    },
    {
      Header: "View",
      accessor: "action",
      Cell: ({ row: { original } }) => (
        <React.Fragment key={original?.appointment_id}>
          <img
            src={Icon.Eye}
            style={{ cursor: parseInt(original?.status) === 2 && "pointer" }}
            onClick={() => {
              if (parseInt(original?.status) === 2) {
                dispatch(GetConsultDetails({ appointment_id: original?.id }));
                setDetailsModal(true);
              }
            }}
            alt="view"
          />
        </React.Fragment>
      ),
    },
  ];
  const initialLoad = async () => {
    try {
      const result = await TotalConsulationAPI();
      if (result?.data) {
        setConsultation(result?.data);
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
          <Modal.Title>Total Consultations</Modal.Title>
        </Modal.Header>
        <ConsultDetails
          show={detailsModal}
          onHide={(e) => {
            setDetailsModal(false);
          }}
        />
        <Table data={consultation} columns={columns} pagination={true} />
      </Modal.Body>
    </Modal>
  );
}

export default TotalConsultation;
