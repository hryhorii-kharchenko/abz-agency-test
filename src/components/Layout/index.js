import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';

import Footer from '../Footer';
import Header from '../Header';
import SideDrawer from '../SideDrawer';

function Layout({
  children,
  isSideDrawerActive,
  activateSideDrawer,
  deactivateSideDrawer,
}) {
  return (
    <>
      <Header activateSideDrawer={activateSideDrawer} />
      <SideDrawer
        isActive={isSideDrawerActive}
        deactivate={deactivateSideDrawer}
      />
      {children}
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isSideDrawerActive: PropTypes.bool.isRequired,
  activateSideDrawer: PropTypes.func.isRequired,
  deactivateSideDrawer: PropTypes.func.isRequired,
};

export default Layout;
