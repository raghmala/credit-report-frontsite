import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './css/Main.css';
import ReactTable from "react-table-6";
import history from './../history';
import "react-table-6/react-table.css";
import ManageOrders from "./ManageOrders";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import "react-table-6/react-table.css";

class ManageCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            deleteStatus: "",
            alertStatus: true,
            searchInput: "",
            customerName: '',
            phoneNumber: '',
            bodyText: 'This text can be updated in modal 1'
        }
    }
    handleChange = (e) => {
        this.setState({ searchInput: e.target.value }, () => {
            this.globalSearch();
        });
    }
    globalSearch = () => {
        let { contacts, searchInput } = this.state;
        if (searchInput) {
            console.log(searchInput);
            let filteredData = contacts.filter(value => {
                return (
                    value.customerNumber.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                    value.phoneNumber.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                    value.emailId.toLowerCase().includes(searchInput.toLowerCase()) ||
                    value.dateOfBirth.toLowerCase().includes(searchInput.toLowerCase())
                );
            });
            this.setState({ contacts: filteredData });
        }
    };

    deleteCustomer(eId) {
        const requestOptions = {
            method: 'DELETE'
        };
        console.log(eId);
        const id = eId;
        fetch('http://localhost:8080/customers/delete/' + id, requestOptions)
            .then(res => res.text())
            .then((statusOfDelete) => {
                console.log("status", statusOfDelete);
                alert(statusOfDelete);
                {/*  this.setState({ alertStatus: true });
                return (
                    <Alert show={this.state.alertStatus} variant="success">
                        <Alert.Heading>Delete Cutomer Status</Alert.Heading>
                        <p>
                            {statusOfDelete}
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => this.setState({ alertStatus: false })} variant="outline-success">
                                Close me y'all!
                         </Button>
                        </div>
                    </Alert>
                ); */}
            })
            .catch(console.log)
    }


    componentDidMount() {
        fetch('http://localhost:8080/customers')
            .then(res => res.json())
            .then((data) => {
                this.setState({ contacts: data })
            })
            .catch(console.log)
    }
    render() {
        const { bodyText } = this.state;
        const columns = [
            {
                Header: 'S No', accessor: 'customerNumber', style: {
                    textAlign: "left"
                }, width: 50, maxWidth: 100, minWidth: 100
            },
            {
                Header: 'customerName', accessor: 'customerName', style: {
                    textAlign: "left"
                }
            },
            { Header: 'PhoneNumber', accessor: 'phoneNumber', sortable: false },
            { Header: 'AlternatePhoneNumber', accessor: 'alternatePhoneNumber', sortable: false },
            { Header: 'EmailId', accessor: 'emailId' },
            { Header: 'DateOfBirth', accessor: 'dateOfBirth' },
            { Header: 'Address', accessor: 'address', sortable: false },
            {
                Header: "Mange Orders",
                Cell: props => {
                    return (<button className="" onClick={() => {
                        console.log("props", props.original.customerNumber);
                        history.push({
                            pathname: '/manageOrders',
                            state: { detail: props.original.customerNumber }
                        });
                    }}>Manage Orders</button>);
                },
                filterable: false
            },
            {/* {
                Header: "Delete Customer",
                Cell: props => {
                    return (<Button className="btn btn-dark align-right" onClick={() => {
                        this.deleteCustomer(props.original.customerNumber);
                    }} >Delete</Button>);
                }, 
                filterable: false
            }, */ }
        ];
        let data = this.state.contacts;
        return (
            <div className="text-black-50 container-fluid" >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            <Form inline>
                                <FormControl type="text"
                                    placeholder="Search"
                                    className="mr-sm-2 input-margin-common" size="large"
                                    name="searchInput"
                                    value={this.state.searchInput || ""}
                                    onChange={this.handleChange}
                                    label="Search" />
                                <Button variant="primary" className="mr-2 input-margin-common" >Search</Button>
                            </Form>
                        </div>
                        <div className="col-md-2 align-right">
                            <Button type="button" className="add-customer btn btn-dark align-right" onClick={() => history.push('/createNew')}><i className="fas fa-user-plus mr1"></i>Add Customer</Button>
                        </div>
                    </div>
                </div>
                {/*  <EmployeeList contacts={this.state.contacts} />*/}

                <div>
                    <ReactTable columns={columns}
                        data={this.state.contacts}
                        filterable defaultPageSize={10}
                        noDataText={"Please Wait. Customers details are loading....."}
                    >
                    </ReactTable>
                </div>

            </div>
        )
    }
}
export default withRouter(ManageCustomers);