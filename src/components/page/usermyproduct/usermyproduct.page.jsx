import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './usermyproduct.page.scss';
import { Table } from 'reactstrap';

class UserMyProductPage extends Component {
  static propTypes = {};

  render() {
    return (
      <Table responsive hover className="timetable-container">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <img src="/images/image/time.svg" alt="" />
            </th>
            <th>
              <img src="/images/image/whatfor.svg" alt="" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>ajweiof;jw</td>
            <td>aiowejfo</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default UserMyProductPage;
