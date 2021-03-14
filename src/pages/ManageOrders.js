import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import ReactTable from "react-table-6";
import history from './../history';
import './css/Main.css';

class ManageOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.location.state.detail,
            orders: [],
            revisedOrders: [],
            finalOrders: {
                orderId: 6,
                billNumber: "14",
                billDate: "1995-10-07",
                paymentMethodStatus: "",
                transactionStatus: "",
                billAmount: "",
            }
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/customers/' + this.props.location.state.detail + '/orders')
            .then(res => res.json())
            .then((data) => {
                console.log("props", data);
                this.setState({ orders: data });
                alert(this.state.orders.paymentMethodStatus);
                this.state.orders.forEach((product) => {
                    this.setState(prevState => ({
                        finalOrders: {                   // object that we want to update
                            ...prevState.finalOrders,    // keep all other key-value pairs
                            orderId: product.orderId,
                            billNumber: product.billNumber,
                            billDate: product.billDate,
                            paymentMethodStatus: product.paymentMethod.paymentMethodId ? "Cash" : "Credit",
                            transStatus: product.transactionStatus.transStatusId ? "Complete" : "Pending",
                            billAmount: product.billAmount
                        }
                    }));
                    this.setState(prevState => ({
                        revisedOrders: {                   // object that we want to update
                            ...prevState.revisedOrders,
                            revisedOrders: this.state.finalOrders
                        }
                    }));
                })
            })
            .catch(console.log)
    }

    render() {
        const columns = [
            {
                Header: 'orderId', accessor: 'orderId', style: {
                    textAlign: "left"
                }, filterable: true, width: 100, maxWidth: 100, minWidth: 100
            },
            {
                Header: 'BillNumber', accessor: 'billNumber', style: {
                    textAlign: "left"
                },
                filterable: true
            },
            { Header: 'BillDate', accessor: 'billDate', sortable: false, filterable: true },
            { Header: 'Payment Method Status', accessor: 'paymentMethodStatus', filterable: true },
            { Header: 'Transaction Status', accessor: 'transStatus', filterable: true },
            { Header: 'BillAmount', accessor: 'billAmount', sortable: false, filterable: false },
            {
                Header: "Edit Order",
                Cell: props => {
                    return (<button className="" onClick={() => {
                        console.log("props", props.original.billNumber);
                        history.push({
                            pathname: '/createOrder',
                            state: { detail: props.original.customerNumber }
                        });
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
                    </div>
                </div>
                <div>
                    <ReactTable columns={columns}
                        data={this.state.revisedOrders}
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