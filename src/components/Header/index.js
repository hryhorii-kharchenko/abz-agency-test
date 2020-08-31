import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';

import logoIcon from '../../assets/img/svg/logo.svg';
import menuIcon from '../../assets/img/svg/menu-icon.svg';
import NavLink from '../NavLink';

function Header({ activateSideDrawer }) {
  return (
    <header styleName="header">
      <a href="#" styleName="logo-a">
        <img src={logoIcon} alt="TESTTASK" styleName="logo-img" />
      </a>

      <nav styleName="nav">
        <ul styleName="link-list">
          <NavLink to="about">About me</NavLink>
          <NavLink to="#">Relationships</NavLink>
          <NavLink to="#">Requirements</NavLink>
          <NavLink to="users">Users</NavLink>
          <NavLink to="register">Sign Up</NavLink>
        </ul>
      </nav>
      <button onClick={activateSideDrawer} styleName="menu-btn">
        <img src={menuIcon} alt="Menu" styleName="menu-icon" />
      </button>
    </header>
  );
}

Header.propTypes = { activateSideDrawer: PropTypes.func.isRequired };

export default Header;
