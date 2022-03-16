import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const acessDenied = () => {
    return (
        <Modal
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Access Denied!!!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <h1>
                    You have to log in to access this page
                </h1>
            </Modal.Body>
            <Modal.Footer>
                <Link to={{ pathname: "/login" }}>
                    <Button>Login</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default acessDenied;



