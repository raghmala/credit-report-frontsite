import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import ReactTable from "react-table-6";
import './css/Main.css';

class ManageOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.location.state.detail,
            orders: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/customers/' + this.props.location.state.detail + '/orders')
            .then(res => res.json())
            .then((data) => {
                console.log("props", data)
                this.setState({ orders: data })
            })
            .catch(console.log)
    }

    render() {
        const columns = [
            {
                Header: 'orderId', accessor: 'orderId', style: {
                    textAlign: "left"
                }, width: 50, maxWidth: 100, minWidth: 100
            },
            {
                Header: 'BillNumber', accessor: 'billNumber', style: {
                    textAlign: "left"
                }
            },
            { Header: 'BillDate', accessor: 'billDate', sortable: false },
            { Header: 'CreditInterest', accessor: 'creditInterest', sortable: false },
            { Header: 'IsCredit', accessor: 'isCredit' },
            {/* { Header: 'PaidStatus', accessor: 'paidStatus' }, */ },
            { Header: 'BillAmount', accessor: 'billAmount', sortable: false },
            {
                Header: "Edit Order",
                Cell: props => {
                    return (<button className="" onClick={() => {
                        console.log("props", props.original.billNumber);
                        {/*} history.push({
                            pathname: '/manageOrders',
                            state: { detail: props.original.customerNumber }
                        }); */}
                    }}>Edit Order</button>);
                },
                filterable: false
            }
        ];
        const data = this.state.orders;
        return (
            <div className="text-black-50 container-fluid">
                <div className="container-fluid">
                    <br></br>
                    <div className="d-flex flex-row justify-content-start">
                        <div className="form-group form-inline">
                            <Button variant="primary" className="inline-space mr-2">Ceate Order</Button>
                        </div>
                        <div className="form-group form-inline">
                            <button type="button" className="inline-space btn btn-dark align-right"><i className="fas fa-user-plus mr1"></i>Edit Order</button>
                        </div>
                    </div>
                </div>
                <div>
                    <ReactTable columns={columns}
                        data={this.state.orders}
                        filterable defaultPageSize={10}
                        noDataText={"Please Wait. Orders details are loading....."}
                    >
                    </ReactTable>
                </div>
            </div>
        )
    };

};

export default ManageOrders;