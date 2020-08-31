import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';

function RadioToolbar({ title, value, onChange, possibleValues }) {
  const choises = possibleValues.map(({ id, label }) => (
    <div styleName="radio-wrapper" key={id}>
      <input
        type="radio"
        id={id}
        name={id}
        value={id}
        checked={value === id}
        onChange={() => onChange(id)}
        styleName="radio"
      />

      <label htmlFor={id} styleName="label">
        {label}
      </label>
      <div styleName="check"></div>
    </div>
  ));

  return (
    <div styleName="radio-toolbar">
      <p styleName="title">{title}</p>
      <div styleName="choise-container">{choises}</div>
    </div>
  );
}

RadioToolbar.defaultProps = {
  value: null,
};

RadioToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  possibleValues: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, label: PropTypes.string })
  ).isRequired,
};

export default RadioToolbar;
