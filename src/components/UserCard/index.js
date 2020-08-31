import './style.module.scss';

import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import defaultAvatar from '../../assets/img/svg/photo-cover.svg';

function UserCard({ photo, name, position, email, phone }) {
  //Create ref to show tooltip if content overflows
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    const nameCurr = nameRef.current;
    const emailCurr = emailRef.current;

    //add class if card title spans more than 1 line
    if (nameCurr.clientHeight > 40) {
      nameCurr.classList.add('user-card__name_long');
    }

    if (isEllipsisActive(nameCurr)) {
      nameCurr.dataset.tip = nameCurr.textContent;
    }
    if (isEllipsisActive(emailCurr)) {
      emailCurr.dataset.tip = emailCurr.textContent;
    }
  }, [nameRef, emailRef]);

  function addDefaultSrc(event) {
    event.target.src = defaultAvatar;
  }

  function isEllipsisActive(tag) {
    return tag.offsetWidth < tag.scrollWidth;
  }

  return (
    <article styleName="user-card">
      <img
        src={photo}
        onError={addDefaultSrc}
        alt="avatar"
        styleName="avatar"
      />
      <h2 ref={nameRef} styleName="name">
        {name}
      </h2>
      <p styleName="position">{position}</p>
      <p ref={emailRef} styleName="email">
        {email}
      </p>
      <p styleName="phone">{phone}</p>
    </article>
  );
}

UserCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default UserCard;
