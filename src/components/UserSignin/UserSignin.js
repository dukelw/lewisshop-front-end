// UserSignin.js

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserSignin.module.scss';
import { signinUser } from '~/redux/apiRequest';
import InputBox from '../InputBox';
import ToastMessageContainer from '../ToastMessageContainer';
import { UserIcon, HouseFlagIcon, ShopIcon } from '../Icons';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function UserSignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSignIn = () => {
    if (email === '' || password === '') {
      setSubmit(true);
    } else {
      const user = {
        email,
        password,
      };
      signinUser(user, dispatch, navigate);
    }
  };

  const handlePasswordKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div className={cx('wrapper')}>
      <ToastMessageContainer />
      <div className={cx('navigate')}>
        <Link className={cx('link')} to={'/'}>
          <HouseFlagIcon width="32px" height="32px" /> <span>Home</span>
        </Link>
        <Link className={cx('link')} to={'/shop/signin'}>
          <ShopIcon height="24px" width="32px" padding="12px 8px" /> <span>Sign in as Shop</span>
        </Link>
      </div>
      <div className={cx('signin-box')}>
        <div className={cx('signin-header')}>
          <UserIcon />
          <header className={cx('heading')}>Signin</header>
        </div>
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
          <button className={cx('submit-btn')} onClick={handleSignIn}></button>
          <label htmlFor="submit">Sign In</label>
        </div>
        <div className={cx('sign-up-link')}>
          <p>
            Don't have an account? <Link to="/user/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignin;
