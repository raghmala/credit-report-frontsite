import React, { Component } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './css/Main.css';
import axios from 'axios';
import history from './../history';

class ManageReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            generateDate: '',
            toMail: ''
        }
    }
    viewReport = (e) => {
        e.preventDefault();
        var getTargetUrl = 'http://localhost:8080/customers/' + this.state.customerId + '/report?generateDate=' + this.state.generateDate;
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.get(getTargetUrl)
            .then(res => {
                window.open('http://localhost:8080/customers/' + this.state.customerId + '/report', "_blank")
                console.log(res.data.customerId);
                alert("Report downloaded for Customer with id " + this.state.customerId);
            });
    };
    downloadReportAll = (e) => {
        e.preventDefault();
        var getTargetUrl = 'http://localhost:8080/customers/allReports?generateDate=' + this.state.generateDate;;
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.get(getTargetUrl)
            .then(res => {
                console.log(res.data.customerNumber);
                alert("Report downloaded for all Customers");
            });
    };
    emailReport = (e) => {
        e.preventDefault();
        var getTargetUrl = 'http://localhost:8080/sendMail/' +
            this.state.customerId + '?toMail=' + this.state.toMail + '&generateDate =' + this.state.generateDate;
        const headers = {
            'Content-Type': 'application/json'
        };
        alert(this.state.customerId);
        axios.get(getTargetUrl)
            .then(res => {
                console.log(res.data.customerId);
                alert("Report emailed to Customer with id " + this.state.customerId);
            });
    };
    emailReportAll = (e) => {
        e.preventDefault();
        var getTargetUrl = 'http://localhost:8080/sendMail/allCustomers?toMail='
            + this.state.toMail + '&generateDate=' + this.state.generateDate;
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.get(getTargetUrl)
            .then(res => {
                console.log(res.data.customerNumber);
                alert("Report emailed to all customers");
            });
    };
    render() {
        return (
            <div className="text-black-50 container-fluid" style={{ backgroundColor: 'white', padding: '8px' }}>
                <article className="panel-group bs-accordion" id="accordion" role="tablist" aria-multiselectable="true">
                    <section className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingOne" style={{ backgroundColor: 'gainsboro' }}>
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne" >
                                    <Form.Group controlId="dob" className="form-group form-inline order-header">
                                        <Form.Label className="control-label inline-space">Generatee Report For Specific Customer</Form.Label>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-chevron-compact-down pull-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
                                        </svg>
                                    </Form.Group>
                                </a>
                            </h4>
                        </div>
                        <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                            <div className="panel-body">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space report-label">Customer Id :  </Form.Label>
                                    <Form.Control type="input" name="dob" placeholder="Customer Id" className="inline-space"
                                        onChange={e => this.state.customerId = e.target.value} />
                                </Form.Group>
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space report-label">On the Date :  </Form.Label>
                                    <Form.Control type="date" name="dob" placeholder="Select Date" className="inline-space"
                                        onChange={e => this.state.generateDate = e.target.value} />
                                </Form.Group>
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space report-label">Email ID :  </Form.Label>
                                    <Form.Control type="email" name="dob" placeholder="abc@gmail.com" className="inline-space"
                                        onChange={e => {
                                            this.state.toMail = e.target.value;
                                            alert(e.target.value);
                                        }} />
                                </Form.Group>
                                <Button variant="primary" className="inline-space form-group form-inline flex-end send-email"
                                    onClick={this.emailReport}>Send Email
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                    </svg>
                                </Button>
                                <Button variant="primary" className="inline-space form-group form-inline flex-end download-pdf"
                                    onClick={this.viewReport}>View Report
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person" viewBox="0 0 16 16">
                                        <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </section>
                </article>
                <article className="panel-group bs-accordion" id="accordion" role="tablist" aria-multiselectable="true">
                    <section className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingTwo" style={{ backgroundColor: 'gainsboro' }}>
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"
                                    aria-expanded="true" aria-controls="collapseTwo">
                                    <Form.Group controlId="dob" className="form-group form-inline order-header">
                                        <Form.Label className="control-label inline-space">Generatee Report For All Customers  </Form.Label>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-chevron-compact-down pull-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
                                        </svg>
                                    </Form.Group>
                                </a>
                            </h4>
                        </div>
                        <div id="collapseTwo" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                            <div className="panel-body">
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space report-label">On the Date :  </Form.Label>
                                    <Form.Control type="date" name="dob" placeholder="Select Date" className="inline-space"
                                        onChange={e => this.state.generateDate = e.target.value} />
                                </Form.Group>
                                <Form.Group controlId="dob" className="form-group form-inline">
                                    <Form.Label className="inline-space report-label">Email ID :  </Form.Label>
                                    <Form.Control type="email" name="dob" placeholder="abc@gmail.com" className="inline-space"
                                        onChange={e => {
                                            this.state.toMail = e.target.value;
                                            alert(e.target.value);
                                        }} />
                                </Form.Group>
                                <Button variant="primary" className="inline-space form-group form-inline flex-end send-email"
                                    onClick={this.downloadReportAll} >Send Email
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                    </svg>
                                </Button>
                                <Button variant="primary" className="inline-space form-group form-inline flex-end download-pdf"
                                    onClick={this.emailReportAll}>Download PDF
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
}

export default ManageReports;