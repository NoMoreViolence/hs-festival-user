import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './usertimetable.page.scss';

class UserTimeTablePage extends Component {
  static propTypes = {
    timeTable: PropTypes.array.isRequired,
    dataInTime: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dataInTime();
  }

  render() {
    const returnTime = value => value.map((object, i) => (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>{object.time}</td>
        <td>{object.content}</td>
      </tr>
    ));

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
        <tbody>{returnTime(this.props.timeTable)}</tbody>
      </Table>
    );
  }
}

export default UserTimeTablePage;
