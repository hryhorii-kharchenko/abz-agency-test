import './style.module.scss';

import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import ContentWrapper from '../ContentWrapper';
import RegisterForm from '../RegisterForm';

function RegisterSection({ clearUsers, setUserId }) {
  //Create ref to show tooltip if content overflows
  const titleRef = useRef(null);

  useEffect(() => {
    const titleCurr = titleRef.current;

    if (isEllipsisActive(titleCurr)) {
      titleCurr.dataset.tip = titleCurr.textContent;
    }
  }, [titleRef]);

  function isEllipsisActive(tag) {
    return tag.offsetWidth < tag.scrollWidth;
  }

  return (
    <section styleName="register" id="register">
      <ContentWrapper>
        <h1 styleName="title" ref={titleRef}>
          Register to get a work
        </h1>
        <p styleName="subtitle">
          Attention! After successful registration and alert, update the list of
          users in the block from the top
        </p>
        <div styleName="container">
          <RegisterForm clearUsers={clearUsers} setUserId={setUserId} />
        </div>
      </ContentWrapper>
    </section>
  );
}

RegisterSection.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
};

export default RegisterSection;
