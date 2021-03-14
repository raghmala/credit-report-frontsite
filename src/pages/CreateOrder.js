import { Modal, Button, Form } from 'react-bootstrap';
import React, { Fragment, useState } from 'react';
import history from './../history';
import './css/create-new.css';
import axios from 'axios';

function CreateOrder(props) {
    const [show, setShow] = useState(true);
    const [orderNumber, setOrderNumber] = useState(0);
    const [orderExistCheck, setOrderExistCheck] = useState(true);

    const [orderValues, setOrderValues] = useState({
        billNumber: Number(''),
        billDate: '',
        paymentMethod: Number(''),
        transactionStatus: Number(''),
        billAmount: Number(''),
        creditInterest: Number(''),
        totalAmount: Number('')
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateField = e => {
        setOrderValues({
            ...orderValues,
            [e.target.name]: e.target.value
        });
    };
    const printValues = e => {
        e.preventDefault();
        console.log(orderValues);
    };
    const addOrder = e => {
        e.preventDefault();
        var postTtargetUrl = 'http://localhost:8080/customers';
        var getTargetUrl = 'http://localhost:8080/customers/' + props.customerNumber + '/orders/' + orderValues.orderNumber;
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.get(getTargetUrl)
            .then(res => {
                console.log(res.data.customerNumber);
                setOrderExistCheck(false);
                alert("Customer with id " + orderValues.billNumber +
                    "already exists. Please enter differnet CustomerNumber")

            }).catch(err => {
                if (err.response.status === 404) {
                    setOrderExistCheck(true);
                    axios.post(postTtargetUrl, orderValues, { headers })
                        .then(response => alert("Order with id " + orderValues.customerNumber + " is added")).then(history.push('/'));

                }
            });

    };

    return (
        <Fragment>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form action="#" onSubmit={addOrder} >
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="control-label inline-space customer-input">Bill Number</Form.Label>
                                    <Form.Control type="number" name="billNumber" value={orderValues.billNumber}
                                        placeholder="Bill Number" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="control-label inline-space customer-input">Bill Date</Form.Label>
                                    <Form.Control type="date" name="billDate" value={orderValues.billDate}
                                        placeholder="Customer Name" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Payment Method</Form.Label>
                                    <select name="paymentMethod" value={orderValues.paymentMethod}
                                        placeholder="Payment Method" className="inline-space" onChange={updateField} >
                                        <option value="grapefruit">Credit</option>
                                        <option value="lime">Cash</option>

                                    </select>
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Transaction Status</Form.Label>

                                    <select name="transactionStatus" value={orderValues.transactionStatus}
                                        placeholder="Transaction Status" className="inline-space" onChange={updateField}>
                                        <option value="grapefruit">Pending</option>
                                        <option value="lime">Completed</option>

                                    </select>
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Bill Amount</Form.Label>
                                    <Form.Control type="number" name="billAmount" value={orderValues.billAmount}
                                        placeholder="Bill Amount" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Credit Interest</Form.Label>
                                    <Form.Control type="number" name="creditInterest" value={orderValues.creditInterest}
                                        placeholder="Credit Interest" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <div className="form-row">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space customer-input control-label">Address</Form.Label>
                                    <Form.Control type="input" name="totalAmount" value={orderValues.totalAmount}
                                        placeholder="Total Amount" className="inline-space" onChange={updateField} />
                                </Form.Group>
                            </div>
                            <Modal.Footer>
                                <Button variant="primary" onClick={addOrder}>
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

export default CreateOrder;
