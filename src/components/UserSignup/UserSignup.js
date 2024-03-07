import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserSignup.module.scss';
import InputBox from '../InputBox';
import { useDispatch } from 'react-redux';
import { signupUser } from '~/redux/apiRequest';
import { UserIcon, HouseFlagIcon } from '../Icons';
import ToastMessageContainer from '../ToastMessageContainer';

const cx = classNames.bind(styles);

function UserSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('Confirmation is required');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSignUp = () => {
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      setSubmit(true);
    } else if (password !== confirmPassword) {
      setConfirmMessage('Password conflict');
    } else {
      const shop = {
        name,
        email,
        password,
      };
      signupUser(shop, dispatch, navigate);
    }
  };

  const handlePasswordKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <div>
      <ToastMessageContainer />
      <Link to={'/'}>
        <HouseFlagIcon width="32px" height="32px" />
      </Link>
      <div className={cx('signin-box')}>
        <div className={cx('signin-header')}>
          <UserIcon />
          <header className={cx('heading')}>Signup</header>
        </div>
        <InputBox
          errorMessage={'Name is required'}
          submiting={submit}
          placeholder="Name"
          value={name}
          setValue={setName}
        ></InputBox>
        <InputBox
          errorMessage={'Email is required'}
          submiting={submit}
          placeholder="Email"
          value={email}
          setValue={setEmail}
          handleCheckEmail={isValidEmail}
        ></InputBox>
        <InputBox
          errorMessage={'Password is required'}
          submiting={submit}
          placeholder="Password"
          value={password}
          setValue={setPassword}
          show={false}
        ></InputBox>
        <InputBox
          errorMessage={confirmMessage}
          submiting={submit}
          placeholder="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          show={false}
          conflict={password !== confirmPassword}
          onKeyDown={handlePasswordKeyDown}
        ></InputBox>
        <div className={cx('forgot')}>
          <section>
            <input type="checkbox" id="check" />
            <label htmlFor="check">Remember me</label>
          </section>
          <section>
            <Link to="#">Forgot password</Link>
          </section>
        </div>
        <div className={cx('input-submit')}>
          <button className={cx('submit-btn')} onClick={handleSignUp}></button>
          <label htmlFor="submit">Sign Up</label>
        </div>
        <div className={cx('sign-up-link')}>
          <p>
            Don't have an account? <Link to="/user/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
