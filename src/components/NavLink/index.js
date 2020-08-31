import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-scroll';

function NavLink({ to, onClick, children, isWhite, isVertical }) {
  const link =
    to === '#' ? (
      <a
        href="#"
        onClick={onClick}
        styleName={`nav-link ${isWhite ? 'white' : ''}`}
      >
        {children}
      </a>
    ) : (
      <Link
        activeClass="nav-link_active"
        styleName={`nav-link ${isWhite ? 'nav-link_white' : ''}`}
        to={to}
        onClick={onClick}
        spy={true}
        smooth={true}
        duration={500}
      >
        {children}
      </Link>
    );

  return (
    <li styleName={`nav-item ${isVertical ? 'nav-item_vertical' : ''}`}>
      {link}
    </li>
  );
}

NavLink.defaultProps = {
  isWhite: false,
  isVertical: false,
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  isWhite: PropTypes.bool.isRequired,
  isVertical: PropTypes.bool.isRequired,
};

export default NavLink;
