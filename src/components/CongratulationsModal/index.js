import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';

import crossIcon from '../../assets/img/svg/cross.svg';
import Button from '../Button';

function CongratulationsModal({ closeModal }) {
  return (
    <div styleName="modal-wrapper">
      <div styleName="modal">
        <h2 styleName="title">Congratulations</h2>
        <div styleName="text-container">
          <p styleName="text">You have successfully passed the registration</p>
        </div>
        <div styleName="btn-container">
          <Button onClick={closeModal} isSmall>
            Great
          </Button>
        </div>
        <button styleName="cross-btn" onClick={closeModal}>
          <img src={crossIcon} alt="Close" styleName="cross-icon" />
        </button>
      </div>
    </div>
  );
}

CongratulationsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CongratulationsModal;
