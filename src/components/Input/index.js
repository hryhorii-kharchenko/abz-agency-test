import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';
import InputMask from 'react-input-mask';

function Input({
  id,
  name,
  label,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  isDisabled,
  isRequired,
  assistiveMessage,
  errorMessage,
}) {
  let message = null;
  if (assistiveMessage) {
    message = <p styleName="assistive-msg">{assistiveMessage}</p>;
  }
  if (errorMessage) {
    message = <p styleName="error-msg">{errorMessage}</p>;
  }

  const input =
    type === 'tel' ? (
      <InputMask
        mask="+380 99 999 99 99"
        maskPlaceholder="+380 XX XXX XX XX"
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isDisabled}
        required={isRequired}
        styleName={`input ${errorMessage ? 'error' : ''} ${
          isDisabled ? 'disabled' : ''
        } ${value ? 'filled' : ''}`}
      />
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isDisabled}
        required={isRequired}
        styleName={`input ${errorMessage ? 'error' : ''} ${
          isDisabled ? 'disabled' : ''
        } ${value ? 'filled' : ''}`}
      />
    );

  return (
    <>
      <label htmlFor={id} styleName="label">
        {label}
      </label>
      {input}
      {message}
    </>
  );
}

Input.defaultProps = {
  id: null,
  label: '',
  placeholder: '',
  name: null,
  type: 'text',
  onBlur: null,
  onChange: null,
  isDisabled: false,
  isRequired: false,
  assistiveMessage: null,
  errorMessage: null,
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  assistiveMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default React.memo(Input);
