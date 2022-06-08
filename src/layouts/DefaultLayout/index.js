import React from 'react';
import PropTypes from 'prop-types';

import './DefaultLayout.module.scss';
import Header from '~/components/Header';
import Sidebar from '~/components/SideBar';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
