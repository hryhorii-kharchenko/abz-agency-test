import './style.module.scss';

import React from 'react';

import Button from '../Button';
import ContentWrapper from '../ContentWrapper';

function BannerSection() {
  return (
    <section styleName="banner" id="banner">
      <ContentWrapper>
        <div styleName="container">
          <h1 styleName="title">
            <span styleName="title-span">Test assignment</span> for Frontend
            Developer position
          </h1>

          <p styleName="text">
            We kindly remind you that your test assignment should be submitted
            as a link to github/bitbucket repository. Please be patient, we
            consider and respond to every application that meets minimum
            requirements. We look forward to your submission. Good luck! The
            photo has to scale in the banner area on the different screens
          </p>

          <p styleName="text-mobile">
            We kindly remind you that your test assignment should be submitted
            as a link to github/bitbucket repository.
          </p>

          <Button anchor="register" isLinkToAnchor styleName="button">
            Sing up now
          </Button>
        </div>
      </ContentWrapper>
    </section>
  );
}

export default BannerSection;
