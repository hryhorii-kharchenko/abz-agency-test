import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';

function Backdrop({ onClick, isActive, zIndex, backgroundColor }) {
  const styleName = 'backdrop ' + (isActive ? 'active' : '');

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor,
        zIndex: zIndex,
      }}
      styleName={styleName}
    />
  );
}

Backdrop.defaultProps = {
  isActive: false,
  zIndex: '999',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  zIndex: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Backdrop;
