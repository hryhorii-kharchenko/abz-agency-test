import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';

const FileInput = React.forwardRef(
  ({ id, name, label, value, onChange, isRequired, errorMessage }, ref) => {
    return (
      <>
        <label htmlFor={id} styleName="label">
          {label}
        </label>
        <div styleName="file-input-wrapper">
          <input
            type="file"
            id={id}
            name={name}
            ref={ref}
            onChange={onChange}
            styleName={`file-input ${errorMessage ? 'error' : ''}`}
            required={isRequired}
          />
          <label
            htmlFor={id}
            styleName={`main-file-label${
              value !== 'Upload your photo' && value !== 'No file chosen'
                ? ' main-file-label_filled'
                : ''
            }`}
          >
            {value}
          </label>
          <label htmlFor={id} styleName="browse-file-label">
            Browse
          </label>
          {errorMessage ? <p styleName="error-msg">{errorMessage}</p> : null}
        </div>
      </>
    );
  }
);

FileInput.defaultProps = {
  id: null,
  name: null,
  onChange: null,
  isRequired: false,
  errorMessage: null,
};

FileInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default FileInput;
