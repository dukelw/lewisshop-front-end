import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ShopSignup.module.scss';
import InputBox from '../InputBox';
import { ShopIcon, HouseFlagIcon } from '../Icons';
import { useDispatch } from 'react-redux';
import { signupShop } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function UserSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = () => {
    const shop = {
      name,
      email,
      password,
    };
    signupShop(shop, dispatch, navigate);
  };

  return (
    <div className={cx('wrapper')}>
      <Link to={'/'}>
        <HouseFlagIcon width="32px" height="32px" />
      </Link>
      <div className={cx('signin-box')}>
        <div className={cx('signin-header')}>
          <ShopIcon />
          <header>Signup</header>
        </div>
        <InputBox placeholder="Name" value={name} setValue={setName}></InputBox>
        <InputBox placeholder="Email" value={email} setValue={setEmail}></InputBox>
        <InputBox placeholder="Password" value={password} setValue={setPassword} show={false}></InputBox>
        <InputBox
          placeholder="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          show={false}
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
            Don't have an account? <Link to="/shop/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
