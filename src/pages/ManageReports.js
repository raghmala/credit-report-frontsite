import React, { Component } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './css/Main.css';

class ManageReports extends React.Component {
    render() {
        return (
            <div className="p-3 mb-2 bg-info text-black-50 container-fluid">
                <div className="container-fluid">
                    <div className="d-flex flex-row">
                        <Form.Group controlId="dob" className="form-group form-inline">
                            <Form.Label className="inline-space">Generate Report for Customer on :  </Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Select Date" className="inline-space" />
                        </Form.Group>
                        <Button variant="primary" className="inline-space form-group form-inline flex-end">Submit</Button>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="d-flex flex-row">
                        <Form.Group controlId="dob" className="inline-space form-group form-inline">
                            <Form.Label>Generate Report for Customer on :</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Select Date" className="inline-space" />
                        </Form.Group>
                        <Button variant="primary" className="inline-space form-group form-inline flex-end">Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManageReports;