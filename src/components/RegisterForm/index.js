import './style.module.scss';

import PropTypes from 'prop-types';
import React from 'react';
import AriaModal from 'react-aria-modal';
import { scroller } from 'react-scroll';

import Button from '../Button';
import CongratulationsModal from '../CongratulationsModal';
import FileInput from '../FileInput';
import Form from '../Form';
import Input from '../Input';
import RadioToolbar from '../RadioToolbar';

const idPrefix = 'register-form-';
const initialState = {
  name: '',
  email: '',
  phone: '',
  nameErrorMsg: '',
  emailErrorMsg: '',
  phoneErrorMsg: '',
  position: null,
  positionList: [],
  photo: 'Upload your photo',
  photoErrorMsg: '',
  isModalOpen: false,
};

class CheckoutForm extends React.Component {
  state = { ...initialState };

  fileInputRef = React.createRef();

  componentDidMount() {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);

        const positionList = data.positions.map(({ id, name }) => ({
          id,
          label: name,
        }));
        this.setState({ position: positionList[0].id, positionList });
      })
      .catch((error) => console.log(error));
  }

  formClear = () => {
    this.setState({ ...initialState });
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);

        const positionList = data.positions.map(({ id, name }) => ({
          id,
          label: name,
        }));
        this.setState({ position: positionList[0].id, positionList });
      })
      .catch((error) => console.log(error));
    this.fileInputRef.current.value = null;
  };

  validateForm() {
    const { name, email, phone, photo } = this.state;

    const nameErrorMsg = this.validateName(name);
    const emailErrorMsg = this.validateEmail(email);
    const phoneErrorMsg = this.validatePhone(phone);
    const photoErrorMsg = this.checkPhoto(photo);

    this.setState({
      nameErrorMsg,
      emailErrorMsg,
      phoneErrorMsg,
      photoErrorMsg,
    });
  }

  setIsModalOpen = (value) => {
    this.setState({ isModalOpen: value });
  };

  closeModal = () => {
    const { clearUsers } = this.props;

    this.setIsModalOpen(false);
    clearUsers();
    setTimeout(
      () =>
        scroller.scrollTo('users', {
          duration: 500,
          delay: 0,
          smooth: 'easeInOutQuart',
        }),
      100
    );
  };

  nameChangeHandler = (event) => {
    const errorMsg = this.validateName(event.target.value);
    this.setState({
      name: event.target.value,
      nameErrorMsg: errorMsg,
    });
  };

  validateName(value) {
    if (value === '') return 'Enter name';

    const isCorrect = /([A-z]+)+/.test(value);
    if (!isCorrect) return 'Enter correct name';

    if (value.length < 2) return 'Name is too short';
    if (value.length > 60) return 'Name is too long';

    return '';
  }

  emailChangeHandler = (event) => {
    const errorMsg = this.validateEmail(event.target.value);
    this.setState({
      email: event.target.value,
      emailErrorMsg: errorMsg,
    });
  };

  validateEmail(value) {
    if (value === '') return 'Enter email';

    const isCorrect = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
      value
    );
    if (!isCorrect) return 'Enter correct email';

    return '';
  }

  phoneChangeHandler = (event) => {
    const errorMsg = this.validatePhone(event.target.value);
    this.setState({
      phone: event.target.value,
      phoneErrorMsg: errorMsg,
    });
  };

  validatePhone(value) {
    if (value === '') return 'Enter phone number';

    const isCorrect = /^\+380\s\d\d\s\d\d\d\s\d\d\s\d\d$/.test(value);
    if (!isCorrect) return 'Enter full phone number';

    return '';
  }

  positionChangeHandler = (value) => {
    this.setState({ position: value });
  };

  photoChangeHandler = (event) => {
    const file = event.target.files[0];

    if (file && file.name) {
      this.validatePhoto(file);
      return;
    }

    this.setState({ photo: 'No file chosen', photoErrorMsg: 'Choose a photo' });
  };

  validatePhoto(file) {
    const fileName = file.name;
    const fileExtension = fileName.replace(/^.*\./, '');
    const fileSize = file.size;

    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      if (fileSize <= 5000000) {
        var img = new Image();

        img.src = window.URL.createObjectURL(file);
        img.onload = (event) => {
          const width = event.target.naturalWidth;
          const height = event.target.naturalHeight;

          if (width >= 70 && height >= 70) {
            this.setState({ photo: fileName, photoErrorMsg: '' });
            return;
          }

          this.setState({
            photo: 'No file chosen',
            photoErrorMsg: "Photo's dimensions must be at least 70x70px",
          });
        };
        return;
      }

      this.setState({
        photo: 'No file chosen',
        photoErrorMsg: "Photo's size must be smaller than 5Mb",
      });
      return;
    }

    this.setState({
      photo: 'No file chosen',
      photoErrorMsg: "Photo's extension must be .jpg or .jpeg",
    });
    return;
  }

  checkPhoto(value) {
    if (value === 'Upload your photo' || value === 'No file chosen')
      return 'Choose a photo';

    return '';
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.validateForm();

    const { setUserId } = this.props;
    const {
      name,
      email,
      phone,
      nameErrorMsg,
      emailErrorMsg,
      phoneErrorMsg,
      position,
      photo,
      photoErrorMsg,
    } = this.state;

    const isValid =
      name &&
      email &&
      phone &&
      position &&
      photo &&
      !(nameErrorMsg || emailErrorMsg || phoneErrorMsg || photoErrorMsg);

    if (!isValid) {
      return;
    }

    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) throw new Error('Token fetch failed');

        const formData = new FormData();
        const phoneTrimmed = phone.replace(/\s/g, '');
        const file = this.fileInputRef.current.files[0];

        formData.append('position_id', position);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phoneTrimmed);
        formData.append('photo', file);

        return fetch(
          'https://frontend-test-assignment-api.abz.agency/api/v1/users',
          {
            method: 'POST',
            body: formData,
            headers: { Token: data.token },
          }
        );
      })
      .then((response) => {
        if (!response.ok) throw response;
        return response.json();
      })
      .then((data) => {
        if (!data.success) throw new Error(data.message);

        setUserId(data.user_id);
        this.formClear();
        this.setIsModalOpen(true);
      })
      .catch((response) => {
        if (response instanceof Error) throw response;

        if (response.status === 409) {
          this.setState({
            phoneErrorMsg: 'User with this phone or email already exist',
            emailErrorMsg: 'User with this phone or email already exist',
          });
          return;
        }

        if (response.status === 422) {
          response.json().then((data) => {
            const fails = Object.entries(data.fails);

            for (const [key, value] of fails) {
              if (key === 'position_id') continue;
              const errorMsgKey = `${key}ErrorMsg`;

              this.setState({ [errorMsgKey]: value });
            }
          });
          return;
        }

        return response.text();
      })
      .catch((error) => console.log(error));
  };

  render() {
    const {
      name,
      email,
      phone,
      nameErrorMsg,
      emailErrorMsg,
      phoneErrorMsg,
      position,
      positionList,
      photo,
      photoErrorMsg,
      isModalOpen,
    } = this.state;

    const modal = isModalOpen ? (
      <AriaModal
        titleText="Congratulations"
        onExit={this.closeModal}
        // initialFocus="checkout-modal-order-summary-checkout-btn"
        applicationNode={document.getElementById('application')}
      >
        <CongratulationsModal closeModal={this.closeModal} />
      </AriaModal>
    ) : null;

    return (
      <>
        <Form onSumbit={this.onSubmit}>
          <div styleName="container">
            <Input
              id={idPrefix + 'name'}
              name="name"
              label="Name"
              value={name}
              placeholder="Your name"
              errorMessage={nameErrorMsg}
              onChange={this.nameChangeHandler}
            />
            <Input
              id={idPrefix + 'email'}
              name="email"
              label="Email"
              type="email"
              value={email}
              placeholder="Your email"
              errorMessage={emailErrorMsg}
              onChange={this.emailChangeHandler}
            />
            <Input
              id={idPrefix + 'phone'}
              name="phone"
              label="Phone number"
              type="tel"
              value={phone}
              placeholder="+380 XX XXX XX XX"
              assistiveMessage="Еnter phone number in open format"
              errorMessage={phoneErrorMsg}
              onChange={this.phoneChangeHandler}
            />
            <RadioToolbar
              title="Select your position"
              value={position}
              possibleValues={positionList}
              onChange={this.positionChangeHandler}
            />
            <FileInput
              id={idPrefix + 'photo'}
              name="photo"
              label="Photo"
              ref={this.fileInputRef}
              value={photo}
              errorMessage={photoErrorMsg}
              onChange={this.photoChangeHandler}
            />
          </div>
          <Button type="submit" isCentered>
            Sing up now
          </Button>
        </Form>
        {modal}
      </>
    );
  }
}

CheckoutForm.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
};

export default CheckoutForm;
