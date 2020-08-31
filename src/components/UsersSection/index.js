import './style.module.scss';

import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import Button from '../Button';
import ContentWrapper from '../ContentWrapper';
import UserCard from '../UserCard';

function UsersSection({ users, isLoading, isComplete, showMoreClickHandler }) {
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

  //Sort users by registration date (latest first)
  const sortedUsers = [...users].sort(
    (a, b) => b.registration_timestamp - a.registration_timestamp
  );
  const userCards = sortedUsers.map(
    ({ id, name, email, phone, position, photo }) => (
      <UserCard
        name={name}
        email={email}
        phone={phone}
        position={position}
        photo={photo}
        key={id}
      />
    )
  );

  return (
    <section styleName="users" id="users">
      <ContentWrapper>
        <h1 styleName="title" ref={titleRef}>
          Our cheerful users
        </h1>
        <p styleName="subtitle">
          Attention! Sorting users by registration date
        </p>

        <div styleName="container">{userCards}</div>

        {isComplete ? null : (
          <Button
            onClick={showMoreClickHandler}
            isCentered
            isDisabled={isLoading}
          >
            Show more
          </Button>
        )}
      </ContentWrapper>
    </section>
  );
}

UsersSection.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      position: PropTypes.string,
      photo: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
  showMoreClickHandler: PropTypes.func.isRequired,
};

export default UsersSection;
