import React from "react";
import { ReactTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

const BasicTableComponent = ({ contacts }) => {
    const columns = [
        { Header: 'S No', accessor: 'customerNumber' }, { Header: 'customerName', accessor: 'customerName' }, { Header: 'PhoneNumber', accessor: 'phoneNumber' },
        { Header: 'AlternatePhoneNumber', accessor: 'alternatePhoneNumber' }, { Header: 'EmailId', accessor: 'emailId' }, { Header: 'DateOfBirth', accessor: 'dateOfBirth' }, { Header: 'Address', accessor: 'address' }
    ];
    const data = contacts;
    return (
        <div>
            <ReactTable columns={columns}>
            </ReactTable>
        </div>
    );
}

export default BasicTableComponent;