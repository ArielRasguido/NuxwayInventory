import React from 'react';
import { Modal } from 'react-bootstrap';


function GenericModal(props) {
    return (
      <Modal
        {...props}
        size={props.size?props.size:"md"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Body>
      </Modal>
    );
  }

export default GenericModal;