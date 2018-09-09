import React, { Component } from 'react';
import { Table } from 'reactstrap';
import './usertimetable.page.scss';

class UserTimeTablePage extends Component {
  render() {
    return (
      <Table responsive hover className="table-container">
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
            <th scope="row">1</th>
            <td>09:00 - 10:00</td>
            <td>Mr. 탄 씨의 축사가 있겠습니다</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>10:00 - 20:00</td>
            <td>지금 시간에는 모두들 도망가도록 합시다</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>20:00 - 09:00</td>
            <td>밤이 되었습니다. 마피아는 고개를 들어주세요</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default UserTimeTablePage;
