// IPButton.tsx
import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import { Modal, Button } from "react-bootstrap";

interface IPButtonProps {
  ipAddress: string;
}

const IPButton: React.FC<IPButtonProps> = ({ ipAddress }) => {
  const [ipInfo, setIpInfo] = useState<any>(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleButtonClick = async () => {
    try {
      const response = await ApiService.getIpInfo(ipAddress);
      setIpInfo(response);

      handleShow();
    } catch (error) {
      console.error("Error fetching IP info:", error);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleButtonClick}>
        {ipAddress}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>IP Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>City: {ipInfo?.city}</p>
          <p>Country: {ipInfo?.country}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IPButton;
