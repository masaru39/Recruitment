import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Table, Input } from 'semantic-ui-react';


const RecruitmentTable = ({ data, onSearchChange, sortKey, direction, handleSort }) => {
  return (
    <div>
      <Input icon="search" placeholder="Search projects..." onChange={onSearchChange} />
      <Table striped sortable selectable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >No.</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'name' ? direction : null} onClick={() => handleSort('name')}>Name</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Position</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'citizenId' ? direction : null} onClick={() => handleSort('citizenId')}>Citizen ID</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'email' ? direction : null} onClick={() => handleSort('email')}>Email</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'phone' ? direction : null} onClick={() => handleSort('phone')}>Phone</Table.HeaderCell>
            <Table.HeaderCell >File</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'status' ? direction : null} onClick={() => handleSort('status')}>Status</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'registerDate' ? direction : null} onClick={() => handleSort('registerDate')}>Registration Date</Table.HeaderCell>
            <Table.HeaderCell >Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(i => <Table.Row key={i.no.substring(0, 1)}><Table.Cell >{i.no}</Table.Cell>
            <Table.Cell >{i.name}</Table.Cell><Table.Cell >{i.position}</Table.Cell><Table.Cell >{i.citizenID}</Table.Cell>
            <Table.Cell >{i.email}</Table.Cell><Table.Cell >{i.phone}</Table.Cell><Table.Cell><Icon name='file pdf' /></Table.Cell>
            <Table.Cell >{i.status}</Table.Cell><Table.Cell >{i.registrationDate}</Table.Cell>

            <Table.Cell>
              <Button size='small' basic color='blue' >Confirm</Button>
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='11'>

            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>

      </Table>
    </div>
  );

};

RecruitmentTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default RecruitmentTable;