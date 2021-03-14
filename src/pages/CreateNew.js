import { Modal, Button, Form } from 'react-bootstrap';
import React, { Fragment, useState } from 'react';
import history from './../history';
import './css/create-new.css';
import axios from 'axios';

function CreateNew(props) {
    const [show, setShow] = useState(true);
    const [customerExistCheck, setCustomerExistCheck] = useState(true);

    const [customerValues, setCustomerValues] = useState({
        customerNumber: Number(''),
        customerName: '',
        phoneNumber: Number(''),
        alterNatePhoneNumber: Number(''),
        emailId: '',
        dateOfBirth: '',
        address: ''
    });

    const handleClose = () => setShow(false);
    const reload = () => window.location.reload();
    const handleShow = () => setShow(true);

    const updateField = e => {
        setCustomerValues({
            ...customerValues,
            [e.target.name]: e.target.value
        });
    };
    const addCustomer = e => {
        e.preventDefault();
        var postTtargetUrl = 'http://localhost:8080/customers';
        var getTargetUrl = 'http://localhost:8080/customers/' + customerValues.customerNumber;
        alert(props.location.state.detail);
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.get(getTargetUrl)
            .then(res => {
                console.log(res.data.customerNumber);
                setCustomerExistCheck(false);
                alert("Customer with id " + customerValues.customerNumber +
                    "already exists. Please enter differnet CustomerNumber")
            }).catch(err => {
                if (err.response.status === 404) {
                    setCustomerExistCheck(true);
                    axios.post(postTtargetUrl, customerValues, { headers })
                        .then(response => alert("customer with id " + customerValues.customerNumber + " is added")).catch(history.push('/'));

                }
            });

    };

    return (
        <Fragment>
            <Modal show={show} onHide={handleClose} onExit={reload} animation={false}>
                <Modal.Header >
                    <Modal.Title>Create New Customer</Modal.Title>
                    <svg className='close-button' onClick={() => history.push('/')} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <Form action="#" onSubmit={addCustomer} >
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="control-label inline-space customer-input">Customer Number</Form.Label>
                                    <Form.Control type="number" name="customerNumber" value={customerValues.customerNumber}
                                        placeholder="Customer Number" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="control-label inline-space customer-input">Customer Name</Form.Label>
                                    <Form.Control type="input" name="customerName" value={customerValues.customerName}
                                        placeholder="Customer Name" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Phone Number</Form.Label>
                                    <Form.Control type="number" name="phoneNumber" value={customerValues.phoneNumber}
                                        placeholder="Select Date" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">AlternatePhoneNumber</Form.Label>
                                    <Form.Control type="number" name="alterNatePhoneNumber" value={customerValues.alterNatePhoneNumber}
                                        placeholder="Alternate Phone Number" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Email</Form.Label>
                                    <Form.Control type="email" name="emailId" value={customerValues.emailId}
                                        placeholder="Email ID" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">DateOfBirth</Form.Label>
                                    <Form.Control type="date" name="dateofBirth" value={customerValues.dateOfBirth}
                                        className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Address</Form.Label>
                                    <Form.Control type="input" name="address" value={customerValues.address}
                                        placeholder="Address" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addCustomer}>
                        Submit
                                </Button>
                    <Button variant="secondary" onClick={() => history.push('/')}>
                        close
                     </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default CreateNew;
