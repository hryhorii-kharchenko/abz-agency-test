import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-scroll';

function Button({
  children,
  type,
  href,
  anchor,
  onClick,
  isFlat,
  isSmall,
  isDisabled,
  isCentered,
  isLinkToAnchor,
  className,
}) {
  const buttonStyleName = `button ${isFlat ? 'flat' : ''} ${
    isDisabled ? 'disabled' : ''
  } ${isCentered ? 'centered' : ''} ${isSmall ? ' small' : ''}`;

  if (isLinkToAnchor && anchor) {
    return (
      <Link
        href={isDisabled ? 'javascript:;' : href}
        styleName={buttonStyleName}
        className={className}
        to={anchor}
        smooth={true}
        duration={500}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={isDisabled ? 'javascript:;' : href}
        styleName={buttonStyleName}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      styleName={buttonStyleName}
      className={className}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  href: null,
  anchor: null,
  onClick: null,
  isLink: false,
  isFlat: false,
  isSmall: false,
  isDisabled: false,
  isCentered: false,
  isLinkToAnchor: false,
  className: null,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  href: PropTypes.string,
  anchor: PropTypes.string,
  onClick: PropTypes.func,
  isFlat: PropTypes.bool,
  isSmall: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isCentered: PropTypes.bool,
  isLinkToAnchor: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
