import { Modal, Button, Form } from 'react-bootstrap';
import React, { Fragment, useState } from 'react';
import history from './../history';
import './css/create-new.css';

function CreateNew() {
    const [show, setShow] = useState(true);
    const [customerValues, setCustomerValues] = useState({
        customerName: '',
        phoneNumber: '',
        alterNatePhoneNumber: '',
        emailId: '',
        dateOfBirth: '',
        address: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateField = e => {
        setCustomerValues({
            ...customerValues,
            [e.target.name]: e.target.value
        });
    };
    const printValues = e => {
        e.preventDefault();
        console.log(customerValues.customerName, customerValues.phoneNumber, customerValues.alterNatePhoneNumber, customerValues.emailId, customerValues.dateOfBirth, customerValues.address);
    };
    const addCustomer = e => {
        var targetUrl = 'http://localhost:8080/customers';
        const res = fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                customerValues
            })
        });
        if (res.status >= 200 && res.status < 300) {
            alert("authenticated successfully!!!");
        };
    };
    return (
        <Fragment>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form action="#" onSubmit={printValues} >
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="control-label inline-space customer-input">Customer Name</Form.Label>
                                    <Form.Control type="input" name="customerName" value={customerValues.customerName}
                                        placeholder="Enter Value" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Phone Number</Form.Label>
                                    <Form.Control type="input" name="phoneNumber" value={customerValues.phoneNumber}
                                        placeholder="Select Date" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">AlternatePhoneNumber</Form.Label>
                                    <Form.Control type="input" name="alterNatePhoneNumber" value={customerValues.alterNatePhoneNumber}
                                        placeholder="Select Date" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Email</Form.Label>
                                    <Form.Control type="input" name="emailId" value={customerValues.emailId}
                                        placeholder="Select Date" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">DateOfBirth</Form.Label>
                                    <Form.Control type="date" name="dateofBirth" value={customerValues.dateOfBirth}
                                        placeholder="Select Date" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Address</Form.Label>
                                    <Form.Control type="input" name="address" value={customerValues.address}
                                        placeholder="Select Date" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <Modal.Footer>
                                <Button variant="primary" onClick={addCustomer}>
                                    Submit
                                </Button>
                                <Button variant="secondary" onClick={() => history.push('/')}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}

export default CreateNew;
