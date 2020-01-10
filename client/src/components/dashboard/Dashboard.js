import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Fragment>
      <p>This is the dashboard</p>
      <Link to='/order'>Orderview</Link>
    </Fragment>
  );
};

export default Dashboard;
