import './style.module.scss';

import React, { useEffect, useRef } from 'react';

import programmerImg from '../../assets/img/svg/man-laptop-v1.svg';
import Button from '../Button';
import ContentWrapper from '../ContentWrapper';

function AboutSection() {
  //Create ref to show tooltip if content overflows
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const titleCurr = titleRef.current;
    const subtitleCurr = subtitleRef.current;

    if (isEllipsisActive(titleCurr)) {
      titleCurr.dataset.tip = titleCurr.textContent;
    }
    if (isEllipsisActive(subtitleCurr)) {
      subtitleCurr.dataset.tip = subtitleCurr.textContent;
    }
  }, [titleRef, subtitleRef]);

  function isEllipsisActive(tag) {
    return tag.offsetWidth < tag.scrollWidth;
  }

  return (
    <section styleName="about" id="about">
      <ContentWrapper>
        <h1 styleName="h1" ref={titleRef}>
          Let's get acquainted
        </h1>

        <div styleName="container">
          <div styleName="img-wrapper">
            <img src={programmerImg} alt="Programmer" styleName="img" />
          </div>

          <div styleName="text-wrapper">
            <h2 styleName="h2" ref={subtitleRef}>
              I am cool frontend developer
            </h2>

            <p styleName="text text1">
              We will evaluate how clean your approach to writing CSS and
              Javascript code is. You can use any CSS and Javascript 3rd party
              libraries without any restriction.
            </p>
            <p styleName="text text2">
              If 3rd party css/javascript libraries are added to the project via
              bower/npm/yarn you will get bonus points. If you use any task
              runner (gulp/webpack) you will get bonus points as well. Slice
              service directory page P​SD mockup​ into HTML5/CSS3.
            </p>

            <Button anchor="register" isFlat isLinkToAnchor>
              Sing up now
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

export default AboutSection;
