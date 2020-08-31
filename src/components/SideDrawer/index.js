import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';

import logoIcon from '../../assets/img/svg/logo.svg';
import Backdrop from '../Backdrop';
import NavLink from '../NavLink';

function SideDrawer({ isActive, deactivate }) {
  const styleName = 'side-drawer' + (isActive ? ' active' : '');

  return (
    <>
      <section styleName={styleName}>
        <a href="#" styleName="logo-a">
          <img src={logoIcon} alt="TESTTASK" styleName="logo-img" />
        </a>

        <nav styleName="nav">
          <ul styleName="link-list">
            <NavLink to="about" onClick={deactivate} isVertical>
              About me
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Relationships
            </NavLink>
            <NavLink to="users" onClick={deactivate} isVertical>
              Users
            </NavLink>
            <NavLink to="register" onClick={deactivate} isVertical>
              Sign Up
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Terms and Conditions
            </NavLink>
          </ul>
          <ul styleName="link-list">
            <NavLink to="#" onClick={deactivate} isVertical>
              How it works
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Partnership
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Help
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Leave testimonial
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Contact us
            </NavLink>
          </ul>
          <ul styleName="link-list">
            <NavLink to="#" onClick={deactivate} isVertical>
              Articles
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Our news
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Testimonials
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Licenses
            </NavLink>
            <NavLink to="#" onClick={deactivate} isVertical>
              Privacy Policy
            </NavLink>
          </ul>
        </nav>
      </section>
      <Backdrop isActive={isActive} onClick={deactivate} />
    </>
  );
}

SideDrawer.defaultProps = {
  isActive: false,
  isAuth: false,
};

SideDrawer.propTypes = {
  isActive: PropTypes.bool,
  deactivate: PropTypes.func,
  isAuth: PropTypes.bool,
  logOut: PropTypes.func.isRequired,
};

export default SideDrawer;
