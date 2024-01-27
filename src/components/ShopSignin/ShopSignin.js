import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ShopSignin.module.scss';
import { signinUser } from '~/redux/apiRequest';
import InputBox from '../InputBox';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function UserSignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    const user = {
      email,
      password,
    };
    signinUser(user, dispatch, navigate);
  };

  return (
    <div className={cx('signin-box')}>
      <div className={cx('signin-header')}>
        <header>Signin</header>
      </div>
      <InputBox placeholder="Email" value={email} setValue={setEmail}></InputBox>
      <InputBox placeholder="Password" value={password} setValue={setPassword} show={false}></InputBox>
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
          Don't have an account? <Link to="/shop/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default UserSignin;
