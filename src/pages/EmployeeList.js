import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import './css/Main.css';

const EmployeeList = ({ contacts }) => {
  return (
    <div className="employye-table">

      <div className="row mb-4 text-black-50">
        <div className="col-sm-12 grid-margin">
          <div className="card h-100">
            <h4 className="card-header">Customers Details Table</h4>
            <div className="card-body">
              <ReactBootStrap.Table striped bordered hover table colPadding={0} callSpacing={0}>
                <thead className="thead-dark" >
                  <tr>
                    <th>SNo</th>
                    <th>customerName</th>
                    <th>PhoneNumber</th>
                    <th>AlternatePhoneNumber</th>
                    <th>EmailId</th>
                    <th>DateOfBirth</th>
                    <th>Address</th>
                  </tr>
                </thead>
                {contacts.map((contact) => (
                  <tbody >
                    <tr>
                      <td>{contact.customerNumber}</td>
                      <th>{contact.customerName}</th>
                      <th>{contact.phoneNumber}</th>
                      <th>{contact.alternatePhoneNumber}</th>
                      <th>{contact.emailId}</th>
                      <th>{contact.dateOfBirth}</th>
                      <th>{contact.address}</th>
                    </tr>
                  </tbody>
                ))}
              </ReactBootStrap.Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default EmployeeList;