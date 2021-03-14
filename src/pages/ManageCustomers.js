import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './css/Main.css';
import ReactTable from "react-table-6";
import history from './../history';
import "react-table-6/react-table.css";

class ManageCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            updateStatus: false,
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

    async componentDidMount() {
        await fetch('http://localhost:8080/customers')
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
                Header: "Edit Customer",
                Cell: props => {
                    return (<Button className="btn-edit" onClick={() => {
                        this.setState({ updateStatus: true });
                        history.push({
                            pathname: '/createNew',
                            state: { detail: this.state.updateStatus }
                        });
                    }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg></Button>);
                },
                filterable: false
            },
            {
                Header: 'Customer Number', accessor: 'customerNumber', style: {
                    textAlign: "left"
                }, width: 200, maxWidth: 200, minWidth: 200
            },
            {
                Header: 'Customer Name', accessor: 'customerName', style: {
                    textAlign: "left"
                }
            },
            { Header: 'Phone Number', accessor: 'phoneNumber', sortable: false },
            { Header: 'Alternate PhoneNumber', accessor: 'alternatePhoneNumber', sortable: false },
            { Header: 'Email Id', accessor: 'emailId' },
            { Header: 'Date Of Birth', accessor: 'dateOfBirth' },
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
            }
        ];
        let data = this.state.contacts;
        return (
            <div className="text-black-50 container-fluid" >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10" style={{ padding: 0 }}>
                            <Form inline>
                                <FormControl type="text"
                                    placeholder="Search"
                                    className="mr-sm-2 input-margin-common" size="large"
                                    name="searchInput"
                                    value={this.state.searchInput || ""}
                                    onChange={this.handleChange}
                                    label="Search" />
                                <Button variant="primary" className="mr-2 input-margin-common customer-search" >Search <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg></Button>
                            </Form>
                        </div>
                        <div className="col-md-2 align-right" style={{ paddingRight: 0, textAlign: 'right' }}>
                            <Button type="button" className="add-customer input-margin-common btn btn-dark align-right" style={{ marginRight: 0 }}
                                onClick={() => {
                                    history.push({
                                        pathname: '/createNew',
                                        state: { detail: this.state.updateStatus }
                                    });
                                }} > Add Customer  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                </svg></Button>
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